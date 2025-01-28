import { useEffect, useState } from "react";
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
import { Step3Data, StepProps } from "../../interfaces";

const ConditionForm = ({ data, updateData, setCompleteForm }: StepProps) => {
  const [formData, setFormData] = useState<Step3Data>(data as Step3Data);

  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, setFormData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="tipoSituacion">Tipo de situación legal</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el tipo de situación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="condena">Condena</SelectItem>
            <SelectItem value="sujecion">Sujeción a control</SelectItem>
            <SelectItem value="otros">Otros</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="estadoActual">Estado actual</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el estado actual" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sentencia">Sentencia condenatoria</SelectItem>
            <SelectItem value="proceso">Proceso pendiente</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="fechaCondena">Fecha de condena o situación</Label>
        <Input
          id="fechaCondena"
          name="fechaCondena"
          type="date"
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="tipoDelito">Tipo de delito (si aplica)</Label>
        <Input id="tipoDelito" name="tipoDelito" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="gradoPeligrosidad">
          Grado de peligrosidad o riesgo de fuga
        </Label>
        <Input
          id="gradoPeligrosidad"
          name="gradoPeligrosidad"
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="medidasPreventivas" />
        <Label htmlFor="medidasPreventivas">
          ¿Está bajo medidas preventivas actualmente?
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="solicitudPrevia" />
        <Label htmlFor="solicitudPrevia">
          ¿Se ha solicitado antes la instalación de la tobillera?
        </Label>
      </div>
    </div>
  );
};

export default ConditionForm;
