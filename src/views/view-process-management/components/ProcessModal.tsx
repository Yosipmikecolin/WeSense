import { deleteCarrier } from "@/api/request";
import { Button } from "@/components/ui/button";
import { useBuddieStore } from "@/store/index";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ProcessType } from "../ViewProcessManagement";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  process?: ProcessType;
  onClose: VoidFunction;
}

const ProcessModal = ({ onClose, process, open }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (process) {
      try {
        setLoading(true);
        const response = await axios.delete(`/api/awardee/reception`, {
          params: {
            process,
          },
        });
        // refetch();
        // onClose();
      } catch (error) {
        toast.error("Ocurrio un error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle>Aceptar Proceso</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="resolutionNumber">Número de resolución</Label>
            <Input
              id="resolutionNumber"
              name="resolutionNumber"
              placeholder="Ej.: RES-2023-001"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant={"primary"}>
              Se notifica al solicitante
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessModal;
