import { updatedRequest } from "@/api/request";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RequestTable } from "@/views/view-create-request/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  request: RequestTable;
  onClose: VoidFunction;
  refetch: VoidFunction;
}

export const ChangeAddressModal = ({
  isOpen,
  onClose,
  refetch,
  request,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    type1: "",
    number: "",
    type2: "",
    information: "",
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await updatedRequest({
        ...request,
        status: "reviewing",
      });
      refetch();
      toast.success("Se genero una nueva SIFT");
      onClose();
    } catch (error) {
      toast.error("Error al generar la SIFT");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl mb-3">Cambiar domicilió</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label>Tipo</Label>
            <Select
              onValueChange={(value) =>
                setValues((prev) => ({ ...prev, type1: value }))
              }
              value={values.type1}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Calle">Calle</SelectItem>
                <SelectItem value="Carrera">Carrera</SelectItem>
                <SelectItem value="Avenida">Avenida</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Número de la dirección</Label>
            <Input
              placeholder="Número"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, number: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Tipo de residencia</Label>
            <Input
              placeholder="Apt/Casa/Local"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, type2: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Información adicional</Label>
            <Textarea
              onChange={(e) =>
                setValues((prev) => ({ ...prev, information: e.target.value }))
              }
            />
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between">
          <Button
            variant={"primary"}
            onClick={handleSubmit}
            disabled={
              isLoading ||
              values.type1 === "" ||
              values.number === "" ||
              values.type2 === "" ||
              values.information === ""
            }
          >
            {isLoading ? (
              <div className="loader-button" />
            ) : (
              "Crear una nueva SIFT"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
