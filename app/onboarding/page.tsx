"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingStep, UserProfile } from "@/lib/types";
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
  const [profile, setProfile] = useState<UserProfile>(getDefaultProfile());

  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);

  function updateProfile(patch: Partial<UserProfile>) {
    setProfile((prev) => ({ ...prev, ...patch }));
  }

  function handleFinish() {
    // Persist profile to localStorage so the feed page can access it
    try {
      localStorage.setItem("tb_profile", JSON.stringify(profile));
    } catch {
      // Ignore storage errors
    }
    router.push("/feed");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Header */}
      <header className="px-4 pt-6 pb-2 flex items-center justify-between max-w-xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">TB</span>
          </div>
          <span className="font-semibold text-gray-900">touch-base</span>
        </div>
        <span className="text-xs text-gray-500">
          Step {stepIndex + 1} of {STEPS.length}
        </span>
      </header>

      {/* Progress bar */}
      <div className="max-w-xl mx-auto w-full px-4">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
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
              profile={{
                doomSpiralRemedies: profile.doomSpiralRemedies,
                naturalSkills: profile.naturalSkills,
                comfortFood: profile.comfortFood,
                hobbies: profile.hobbies,
                displayName: profile.displayName,
                anonymous: profile.anonymous,
              }}
              onChange={(patch) => updateProfile(patch)}
              onFinish={handleFinish}
              onBack={() => setCurrentStep("location")}
            />
          )}
        </div>
      </main>
    </div>
  );
}
