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
import { FormDataRequest, RequestPost } from "./interfaces";

import classes from "./ViewCreateRequest.module.css";
import Timeline from "@/components/timeline/Timeline";
import BearerForm from "./components/BearerForm";
import ApplicantForm from "./components/ApplicantForm";
import { Requester } from "@/db/requester";
import { FormDataCarrier } from "../view-create-carrier/interfaces";
import { initialFormData } from "../view-create-carrier/data/initialFormData";
import toast from "react-hot-toast";
import { addRequest } from "@/api/request";
import { getDate } from "@/functions";

const ViewCreateRequest = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const steps = ["Requirente", "Portador"];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RequestPost>({
    answer: "no-confirmed",
    reason_return: "",
    description_reason: "",
    issue_date: "",
    response_date: "",
    return_date: "",
    time_respond: "",
    status: "unconfirmed",
    requester: {
      _id: "",
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
    awardee_response: {
      status: "",
      minimum_coverage: "",
      latitude: "",
      length: "",
      indication_aspects: "",
      photographic_evidence: [],
    },
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

  const setDate = (date?: Date) => {
    setFormData({ ...formData, issue_date: getDate(date) });
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
            setDate={setDate}
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
    setLoading(true);

    try {
      await addRequest(formData);
      toast.success("Solicitud creada exitosamente");
      setLoading(false);
      setCurrentStep(0);
      setFormData({
        answer: "",
        description_reason: "",
        reason_return: "",
        issue_date: "",
        response_date: "",
        return_date: "",
        time_respond: "",
        status: "",
        requester: {
          _id: "",
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
        awardee_response: {
          status: "",
          minimum_coverage: "",
          latitude: "",
          length: "",
          indication_aspects: "",
          photographic_evidence: [],
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
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
            {currentStep === steps.length - 1 ? (
              loading ? (
                <div className="loader-button" />
              ) : (
                "Crear solicitud"
              )
            ) : (
              "Siguiente"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewCreateRequest;
