"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ProcessManagementResolutions = () => {
  const [formData, setFormData] = useState({
    resolutionNumber: "",
    issuanceDate: "",
    resolutionType: "",
    resolutionContent: "",
    implementationStatus: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Proceso de Gestión de Resoluciones Judiciales</DialogTitle>
      </DialogHeader>
      <div>
        <Label htmlFor="resolutionNumber">Número de resolución</Label>
        <Input
          id="resolutionNumber"
          name="resolutionNumber"
          value={formData.resolutionNumber}
          onChange={handleChange}
          placeholder="Ej.: RES-2023-001"
        />
      </div>

      <div>
        <Label htmlFor="issuanceDate">Fecha de emisión</Label>
        <Input
          id="issuanceDate"
          name="issuanceDate"
          type="date"
          value={formData.issuanceDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="resolutionType">Tipo de resolución</Label>
        <Input
          id="resolutionType"
          name="resolutionType"
          value={formData.resolutionType}
          onChange={handleChange}
          placeholder="Ej.: Modificación de Condición, Revocación"
        />
      </div>

      <div>
        <Label htmlFor="resolutionContent">Contenido de la resolución</Label>
        <Textarea
          id="resolutionContent"
          name="resolutionContent"
          value={formData.resolutionContent}
          onChange={handleChange}
          placeholder="Resumen del contenido de la resolución"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="implementationStatus">Estado de implementación</Label>
        <Select
          onValueChange={(value) =>
            handleSelectChange("implementationStatus", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="implemented">Implemented</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" variant={"primary"}>
        Register Resolution
      </Button>
    </form>
  );
};

export default ProcessManagementResolutions;
