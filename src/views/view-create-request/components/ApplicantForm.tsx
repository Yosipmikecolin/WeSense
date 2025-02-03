import type React from "react";
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
import { Step1Data, StepProps } from "../interfaces";

const ApplicantForm = ({ data, setCompleteForm, updateData }: StepProps) => {
  const [formData, setFormData] = useState<Step1Data>(data as Step1Data);

  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, updateData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nombreCompleto">
          Nombre completo de la persona solicitante
        </Label>
        <Input
          id="nombreCompleto"
          name="nombreCompleto"
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="numeroDocumento">
          Número de documento de identificación
        </Label>
        <Input
          id="numeroDocumento"
          name="numeroDocumento"
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
        <Input
          id="fechaNacimiento"
          name="fechaNacimiento"
          type="date"
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="sexo">Sexo</Label>
        <Select>
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
      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Input id="direccion" name="direccion" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="telefono">Número de teléfono</Label>
        <Input
          id="telefono"
          name="telefono"
          type="tel"
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="correoElectronico">
          Correo electrónico (si es aplicable)
        </Label>
        <Input
          id="correoElectronico"
          name="correoElectronico"
          type="email"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ApplicantForm;
