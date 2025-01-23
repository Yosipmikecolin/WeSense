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
import { Step1Data, StepProps } from "@/interfaces/create-carrier";

export default function Paso1({
  data,
  setCompleteForm,
  updateData,
}: StepProps) {
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nombreCompleto">Nombre Completo</Label>
        <Input
          id="nombreCompleto"
          name="nombreCompleto"
          value={formData.nombreCompleto || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="nombreSocial">Nombre Social</Label>
        <Input
          id="nombreSocial"
          name="nombreSocial"
          value={formData.nombreSocial || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="run">RUN</Label>
        <Input
          id="run"
          name="run"
          value={formData.run || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="sexo">Género</Label>
        <Select
          name="genero"
          onValueChange={(value) => handleSelectChange("sexo", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="femenino">Femenino</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
        <Input
          id="fechaNacimiento"
          name="fechaNacimiento"
          type="date"
          value={formData.fechaNacimiento || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="estadoCivil">Estado Civil</Label>
        <Select
          name="estadoCivil"
          onValueChange={(value) => handleSelectChange("estadoCivil", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione estado civil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="soltero">Soltero/a</SelectItem>
            <SelectItem value="casado">Casado/a</SelectItem>
            <SelectItem value="divorciado">Divorciado/a</SelectItem>
            <SelectItem value="viudo">Viudo/a</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="nacionalidad">Nacionalidad</Label>
        <Input
          id="nacionalidad"
          name="nacionalidad"
          value={formData.nacionalidad || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="telefono">Número teléfono celular</Label>
        <Input
          id="telefono"
          name="telefono"
          type="tel"
          value={formData.telefono || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
