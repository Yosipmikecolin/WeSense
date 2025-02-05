import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepProps } from "../interfaces";

const ApplicantDataForm = ({}: StepProps) => {
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
        <Label htmlFor="run">RUN</Label>
        <Input id="run" name="run" />
      </div>
    </div>
  );
};

export default ApplicantDataForm;
