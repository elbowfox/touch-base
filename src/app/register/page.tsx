'use client';

import { useState } from 'react';
import Link from 'next/link';
import ResourceCard from '@/components/ResourceCard';
import { defaultResources } from '@/lib/resources';

export default function RegisterPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection process
    // In production, this would integrate with Farcaster SDK and BASE chain
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zen-sand-50 via-meditation-dawn to-zen-sand-100">
      {/* Header */}
      <header className="container-zen py-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <span className="text-2xl">🌸</span>
          <h1 className="text-xl font-zen font-bold text-zen-stone-800">TouchBase</h1>
        </Link>
      </header>

      <div className="container-zen py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4 animate-float">⛩️</div>
            <h2 className="text-4xl font-zen font-bold text-zen-stone-800 mb-4">
              Register on BASE
            </h2>
            <p className="text-xl text-zen-stone-600 max-w-2xl mx-auto">
              Connect your Farcaster account and join the TouchBase community on the BASE blockchain
            </p>
          </div>

          {/* Main Card */}
          <div className="card-zen mb-8 animate-slide-up">
            {!isConnected ? (
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-zen-moss-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🔗</span>
                  </div>
                  <h3 className="text-2xl font-zen font-semibold text-zen-stone-800 mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-zen-stone-600 max-w-md mx-auto">
                    Link your Farcaster account to get started. Your wallet enables karma point rewards and secure interactions.
                  </p>
                </div>

                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="btn-zen text-lg px-8 py-4"
                >
                  {isConnecting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connecting...
                    </span>
                  ) : (
                    'Connect with Farcaster'
                  )}
                </button>

                <p className="text-xs text-zen-stone-500 mt-4">
                  By connecting, you agree to our terms and privacy policy
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-zen-moss-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-breathe">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h3 className="text-2xl font-zen font-semibold text-zen-stone-800 mb-2">
                    Successfully Connected!
                  </h3>
                  <p className="text-zen-stone-600 max-w-md mx-auto mb-6">
                    Your wallet is now connected. Ready to start your wellness journey?
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/onboarding" className="btn-zen">
                      Start Onboarding
                    </Link>
                    <Link href="/feed" className="btn-zen-outline">
                      Go to Feed
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card-zen">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zen-water-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⛓️</span>
                </div>
                <div>
                  <h3 className="font-zen font-semibold text-zen-stone-800 mb-1">
                    Built on BASE
                  </h3>
                  <p className="text-sm text-zen-stone-600">
                    Secure, fast, and low-cost transactions powered by Coinbase's Layer 2 solution
                  </p>
                </div>
              </div>
            </div>

            <div className="card-zen">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zen-moss-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎭</span>
                </div>
                <div>
                  <h3 className="font-zen font-semibold text-zen-stone-800 mb-1">
                    Farcaster Integration
                  </h3>
                  <p className="text-sm text-zen-stone-600">
                    Seamlessly connect with your Farcaster identity for social features
                  </p>
                </div>
              </div>
            </div>

            <div className="card-zen">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zen-sand-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="font-zen font-semibold text-zen-stone-800 mb-1">
                    Karma Rewards
                  </h3>
                  <p className="text-sm text-zen-stone-600">
                    Earn on-chain rewards for positive contributions to the community
                  </p>
                </div>
              </div>
            </div>

            <div className="card-zen">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-meditation-dawn rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <h3 className="font-zen font-semibold text-zen-stone-800 mb-1">
                    Privacy First
                  </h3>
                  <p className="text-sm text-zen-stone-600">
                    Your data is yours. Anonymous posting and secure wallet integration
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div className="card-zen">
            <h3 className="text-xl font-zen font-semibold text-zen-stone-800 mb-4">
              Wellness Resources
            </h3>
            <p className="text-zen-stone-600 mb-6">
              Access these resources to support your mental health journey
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {defaultResources.slice(3, 7).map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container-zen py-8 mt-12">
        <div className="text-center text-zen-stone-500 text-sm">
          <p>Powered by BASE • Built with 💚</p>
        </div>
      </footer>
    </main>
  );
}
