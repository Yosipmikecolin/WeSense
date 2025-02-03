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
import { Step2Data, StepProps } from "../interfaces";

const CauseForm = ({ data, updateData, setCompleteForm }: StepProps) => {
  const [formData, setFormData] = useState<Step2Data>(data as Step2Data);

  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, setCompleteForm]);

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
        <Label htmlFor="tipoPena">Tipo de pena o Medida sujeta a control</Label>
        <Input
          id="tipoPena"
          name="tipoPena"
          value={formData.tipoPena || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="corteApelaciones">Corte de Apelaciones</Label>
        <Input
          id="corteApelaciones"
          name="corteApelaciones"
          value={formData.corteApelaciones || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="regionTribunal">Región del Tribunal</Label>
        <Select
          name="regionTribunal"
          onValueChange={(value) => handleSelectChange("regionTribunal", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione región" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metropolitana">Metropolitana</SelectItem>
            <SelectItem value="valparaiso">Valparaíso</SelectItem>
            <SelectItem value="biobio">Biobío</SelectItem>
            {/* Agregar más regiones según sea necesario */}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="tribunal">Tribunal</Label>
        <Input
          id="tribunal"
          name="tribunal"
          value={formData.tribunal || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="ruc">RUC</Label>
        <Input
          id="ruc"
          name="ruc"
          value={formData.ruc || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="rit">RIT</Label>
        <Input
          id="rit"
          name="rit"
          value={formData.rit || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="rol">ROL</Label>
        <Input
          id="rol"
          name="rol"
          value={formData.rol || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CauseForm;
