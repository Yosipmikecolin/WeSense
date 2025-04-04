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

import ApplicantDataForm from "./components/ApplicantDataForm";
import CaseInformationForm from "./components/CaseInformationForm";
import PersonDataForm from "./components/PersonDataForm";
import Timeline from "./components/Timeline";
import {
  FormData as IFormData,
  Step1Data,
  Step2Data,
  Step3Data,
} from "./interfaces";
import InclusionZoneForm from "./components/InclusionZoneForm";
import ExclusionZoneForm from "./components/ExclusionZoneForm";
import classes from "./ViewCreateRequest.module.css";

const ViewCreateRequest = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [_completeForm, setCompleteForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    step1: {} as Step1Data,
    step2: {} as Step2Data,
    step3: {} as Step3Data,
    step4: {} as Step3Data,
    step5: {} as Step3Data,
  });
  const steps = [
    "Requirente",
    "Solicitante ",
    "Condenado/a",
    "Inclusión",
    "Exclusión",
  ];

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
          <CaseInformationForm
            data={formData.step1}
            updateData={(data) => updateData("step1", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 1:
        return (
          <ApplicantDataForm
            data={formData.step2}
            updateData={(data) => updateData("step2", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 2:
        return (
          <PersonDataForm
            data={formData.step3}
            updateData={(data) => updateData("step3", data)}
            setCompleteForm={setCompleteForm}
          />
        );

      case 3:
        return (
          <InclusionZoneForm
            data={formData.step3}
            updateData={(data) => updateData("step4", data)}
            setCompleteForm={setCompleteForm}
          />
        );

      case 4:
        return (
          <ExclusionZoneForm
            data={formData.step5}
            updateData={(data) => updateData("step5", data)}
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
        <CardHeader>
          <CardTitle className="text-3xl">
            Crear solicitud de factibilidad técnica
          </CardTitle>
        </CardHeader>
        <div className="py-5 px-10">
          <Timeline steps={steps} currentStep={currentStep} />
        </div>

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
