import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { StepProps } from "../interfaces";

const PersonDataForm = ({}: StepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
        <Input id="apellidoPaterno" name="apellidoPaterno" />
      </div>
      <div>
        <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
        <Input id="apellidoMaterno" name="apellidoMaterno" />
      </div>
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" name="nombre" />
      </div>
      <div>
        <Label htmlFor="genero">Género</Label>
        <Select name="genero">
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="femenino">Femenino</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
        <Input id="fechaNacimiento" name="fechaNacimiento" type="date" />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="extranjero" name="extranjero" />
        <Label htmlFor="extranjero">¿Es extranjero?</Label>
      </div>
      <div>
        <Label htmlFor="run">RUN</Label>
        <Input id="run" name="run" />
      </div>
      <div>
        <Label htmlFor="sexo">Sexo</Label>
        <Select name="sexo">
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el sexo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="femenino">Femenino</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PersonDataForm;
