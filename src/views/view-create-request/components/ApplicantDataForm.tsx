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

const ApplicantDataForm = ({ data, setCompleteForm, updateData }: StepProps) => {
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
        <Label htmlFor="run">RUN</Label>
        <Input id="run" name="run" onChange={handleChange} />
      </div>
    </div>
  );
};

export default ApplicantDataForm;
