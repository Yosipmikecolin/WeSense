import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepProps } from "../interfaces";

const RequesterForm = ({ data, updateData, setCompleteForm }: StepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="tipoRequirente">Tipo de requirente</Label>
        <Select defaultValue="juez">
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el tipo de requirente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="juez">Juez</SelectItem>
            <SelectItem value="tribunal">Tribunal</SelectItem>
            <SelectItem value="abogado">Abogado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="nombreCompleto">Nombre completo</Label>
        <Input id="nombreCompleto" name="nombreCompleto" />
      </div>
      <div>
        <Label htmlFor="numeroDocumento">
          Número de documento de identificación
        </Label>
        <Input id="numeroDocumento" name="numeroDocumento" />
      </div>
      <div>
        <Label htmlFor="profesionCargo">Profesión/Cargo</Label>
        <Input id="profesionCargo" name="profesionCargo" />
      </div>
      <div>
        <Label htmlFor="correoElectronico">Correo electrónico</Label>
        <Input id="correoElectronico" name="correoElectronico" type="email" />
      </div>
      <div>
        <Label htmlFor="telefono">Teléfono de contacto</Label>
        <Input id="telefono" name="telefono" type="tel" />
      </div>
    </div>
  );
};

export default RequesterForm;
