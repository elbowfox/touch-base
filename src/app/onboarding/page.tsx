"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingStep, UserProfile } from "@/lib/types";
import { KP_REWARDS } from "@/lib/constants";
import WelcomeStep from "./steps/WelcomeStep";
import LocationStep from "./steps/LocationStep";
import ProfileStep from "./steps/ProfileStep";

function getDefaultProfile(): UserProfile {
  return {
    doomSpiralRemedies: ["", "", ""],
    naturalSkills: ["", "", ""],
    comfortFood: "",
    hobbies: [],
    locationEnabled: false,
    locationRadius: 10,
    anonymous: true,
    rewardsBalance: 0,
    engagementStreak: 0,
  };
}

const STEPS: { id: OnboardingStep; label: string }[] = [
  { id: "welcome", label: "Welcome" },
  { id: "location", label: "Location" },
  { id: "profile", label: "Profile" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [profile, setProfile] = useState<UserProfile>(getDefaultProfile);
  const [referralToken, setReferralToken] = useState<string | null>(null);
  const [referralSource, setReferralSource] = useState<string | null>(null);

  // Pick up Elvis referral token from localStorage (set by /join page)
  useEffect(() => {
    try {
      const token = localStorage.getItem("tb_referral_token");
      const source = localStorage.getItem("tb_referral_source");
      if (token) setReferralToken(token);
      if (source) setReferralSource(source);
    } catch {
      /* localStorage not available */
    }
  }, []);

  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);

  function updateProfile(patch: Partial<UserProfile>) {
    setProfile((prev) => ({ ...prev, ...patch }));
  }

  async function handleFinish() {
    // Attach referral metadata to profile and award bonus KP
    const finalProfile: UserProfile = {
      ...profile,
      ...(referralSource ? { referralSource } : {}),
      ...(referralToken ? { referralToken } : {}),
      // Award 50 bonus KP for Elvis-referred users
      ...(referralSource === "elvis"
        ? { rewardsBalance: profile.rewardsBalance + KP_REWARDS.ELVIS_REFERRAL_BONUS }
        : {}),
    };

    try {
      localStorage.setItem("tb_profile", JSON.stringify(finalProfile));
      // Clean up referral tokens after saving to profile
      localStorage.removeItem("tb_referral_token");
      localStorage.removeItem("tb_referral_source");
    } catch { /* ignore */ }

    // Notify server that onboarding is complete (Elvis can poll this)
    if (referralToken) {
      try {
        await fetch("/api/elvis/onboarding-complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: referralToken }),
        });
      } catch {
        /* non-critical — Elvis will retry polling */
      }
    }

    router.push("/feed");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-50 dark:from-stone-900 dark:to-stone-950 flex flex-col">
      <header className="px-5 pt-6 pb-2 flex items-center justify-between">
        <span className="text-base font-semibold text-stone-800 dark:text-stone-100">
          {referralSource === "elvis" ? "🎸" : "🌿"} TouchBase
        </span>
        <span className="text-xs text-stone-400">
          Step {stepIndex + 1} of {STEPS.length}
        </span>
      </header>

      {/* Elvis referral banner */}
      {referralSource === "elvis" && currentStep === "welcome" && (
        <div className="mx-5 mb-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
          🎸 Elvis brought you here — complete your profile to earn <strong>50 bonus KP</strong>!
        </div>
      )}

      {/* Progress bar */}
      <div className="px-5">
        <div className="h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-600 dark:bg-stone-300 rounded-full transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <main className="flex-1 flex items-start justify-center px-5 py-6">
        <div className="w-full bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 p-6">
          {currentStep === "welcome" && (
            <WelcomeStep onNext={() => setCurrentStep("location")} />
          )}
          {currentStep === "location" && (
            <LocationStep
              locationEnabled={profile.locationEnabled}
              coordinates={profile.coordinates}
              customLocation={profile.customLocation}
              locationRadius={profile.locationRadius}
              onChange={(patch) => updateProfile(patch)}
              onNext={() => setCurrentStep("profile")}
              onBack={() => setCurrentStep("welcome")}
            />
          )}
          {currentStep === "profile" && (
            <ProfileStep
              profile={profile}
              onChange={updateProfile}
              onFinish={handleFinish}
              onBack={() => setCurrentStep("location")}
            />
          )}
        </div>
      </main>
    </div>
  );
}
