import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Circle } from "lucide-react";

interface Props {
  obligation?: {
    contractualObligation: string;
    fileName: string;
    status: string;
    observations: string;
  };
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ obligation, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detalles de obligación
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-sm text-gray-500">
                Obligación contractual
              </span>
              <span className="font-medium">
                {obligation?.contractualObligation}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-sm text-gray-500">Archivo adjunto</span>
              <span className="font-mono">{obligation?.fileName}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-sm text-gray-500">Estado</span>
              <span
                className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                  obligation?.status === "Activo"
                    ? "bg-green-400 text-white"
                    : obligation?.status === "Pendiente"
                    ? "bg-yellow-400 text-black"
                    : obligation?.status === "En progreso"
                    ? "bg-blue-400 text-white"
                    : obligation?.status === "Completado"
                    ? "bg-purple-400 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {obligation?.status === "Activo" ? (
                  "● Activo"
                ) : obligation?.status === "Pendiente" ? (
                  "● Pendiente"
                ) : obligation?.status === "En progreso" ? (
                  "● En progreso"
                ) : obligation?.status === "Completado" ? (
                  "● Completado"
                ) : (
                  <div className="flex items-center gap-1">
                    <Circle size={7} /> Desconocido
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
