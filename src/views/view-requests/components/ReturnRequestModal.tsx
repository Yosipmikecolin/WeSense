import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ReturnRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const ReturnRequestModal = ({ open, onClose }: ReturnRequestModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-3xl mb-3">
            Devolver solicitud
          </DialogTitle>
        </DialogHeader>
        <div className="mt-3">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="reason">Motivo de la devolución</Label>
            <Select>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faltan-documentos">
                  Faltan documentos
                </SelectItem>
                <SelectItem value="faltan-pruebas">Faltan pruebas</SelectItem>
                <SelectItem value="info-erronea">
                  Información errónea
                </SelectItem>
                <SelectItem value="datos-incorrectos">
                  Datos incorrectos
                </SelectItem>
                <SelectItem value="aclarar-resultados">
                  Aclarar los resultados
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-2 w-full mt-3">
              <Label htmlFor="describe">Describe el motivo</Label>
              <Textarea />
            </div>
          </div>
        </div>
        <Button variant={"primary"}>Devolver solicitud</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnRequestModal;
