import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Flag from "react-world-flags";
import { generatePDF, generateWord } from "../../functions";
import { Download } from "lucide-react";

interface Props {
  carrier?: {
    id: number;
    fullName: string;
    socialName: string;
    nationality: string;
    countryCode: string;
    maritalStatus: string;
    gender: string;
    run: string;
    phone: string;
  };
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ carrier, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="mb-2">Detalles del portador</DialogTitle>
          <hr />
        </DialogHeader>
        <div className="grid gap-4 mt-3">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Nombre social:</span>
            <span>{carrier?.socialName}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Género:</span>
            <span>{carrier?.gender}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Nacinalidad:</span>
            <span className="flex gap-2">
              {carrier?.nationality}
              <Flag code={carrier?.countryCode} width={20} />
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Estado civil:</span>
            <span>{carrier?.maritalStatus}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">RUN:</span>
            <span>{carrier?.run}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Télefono:</span>
            <span>{carrier?.phone}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              onClick={() => generatePDF(carrier!)}
              className="bg-red-500 text-white hover:bg-red-600 hover:text-white w-full flex justify-between"
            >
              Descagar PDF
              <Download />
            </Button>
            <Button
              variant={"outline"}
              onClick={() => generateWord(carrier!)}
              className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white w-full flex justify-between"
            >
              Descagar Word
              <Download />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
