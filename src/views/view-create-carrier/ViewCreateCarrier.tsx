"use client";

import React, { useState, useCallback } from "react";
import { useBuddieStore } from "@/store/index";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Wearer from "./components/Wearer";
import DataForm from "./components/DataForm";
import CauseForm from "./components/CauseForm";
import MonitoringForm from "./components/MonitoringForm";
import Timeline from "../../components/timeline/Timeline";
import {
  FormDataCarrier,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from "./interfaces";
import classes from "./ViewCreateCarrier.module.css";
import InclusionZoneForm from "./components/InclusionZoneForm";
import ExclusionZoneForm from "./components/ExclusionZoneForm";
import { initialFormData } from "./data/initialFormData";
import toast from "react-hot-toast";
// import { addCarrier } from "@/db/carrier";
import { generateUUID } from "@/functions";

const ViewCreateCarrier = () => {
  const { token, setToken } = useBuddieStore();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = ["Wearer"];
  // const steps = ["Datos", "Causa", "Monitoreo", "Inclusión", "Exclusión"];
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataCarrier>(initialFormData);
  const [loading, setLoading] = useState(false);

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
      step: keyof FormDataCarrier,
      data:
        | Step1Data
        | Step2Data
        | Step3Data
        | Step4Data
        | Step5Data
        | Step6Data
    ) => {
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
          <Wearer
            formData={formData.wearer}
            setFormData={(data) => updateData("wearer", data)}
            setCompleteForm={setCompleteForm}
          />
          // <DataForm
          //   formData={formData.personalData}
          //   setFormData={(data) => updateData("personalData", data)}
          //   setCompleteForm={setCompleteForm}
          // />
        );
      case 1:
        return (
          <CauseForm
            formData={formData.cause}
            setFormData={(data) => updateData("cause", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 2:
        return (
          <MonitoringForm
            formData={formData.monitoring}
            setFormData={(data) => updateData("monitoring", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 3:
        return (
          <InclusionZoneForm
            formData={formData.inclusionArea}
            setFormData={(data) => updateData("inclusionArea", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 4:
        return (
          <ExclusionZoneForm
            formData={formData.exclusionArea}
            setFormData={(data) => updateData("exclusionArea", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      default:
        return null;
    }
  };

  async function createWearer() {
    // console.log("TOKEN: ", token);
    console.log("WEARER: ", formData);

    const response_create = await axios.post("/api/buddie", {
      method: "setup.wearer.create",
      token,
      create_wearer: formData.wearer,
    });
    setToken(response_create.data.csrf_token);
    console.log("CREATE: ", response_create.data);
  }

  const handleSubmit = async () => {
    setLoading(true);
    createWearer();
    // await addCarrier({
    //   ...formData,
    //   id: generateUUID(),
    // });
    setTimeout(() => {
      setCurrentStep(0);
      toast.success("Portador creado exitosamente");
      setLoading(false);
      setFormData(initialFormData);
    }, 500);
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
                <div className="flex items-center gap-3">
                  <div className="loader-button" />
                </div>
              ) : (
                "Crear portador"
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

export default ViewCreateCarrier;
