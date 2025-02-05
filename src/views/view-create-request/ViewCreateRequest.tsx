"use client";

import { useState, useCallback, useEffect } from "react";
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
  const [isClient, setIsClient] = useState(false);
  const [formData, _setFormData] = useState<IFormData>({
    step1: {} as Step1Data,
    step2: {} as Step2Data,
    step3: {} as Step3Data,
    step4: {} as Step3Data,
    step5: {} as Step3Data,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Esto asegurará que el componente solo se renderice en el cliente
  }

  const steps = [
    "Información de la causa",
    "Datos Solicitante",
    "Datos de la persona condenada",
    "Zona de Inclusión de la persona condenada",
    "Zona de Exclusión para la persona condenada",
  ];

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <CaseInformationForm data={formData.step1} />;
      case 1:
        return <ApplicantDataForm data={formData.step2} />;
      case 2:
        return <PersonDataForm data={formData.step3} />;
      case 3:
        return <InclusionZoneForm data={formData.step3} />;
      case 4:
        return <ExclusionZoneForm data={formData.step5} />;
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
        <CardHeader className="relative overflow-hidden mb-5">
          <CardTitle className="text-3xl mb-3">
            Crear solicitud de factibilidad técnica
          </CardTitle>
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
