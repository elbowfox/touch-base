'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ResourceCard from '@/components/ResourceCard';
import { defaultResources } from '@/lib/resources';
import { KP_REWARDS } from '@/lib/constants';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    displayName: '',
    interests: [] as string[],
    acceptedGuidelines: false,
  });

  const interests = [
    { id: 'meditation', label: 'Meditation', icon: '🧘' },
    { id: 'mindfulness', label: 'Mindfulness', icon: '🌸' },
    { id: 'therapy', label: 'Therapy', icon: '💚' },
    { id: 'support-groups', label: 'Support Groups', icon: '🤝' },
    { id: 'reading', label: 'Reading', icon: '📚' },
    { id: 'exercise', label: 'Exercise', icon: '🏃' },
  ];

  const toggleInterest = (interestId: string) => {
    setUserData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((i) => i !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const handleComplete = () => {
    // Save user data and award karma points
    console.log('Onboarding completed:', userData);
    console.log(`Awarded ${KP_REWARDS.COMPLETE_ONBOARDING} Karma Points!`);
    router.push('/feed');
  };

  const canProceed = () => {
    if (step === 1) return userData.displayName.trim().length > 0;
    if (step === 2) return userData.interests.length > 0;
    if (step === 3) return userData.acceptedGuidelines;
    return false;
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
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      s === step
                        ? 'bg-zen-moss-500 text-white scale-110'
                        : s < step
                        ? 'bg-zen-moss-300 text-white'
                        : 'bg-zen-sand-200 text-zen-stone-500'
                    }`}
                  >
                    {s < step ? '✓' : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all ${
                        s < step ? 'bg-zen-moss-300' : 'bg-zen-sand-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-zen-stone-600">
              Step {step} of 3
            </p>
          </div>

          {/* Step 1: Welcome & Name */}
          {step === 1 && (
            <div className="card-zen animate-slide-up">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🏯</div>
                <h2 className="text-3xl font-zen font-bold text-zen-stone-800 mb-2">
                  Welcome to Your Zen Garden
                </h2>
                <p className="text-zen-stone-600">
                  Let's personalize your experience
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zen-stone-700 mb-2">
                    What should we call you?
                  </label>
                  <input
                    type="text"
                    value={userData.displayName}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, displayName: e.target.value }))
                    }
                    placeholder="Your display name"
                    className="input-zen"
                    maxLength={50}
                  />
                  <p className="text-xs text-zen-stone-500 mt-1">
                    You can always post anonymously if you prefer
                  </p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceed()}
                  className="btn-zen w-full mt-6"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="card-zen animate-slide-up">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✨</div>
                <h2 className="text-3xl font-zen font-bold text-zen-stone-800 mb-2">
                  What interests you?
                </h2>
                <p className="text-zen-stone-600">
                  We'll recommend relevant resources and content
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      userData.interests.includes(interest.id)
                        ? 'border-zen-moss-500 bg-zen-moss-50'
                        : 'border-zen-sand-200 bg-white hover:border-zen-sand-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{interest.icon}</div>
                    <div className="text-sm font-medium text-zen-stone-700">
                      {interest.label}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="btn-zen-outline flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceed()}
                  className="btn-zen flex-1"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Guidelines & Resources */}
          {step === 3 && (
            <div className="space-y-6 animate-slide-up">
              {/* Guidelines */}
              <div className="card-zen">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🤝</div>
                  <h2 className="text-3xl font-zen font-bold text-zen-stone-800 mb-2">
                    Community Guidelines
                  </h2>
                  <p className="text-zen-stone-600">
                    Let's keep this space safe and supportive
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <span className="text-2xl">💚</span>
                    <div>
                      <h3 className="font-semibold text-zen-stone-800">Be Kind & Compassionate</h3>
                      <p className="text-sm text-zen-stone-600">
                        Everyone is on their own journey. Offer support, not judgment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <h3 className="font-semibold text-zen-stone-800">Respect Privacy</h3>
                      <p className="text-sm text-zen-stone-600">
                        What's shared here stays here. Never share others' information.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl">🌸</span>
                    <div>
                      <h3 className="font-semibold text-zen-stone-800">Create a Zen Space</h3>
                      <p className="text-sm text-zen-stone-600">
                        No hate speech, harassment, or harmful content. Keep it peaceful.
                      </p>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userData.acceptedGuidelines}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        acceptedGuidelines: e.target.checked,
                      }))
                    }
                    className="mt-1 w-4 h-4 text-zen-moss-500"
                  />
                  <span className="text-sm text-zen-stone-700">
                    I agree to follow these guidelines and contribute to a supportive community
                  </span>
                </label>
              </div>

              {/* Recommended Resources */}
              <div className="card-zen">
                <h3 className="text-xl font-zen font-semibold text-zen-stone-800 mb-4">
                  Recommended Resources
                </h3>
                <div className="grid gap-4">
                  {defaultResources.slice(0, 2).map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="btn-zen-outline flex-1"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!canProceed()}
                  className="btn-zen flex-1"
                >
                  Complete Onboarding (+{KP_REWARDS.COMPLETE_ONBOARDING} KP)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
