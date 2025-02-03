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

import DataForm from "./components/DataForm";
import CauseForm from "./components/CauseForm";
import MonitoringForm from "./components/MonitoringForm";
import Timeline from "./components/Timeline";
import {
  FormData as IFormData,
  Step1Data,
  Step2Data,
  Step3Data,
} from "./interfaces";
import classes from "./ViewCreateCarrier.module.css";

const ViewCreateCarrier = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = ["Datos", "Causa", "Monitoreo"];
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
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
          <DataForm
            data={formData.step1}
            updateData={(data) => updateData("step1", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 1:
        return (
          <CauseForm
            data={formData.step2}
            updateData={(data) => updateData("step2", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 2:
        return (
          <MonitoringForm
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
    <div
      className={classes.container}
      style={{ height: currentStep === 2 ? "auto" : "" }}
    >
      <Card className="w-full max-w-3xl mx-auto p-5">
        <CardHeader className="relative overflow-hidden">
          <CardTitle className="text-3xl mb-3">Crear portador</CardTitle>
          <Timeline steps={steps} currentStep={currentStep} />
        </CardHeader>
        <CardContent>{renderCurrentStep()}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant={"primary"}
            onClick={previousStep}
            disabled={currentStep === 0}
          >
            Atras
          </Button>
          <Button
            variant={"primary"}
            onClick={nextStep}
            disabled={currentStep === steps.length - 1 || !completeForm}
          >
            Siguiente
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewCreateCarrier;
