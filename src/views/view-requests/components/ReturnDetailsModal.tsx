import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReturnDetailsProps {
  open: boolean;
  onClose: VoidFunction;
}

const ReturnDetailsModal = ({ open, onClose }: ReturnDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Razón de la devolución</DialogTitle>
          <DialogDescription>
            Yosip Parrado envió la siguiente nota.
          </DialogDescription>
        </DialogHeader>
        <p>
          La solicitud fue devuelta debido a que los datos adjuntos no coinciden
          con la ubicación del solicitante. Asimismo, no se adjuntaron las
          pruebas fotográficas del lugar de alojamiento.
        </p>
        <DialogFooter>
          <Button type="submit" onClick={onClose}>
            Entiendo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnDetailsModal;
