"use client";

import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FormData as IFormData,
  Step1Data,
  Step2Data,
  Step3Data,
} from "./interfaces";

import classes from "./ViewCreateRequest.module.css";
import Timeline from "@/components/timeline/Timeline";
import BearerForm from "./components/BearerForm";
import ApplicantForm from "./components/ApplicantForm";

const ViewCreateRequest = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [_completeForm, setCompleteForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    step1: {} as Step1Data,
    step2: {} as Step2Data,
  });
  const steps = ["Requirente", "Portador"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const updateData = useCallback(
    (step: keyof IFormData, data: Step1Data | Step2Data | Step3Data) => {
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
          <ApplicantForm
            data={formData.step1}
            updateData={(data) => updateData("step1", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 1:
        return (
          <BearerForm
            data={formData.step2}
            updateData={(data) => updateData("step2", data)}
            setCompleteForm={setCompleteForm}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={classes.container}
      style={{ height: currentStep === 3 || currentStep === 4 ? "auto" : "" }}
    >
      <Card className="w-full max-w-3xl mx-auto p-5">
        <CardHeader className="relative overflow-hidden">
          <CardTitle className="text-3xl mb-2">
            Crear solicitud de factibilidad técnica
          </CardTitle>

          <Timeline steps={steps} currentStep={currentStep} />
        </CardHeader>

        <CardContent>{renderCurrentStep()}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant={"primary"}
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Atras
          </Button>
          <Button
            variant={"primary"}
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            Siguiente
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewCreateRequest;
