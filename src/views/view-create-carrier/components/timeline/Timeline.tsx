import { useEffect, useState } from "react";
import { TimelineProps } from "@/interfaces/create-carrier";

export default function Timeline({ steps, currentStep }: TimelineProps) {
  const [animatedStep, setAnimatedStep] = useState(currentStep);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStep(currentStep), 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="flex justify-between items-center mb-8 relative">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`z-20 w-9 h-9 rounded-full flex justify-center flex-col items-center relative mb-3 ${
            index <= animatedStep
              ? "bg-green-400 text-white"
              : "bg-gray-200 text-white"
          }`}
        >
          {index + 1}
          <span className="text-black absolute top-10 text-sm font-bold">
            {step}
          </span>
        </div>
      ))}

      <div
        className={`bg-green-400 rounded-lg absolute transition-all duration-500 ease-in-out h-1 ${
          currentStep + 1 === 1 && "w-0"
        }  ${currentStep + 1 === 2 && "w-1/2"} ${
          currentStep + 1 === 3 && "w-full"
        }`}
      />
    </div>
  );
}
