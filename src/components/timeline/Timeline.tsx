"use client";

import { cn } from "@/lib/utils";

interface TimelineProps {
  steps: string[];
  currentStep: number;
}

export default function Timeline({ steps, currentStep }: TimelineProps) {
  return (
    <div className="w-full py-8">
      <div className="relative flex justify-between">
        {/* Line connecting all steps */}
        <div className="absolute top-1/2 mt-2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gray-200" />

        {/* Active line that grows based on current step */}
        <div
          className="absolute top-1/2 mt-2 left-0 h-0.5 -translate-y-1/2 bg-green-500 transition-all duration-300 ease-in-out"
          style={{
            width: `${
              currentStep === 0 ? 0 : (currentStep / (steps.length - 1)) * 100
            }%`,
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center z-10">
            {/* Step circle */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                index < currentStep
                  ? "bg-green-500 border-green-500 text-white"
                  : index === currentStep
                  ? "bg-white border-green-500 text-green-500"
                  : "bg-white border-gray-200 text-gray-500"
              )}
            >
              {index < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>

            {/* Step label */}
            <span
              className={cn(
                "mt-2 text-sm font-medium text-center max-w-[120px]",
                index <= currentStep ? "text-gray-900" : "text-gray-500"
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
