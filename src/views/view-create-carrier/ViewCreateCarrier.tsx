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
import Timeline from "../../components/timeline/Timeline";
import {
  FormData as IFormData,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
} from "./interfaces";
import classes from "./ViewCreateCarrier.module.css";
import InclusionZoneForm from "./components/InclusionZoneForm";
import ExclusionZoneForm from "./components/ExclusionZoneForm";
import { initialFormData } from "./data/initialFormData";

const ViewCreateCarrier = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = ["Datos", "Causa", "Monitoreo", "Inclusión", "Exclusión"];
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>(initialFormData);

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
    (
      step: keyof IFormData,
      data: Step1Data | Step2Data | Step3Data | Step4Data | Step5Data
    ) => {
      setFormData((prevData) => ({
        ...prevData,
        [step]: data,
      }));
    },
    []
  );

  const isStep5Complete = () => {
    const step5 = formData.step5;
    return Object.values(step5).every((value) =>
      typeof value === "boolean" ? true : value.toString().trim() !== ""
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DataForm
            formData={formData.step1}
            setFormData={(data) => updateData("step1", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 1:
        return (
          <CauseForm
            formData={formData.step2}
            setFormData={(data) => updateData("step2", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 2:
        return (
          <MonitoringForm
            formData={formData.step3}
            setFormData={(data) => updateData("step3", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 3:
        return (
          <InclusionZoneForm
            formData={formData.step4}
            setFormData={(data) => updateData("step4", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 4:
        return (
          <ExclusionZoneForm
            formData={formData.step5}
            setFormData={(data) => updateData("step5", data)}
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
          <CardTitle className="text-3xl mb-2">Crear portador</CardTitle>
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
            disabled={currentStep === steps.length - 1 || !completeForm}
          >
            {currentStep === steps.length - 1 ? "Crear portador" : "Siguiente"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewCreateCarrier;
