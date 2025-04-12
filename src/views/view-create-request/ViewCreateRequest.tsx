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
import { FormDataRequest } from "./interfaces";

import classes from "./ViewCreateRequest.module.css";
import Timeline from "@/components/timeline/Timeline";
import BearerForm from "./components/BearerForm";
import ApplicantForm from "./components/ApplicantForm";
import { Requester } from "@/db/requester";
import { FormDataCarrier } from "../view-create-carrier/interfaces";
import { initialFormData } from "../view-create-carrier/data/initialFormData";

const ViewCreateRequest = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const steps = ["Requirente", "Portador"];
  const [formData, setFormData] = useState<FormDataRequest>({
    requester: {
      id: "",
      fullName: "",
      lastName: "",
      middleName: "",
      email: "",
      ruc: "",
      phone: "",
      userType: "",
      institution: "",
      identificationNumber: "",
      region: "",
      address: "",
      accessAreas: "",
      identityVerification: "",
      securityQuestion: "",
      registrationDate: "",
      observations: "",
    },
    carrier: initialFormData,
  });

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
    (step: keyof FormDataRequest, data: Requester | FormDataCarrier) => {
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
            formData={formData.requester}
            setFormData={(data) => updateData("requester", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 1:
        return (
          <BearerForm
            formData={formData.carrier}
            setFormData={(data) => updateData("carrier", data)}
            setCompleteForm={setCompleteForm}
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    console.log("formData", formData);
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
            disabled={currentStep < steps.length - 1}
          >
            Atras
          </Button>
          <Button
            variant={"primary"}
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleSubmit();
              } else {
                handleNext();
              }
            }}
            disabled={!completeForm}
          >
            {currentStep === steps.length - 1 ? "Crear solicitud" : "Siguiente"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewCreateRequest;
