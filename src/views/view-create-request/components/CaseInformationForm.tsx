import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Step3Data, StepProps } from "../interfaces";
import { useState } from "react";

const CaseInformationForm = ({ data, updateData, setCompleteForm }: StepProps) => {
  const [values, setValues] = useState<Step3Data>(data as Step3Data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    updateData({ ...values, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="tipoSolicitante">Tipo de Solicitante</Label>
        <Select name="tipoSolicitante" defaultValue="defensor">
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="defensor">Defensor</SelectItem>
            <SelectItem value="abogado">Abogado</SelectItem>
            <SelectItem value="particular">Particular</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="region">Región</Label>
        <Input id="d" name="region" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="tribunalJuzgado">Tribunal/Juzgado</Label>
        <Input id="tribunalJuzgado" name="tribunalJuzgado" />
      </div>
      <div>
        <Label htmlFor="ruc">RUC</Label>
        <Input id="ruc" name="ruc" />
      </div>
      <div>
        <Label htmlFor="rit">RIT</Label>
        <Input id="rit" name="rit" />
      </div>
      <div>
        <Label htmlFor="rol">Rol</Label>
        <Input id="rol" name="rol" />
      </div>
      <div>
        <Label htmlFor="delito">Delito</Label>
        <Input id="delito" name="delito" />
      </div>
      <div>
        <Label htmlFor="tipoPena">Tipo de Pena</Label>
        <Input id="tipoPena" name="tipoPena" />
      </div>
    </div>
  );
};

export default CaseInformationForm;
