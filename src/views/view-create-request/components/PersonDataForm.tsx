"use client"

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
import { Step3Data, StepProps } from "../interfaces";

const PersonDataForm = ({ data, updateData, setCompleteForm }: StepProps) => {
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
        <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
        <Input
          id="apellidoPaterno"
          name="apellidoPaterno"
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
        <Input
          id="apellidoMaterno"
          name="apellidoMaterno"
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" name="nombre" onChange={handleChange} />
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
        <Input
          id="fechaNacimiento"
          name="fechaNacimiento"
          type="date"
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="extranjero" name="extranjero" />
        <Label htmlFor="extranjero">¿Es extranjero?</Label>
      </div>
      <div>
        <Label htmlFor="run">RUN</Label>
        <Input id="run" name="run" onChange={handleChange} />
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
