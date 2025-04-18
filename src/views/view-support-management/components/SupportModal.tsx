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
// import { ProcessType } from "../ViewProcessManagement";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SupportType } from "../ViewSupportManagement";

interface Props {
  open: boolean;
  support?: SupportType;
  onClose: VoidFunction;
  type: string;
  refetch: () => void;
}

const SupportModal = ({ onClose, support, open, type, refetch }: Props) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (support) {
      try {
        setLoading(true);
        const response = await axios.put(`/api/awardee/support`, {
          _id: support._id,
        });
        console.log("RESPONSE: ", response.data);
        setDate("");
        refetch();
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
          <DialogTitle>Cerrar ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="note">Fecha de resolución</Label>
            <Input
              id="date"
              name="date"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="note">Respuesta del soporte</Label>
            <Input
              id="note"
              name="note"
              // value={nota}
              type="file"
              // onChange={(e) => setNota(e.target.value)}
              // placeholder="Escribe una nota corta..."
            />
          </div>
          <div>
            <Label htmlFor="presentation_date">Se presenta técnico?</Label>
            <div className="flex items-center">
              <Input
                className="w-4"
                id="presentation_date"
                name="presentation_date"
                type="checkbox"
                // value={secondVisit}
                // onChange={(e) => setSecondVisit(e.target.value)}
              />
              <span className="ml-2">Si</span>
            </div>
            <div className="flex items-center">
              <Input
                className="w-4"
                id="presentation_date"
                name="presentation_date"
                type="checkbox"
                // value={secondVisit}
                // onChange={(e) => setSecondVisit(e.target.value)}
              />
              <span className="ml-2">No</span>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant={"primary"} disabled={date === ""}>
              Cerrar Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupportModal;
