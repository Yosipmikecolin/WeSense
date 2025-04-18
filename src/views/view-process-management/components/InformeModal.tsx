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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  open: boolean;
  process?: ProcessType;
  onClose: VoidFunction;
  type: string;
}

const InformeModal = ({ onClose, process, open, type }: Props) => {
  const [loading, setLoading] = useState(false);
  const [nota, setNota] = useState("");
  const [date, setDate] = useState("");
  const [firstVisit, setFirstVisit] = useState("");
  const [secondVisit, setSecondVisit] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (process) {
      try {
        setLoading(true);
        // refetch();
        setNota("");
        setDate("");
        setFirstVisit("");
        setSecondVisit("");
        onClose();
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
          <DialogTitle>
            {type === "1"
              ? "Respuesta de resolución"
              : "Fuera de la fecha límite"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="note">Respuesta</Label>
            <Textarea
              id="note"
              name="note"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Escribir..."
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="presentation_date">Adjuntar documento</Label>
            <Input
              id="presentation_date"
              name="presentation_date"
              type="file"
              // value={date}
              // onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant={"primary"} disabled={nota === ""}>
              Aceptar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InformeModal;
