import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import {
  FormDataCarrier,
  FormDataWearer,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from "@/views/view-create-carrier/interfaces";
import { initialFormData } from "@/views/view-create-carrier/data/initialFormData";
import DataForm from "@/views/view-create-carrier/components/DataForm";
import CauseForm from "@/views/view-create-carrier/components/CauseForm";
import MonitoringForm from "@/views/view-create-carrier/components/MonitoringForm";
import InclusionZoneForm from "@/views/view-create-carrier/components/InclusionZoneForm";
import ExclusionZoneForm from "@/views/view-create-carrier/components/ExclusionZoneForm";
import Timeline from "@/components/timeline/Timeline";
import { updatedCarrier } from "@/api/request";
import Wearer from "@/views/view-create-carrier/components/Wearer";

interface Props {
  carrier?: FormDataWearer;
  // carrier?: FormDataCarrier;
  open: boolean;
  onClose: VoidFunction;
  refetch?: VoidFunction;
  // refetch: VoidFunction;
}

const UpdatedCarrierModal = ({ carrier, open, onClose, refetch }: Props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataWearer>(initialFormData);
  const steps = ["Wearer"];
  // const steps = ["Datos", "Causa", "Monitoreo", "Inclusión", "Exclusión"];
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (carrier) {
      setFormData(carrier);
    }
  }, [carrier]);

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

  const isStep5Complete = () => {
    const step5 = formData.wearer;
    // const step5 = formData.exclusionArea;
    return Object.values(step5).every((value) =>
      typeof value === "boolean" ? true : value.toString().trim() !== ""
    );
    // return false;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          // <DataForm
          //   formData={formData.personalData}
          //   setFormData={(data) => updateData("personalData", data)}
          //   setCompleteForm={setCompleteForm}
          // />
          <Wearer
            formData={formData.wearer}
            setFormData={(data) => updateData("wearer", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      // case 1:
      //   return (
      //     <CauseForm
      //       formData={formData.cause}
      //       setFormData={(data) => updateData("cause", data)}
      //       setCompleteForm={setCompleteForm}
      //     />
      //   );
      // case 2:
      //   return (
      //     <MonitoringForm
      //       formData={formData.monitoring}
      //       setFormData={(data) => updateData("monitoring", data)}
      //       setCompleteForm={setCompleteForm}
      //     />
      //   );
      // case 3:
      //   return (
      //     <InclusionZoneForm
      //       formData={formData.inclusionArea}
      //       setFormData={(data) => updateData("inclusionArea", data)}
      //       setCompleteForm={setCompleteForm}
      //     />
      //   );
      // case 4:
      //   return (
      //     <ExclusionZoneForm
      //       formData={formData.exclusionArea}
      //       setFormData={(data) => updateData("exclusionArea", data)}
      //       setCompleteForm={setCompleteForm}
      //     />
      //   );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (carrier) {
        // await updatedCarrier(formData);
        setCurrentStep(0);
        // refetch();
        toast.success("Portador actualizado");
        onClose();
      }
    } catch (error) {
      toast.success("Error al actualizar el portador");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[800px] overflow-auto">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-3xl">Editar portador</DialogTitle>
        </DialogHeader>
        <div style={{ height: currentStep === 2 ? "auto" : "" }}>
          <Card className="w-full max-w-3xl mx-auto p-5">
            <CardHeader className="relative overflow-hidden">
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
                disabled={
                  (currentStep < steps.length - 1 && !completeForm) ||
                  (currentStep === steps.length - 1 && !isStep5Complete()) ||
                  loading
                }
              >
                {currentStep === steps.length - 1 ? (
                  loading ? (
                    <div className="flex items-center gap-3">
                      <span>Actualizando</span>
                      <div className="loader-button" />
                    </div>
                  ) : (
                    "Actualizar portador"
                  )
                ) : (
                  "Siguiente"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatedCarrierModal;
