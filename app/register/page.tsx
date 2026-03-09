"use client";

import { useState } from "react";
import Link from "next/link";
import { AppDetails, RegistrationStep } from "@/lib/types";
import { buildManifest, getDefaultAppDetails } from "@/lib/manifest";
import DetailsStep from "./steps/DetailsStep";
import AppearanceStep from "./steps/AppearanceStep";
import VerifyStep from "./steps/VerifyStep";
import ManifestStep from "./steps/ManifestStep";

const STEPS: { id: RegistrationStep; label: string; description: string }[] = [
  { id: "details", label: "App Details", description: "Name, description & URLs" },
  { id: "appearance", label: "Appearance", description: "Icons & colors" },
  { id: "verify", label: "Verify Domain", description: "Prove ownership" },
  { id: "manifest", label: "Get Manifest", description: "Download & deploy" },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("details");
  const [details, setDetails] = useState<AppDetails>(getDefaultAppDetails());
  const [accountAssociation, setAccountAssociation] = useState({
    header: "",
    payload: "",
    signature: "",
  });

  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  function handleNext() {
    const nextStep = STEPS[currentIndex + 1];
    if (nextStep) setCurrentStep(nextStep.id);
  }

  function handleBack() {
    const prevStep = STEPS[currentIndex - 1];
    if (prevStep) setCurrentStep(prevStep.id);
  }

  const manifest = buildManifest(details, accountAssociation);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="font-semibold text-lg">touch-base</span>
          </Link>
          <span className="text-sm text-gray-500">
            Register with BASE Dev Platform
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Step indicator */}
        <nav aria-label="Registration progress" className="mb-8">
          <ol className="flex items-center">
            {STEPS.map((step, index) => (
              <li key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => {
                    if (index <= currentIndex) setCurrentStep(step.id);
                  }}
                  className={`flex flex-col items-center gap-1 group ${
                    index <= currentIndex ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  disabled={index > currentIndex}
                  aria-current={currentStep === step.id ? "step" : undefined}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      index < currentIndex
                        ? "bg-blue-600 text-white"
                        : index === currentIndex
                        ? "bg-blue-600 text-white ring-4 ring-blue-100"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < currentIndex ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="hidden sm:block text-center">
                    <div className={`text-xs font-medium ${index <= currentIndex ? "text-blue-600" : "text-gray-400"}`}>
                      {step.label}
                    </div>
                    <div className="text-xs text-gray-400">{step.description}</div>
                  </div>
                </button>
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors ${index < currentIndex ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Step content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          {currentStep === "details" && (
            <DetailsStep details={details} onChange={setDetails} onNext={handleNext} />
          )}
          {currentStep === "appearance" && (
            <AppearanceStep details={details} onChange={setDetails} onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === "verify" && (
            <VerifyStep
              details={details}
              accountAssociation={accountAssociation}
              onChange={setAccountAssociation}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === "manifest" && (
            <ManifestStep manifest={manifest} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
}
