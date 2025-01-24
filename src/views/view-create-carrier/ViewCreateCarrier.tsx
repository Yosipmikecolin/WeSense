"use client";

import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Step1 from "./components/form1/Form1";
import Step2 from "./components/form2/Form2";
import Step3 from "./components/form3/Form3";
import Timeline from "./components/timeline/Timeline";
import {
  FormData,
  Step1Data,
  Step2Data,
  Step3Data,
} from "@/interfaces/create-carrier";

const steps = ["Datos", "Causa", "Monitoreo"];

const ViewCreateCarrier = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    step1: {} as Step1Data,
    step2: {} as Step2Data,
    step3: {} as Step3Data,
  });

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const updateData = useCallback(
    (step: keyof FormData, data: Step1Data | Step2Data | Step3Data) => {
      setFormData((prevData) => ({
        ...prevData,
        [step]: data,
      }));
    },
    []
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1
            data={formData.step1}
            updateData={(data) => updateData("step1", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 1:
        return (
          <Step2
            data={formData.step2}
            updateData={(data) => updateData("step2", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 2:
        return (
          <Step3
            data={formData.step3}
            updateData={(data) => updateData("step3", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-5">
      <CardHeader className="relative overflow-hidden">
        <Timeline steps={steps} currentStep={currentStep} />
      </CardHeader>
      <CardContent>{renderCurrentStep()}</CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={previousStep} disabled={currentStep === 0}>
          Atras
        </Button>
        <Button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1 || !completeForm}
        >
          Siguiente
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ViewCreateCarrier;
