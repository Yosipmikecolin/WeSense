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

const InstallationModal = ({ onClose, process, open, type }: Props) => {
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
              ? "Dentro de la fecha límite"
              : "Fuera de la fecha límite"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {type === "1" && (
              <>
                <div className="mb-3">
                  <Label htmlFor="presentation_date">
                    Fecha de presentación
                  </Label>
                  <Input
                    id="presentation_date"
                    name="presentation_date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="presentation_date">Primera visita?</Label>
                  <div className="flex items-center">
                    <Input
                      className="w-4"
                      id="presentation_date"
                      name="presentation_date"
                      type="checkbox"
                      value={firstVisit}
                      onChange={(e) => setFirstVisit(e.target.value)}
                    />
                    <span className="ml-2">Si</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="presentation_date">Segunda visita?</Label>
                  <div className="flex items-center">
                    <Input
                      className="w-4"
                      id="presentation_date"
                      name="presentation_date"
                      type="checkbox"
                      value={secondVisit}
                      onChange={(e) => setSecondVisit(e.target.value)}
                    />
                    <span className="ml-2">Si</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <Label htmlFor="note">Nota</Label>
            <Textarea
              id="note"
              name="note"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Escribe una nota corta..."
            />
          </div>

          <div className="flex justify-end">
            {type === "0" && (
              <Button type="submit" variant={"primary"} disabled={nota === ""}>
                Se notifica al solicitante
              </Button>
            )}
            {type === "1" && (
              <Button
                type="submit"
                variant={"primary"}
                disabled={nota === "" || date === ""}
              >
                Aceptar
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InstallationModal;
