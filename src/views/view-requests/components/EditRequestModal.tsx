import { updatedRequest } from "@/api/request";
import Timeline from "@/components/timeline/Timeline";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CauseForm from "@/views/view-create-carrier/components/CauseForm";
import DataForm from "@/views/view-create-carrier/components/DataForm";
import ExclusionZoneForm from "@/views/view-create-carrier/components/ExclusionZoneForm";
import InclusionZoneForm from "@/views/view-create-carrier/components/InclusionZoneForm";
import MonitoringForm from "@/views/view-create-carrier/components/MonitoringForm";
import {
  FormDataCarrier,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from "@/views/view-create-carrier/interfaces";
import { RequestTable } from "@/views/view-create-request/interfaces";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ReturnDetailsProps {
  request: RequestTable;
  open: boolean;
  onClose: VoidFunction;
  refetch: VoidFunction;
}
const steps = [
  "Persona sujeta a control",
  "Causa",
  "Monitoreo",
  "Inclusión",
  "Exclusión",
];

const EditRequestModal = ({
  open,
  onClose,
  request,
  refetch,
}: ReturnDetailsProps) => {
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<RequestTable>(request);

  const updateDataCarrier = useCallback(
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
        carrier: {
          ...prevData.carrier,
          [step]: data,
        },
      }));
    },
    []
  );

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

  const handleSubmit = async () => {
    setLoading(true);
    if (formData) {
      try {
        await updatedRequest(formData);
        toast.success("Solicitud creada exitosamente");
        refetch();
        setLoading(false);
        setCurrentStep(0);
        onClose();
        localStorage.setItem("carrier-buddie", JSON.stringify(formData));
      } catch (error) {
        toast.error("Error al crear la solicitud");
      } finally {
        setLoading(false);
      }
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DataForm
            formData={formData.carrier.personalData}
            setFormData={(data) => updateDataCarrier("personalData", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 1:
        return (
          <CauseForm
            formData={formData.carrier.cause}
            setFormData={(data) => updateDataCarrier("cause", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 2:
        return (
          <MonitoringForm
            formData={formData.carrier.monitoring}
            setFormData={(data) => updateDataCarrier("monitoring", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 3:
        return (
          <InclusionZoneForm
            formData={formData.carrier.inclusionArea}
            setFormData={(data) => updateDataCarrier("inclusionArea", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 4:
        return (
          <ExclusionZoneForm
            formData={formData.carrier.exclusionArea}
            setFormData={(data) => updateDataCarrier("exclusionArea", data)}
            setCompleteForm={setCompleteForm}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-[800px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Editar solicitud</DialogTitle>
          <Timeline steps={steps} currentStep={currentStep} />
        </DialogHeader>
        <CardContent>{renderCurrentStep()}</CardContent>
        <DialogFooter>
          <CardFooter className="flex justify-between gap-3">
            <Button
              variant={"primary"}
              onClick={handlePrevious}
              disabled={currentStep <= 0}
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
              disabled={loading || !completeForm}
            >
              {currentStep === steps.length - 1 ? (
                loading ? (
                  <div className="flex justify-center items-center gap-3">
                    <div className="loader-button" />
                    <span>Creando solicitud</span>
                  </div>
                ) : (
                  "Crear solicitud"
                )
              ) : (
                "Siguiente"
              )}
            </Button>
          </CardFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditRequestModal;
