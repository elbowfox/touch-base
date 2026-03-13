'use client';

import { useState } from 'react';
import Link from 'next/link';
import VentCard from '@/components/VentCard';
import ReachOutModal from '@/components/ReachOutModal';
import RewardsWidget from '@/components/RewardsWidget';
import { sampleVents } from '@/lib/resources';
import { moderateContent } from '@/lib/moderation';
import { KP_REWARDS } from '@/lib/constants';

export default function FeedPage() {
  const [karmaPoints, setKarmaPoints] = useState(25);
  const [vents, setVents] = useState<Array<{
    id: string;
    content: string;
    category?: string;
    isAnonymous: boolean;
    supportCount: number;
  }>>([...sampleVents]);
  const [isReachOutModalOpen, setIsReachOutModalOpen] = useState(false);
  const [selectedVentId, setSelectedVentId] = useState<string | null>(null);
  const [newVentContent, setNewVentContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'stress' | 'anxiety' | 'relationships' | 'work' | 'health'>('general');

  const handleSupport = (ventId: string) => {
    setKarmaPoints(prev => prev + KP_REWARDS.OFFER_SUPPORT);
  };

  const handleReachOut = (ventId: string) => {
    setSelectedVentId(ventId);
    setIsReachOutModalOpen(true);
  };

  const handleSendReachOut = async (message: string, anonymous: boolean) => {
    // Moderate the message
    const result = await moderateContent(message, 'reach-out');

    if (result.approved) {
      console.log('Reach out sent:', { message, anonymous });
      if (result.suggestedReward !== undefined) {
        setKarmaPoints(prev => prev + result.suggestedReward!);
      }
    }

    setIsReachOutModalOpen(false);
  };

  const handlePostVent = async () => {
    if (!newVentContent.trim()) return;

    // Moderate the vent
    const result = await moderateContent(newVentContent, 'vent');

    if (result.approved) {
      const newVent = {
        id: Date.now().toString(),
        content: newVentContent,
        category: selectedCategory,
        isAnonymous,
        supportCount: 0,
      };

      setVents([newVent, ...vents]);
      setNewVentContent('');
      if (result.suggestedReward !== undefined) {
        setKarmaPoints(prev => prev + result.suggestedReward!);
      }
    } else {
      alert('Your post could not be published: ' + result.reason);
    }
  };

  return (
    <main className="min-h-screen bg-zen-sand-50">
      {/* Header */}
      <header className="bg-white shadow-zen-soft sticky top-0 z-30">
        <div className="container-zen py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <h1 className="text-xl font-zen font-bold text-zen-stone-800">TouchBase</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/onboarding"
                className="text-zen-stone-700 hover:text-zen-moss-600 transition-colors font-medium"
              >
                Onboarding
              </Link>
              <Link
                href="/register"
                className="text-zen-stone-700 hover:text-zen-moss-600 transition-colors font-medium"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container-zen py-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-zen font-bold text-zen-stone-800 mb-2">
              Community Feed
            </h2>
            <p className="text-zen-stone-600">
              Share your thoughts or offer support to others
            </p>
          </div>

          {/* New Vent Form */}
          <div className="card-zen mb-8">
            <h3 className="text-lg font-zen font-semibold text-zen-stone-800 mb-4">
              Share what's on your mind
            </h3>

            <textarea
              value={newVentContent}
              onChange={(e) => setNewVentContent(e.target.value)}
              placeholder="Express yourself... You're in a safe space."
              className="textarea-zen h-32 mb-4"
              maxLength={500}
            />

            <div className="flex items-center justify-between mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as typeof selectedCategory)}
                className="input-zen w-auto"
              >
                <option value="general">General</option>
                <option value="stress">Stress</option>
                <option value="anxiety">Anxiety</option>
                <option value="relationships">Relationships</option>
                <option value="work">Work</option>
                <option value="health">Health</option>
              </select>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-zen-moss-500"
                />
                <span className="text-sm text-zen-stone-700">Post anonymously</span>
              </label>
            </div>

            <button
              onClick={handlePostVent}
              disabled={!newVentContent.trim()}
              className="btn-zen w-full"
            >
              Share (+{KP_REWARDS.POST_VENT} KP)
            </button>
          </div>

          {/* Feed */}
          <div className="space-y-4">
            {vents.map((vent) => (
              <VentCard
                key={vent.id}
                vent={vent}
                onSupport={handleSupport}
                onReachOut={handleReachOut}
              />
            ))}
          </div>

          {vents.length === 0 && (
            <div className="card-zen text-center py-12">
              <div className="text-5xl mb-4">🌱</div>
              <p className="text-zen-stone-600">
                No posts yet. Be the first to share!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reach Out Modal */}
      <ReachOutModal
        ventId={selectedVentId || ''}
        isOpen={isReachOutModalOpen}
        onClose={() => setIsReachOutModalOpen(false)}
        onSend={handleSendReachOut}
      />

      {/* Rewards Widget */}
      <RewardsWidget karmaPoints={karmaPoints} />
    </main>
  );
}
