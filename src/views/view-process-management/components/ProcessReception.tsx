"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ProcessReception = () => {
  const [formData, setFormData] = useState({
    caseNumber: "",
    receptionDate: "",
    documentType: "",
    documentContent: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>
          Proceso de Recepción de Sentencias y Resoluciones Judiciales
        </DialogTitle>
        <DialogDescription>
          Ingrese los detalles de la nueva recepción de sentencia o resolución
          judicial.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2">
        <Label htmlFor="caseNumber">Número de expediente</Label>
        <Input
          id="caseNumber"
          name="caseNumber"
          value={formData.caseNumber}
          onChange={handleChange}
          placeholder="Ej: 123/2023"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="receptionDate">Fecha de recepción</Label>
        <Input
          id="receptionDate"
          name="receptionDate"
          type="date"
          value={formData.receptionDate}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="documentType">Tipo de documento</Label>
        <Input
          id="documentType"
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          placeholder="Ej.: Sentencia, Resolución"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="documentContent">Contenido del documento</Label>
        <Textarea
          id="documentContent"
          name="documentContent"
          value={formData.documentContent}
          onChange={handleChange}
          placeholder="Resumen del contenido del documento."
          rows={4}
        />
      </div>

      <Button type="submit" variant={"primary"}>
        Register Reception
      </Button>
    </form>
  );
};

export default ProcessReception;
