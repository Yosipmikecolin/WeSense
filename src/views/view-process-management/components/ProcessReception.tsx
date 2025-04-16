"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import axios from "axios";

export interface ReceptionType {
  _id: string;
  caseNumber: string;
  receptionDate: string;
  documentType: string;
  documentContent: string;
}

interface Props {
  onClose: () => void;
  reception: ReceptionType | null;
}

const ProcessReception = ({ onClose, reception }: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);
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

  const save = async () => {
    const response = await axios.post(`/api/awardee/reception`, formData);
    setFormData({
      caseNumber: "",
      receptionDate: "",
      documentType: "",
      documentContent: "",
    });
    onClose();
  };

  const update = async () => {
    const data = {
      ...reception,
      ...formData,
    };
    const response = await axios.put(`/api/awardee/reception`, data);
    setFormData({
      caseNumber: "",
      receptionDate: "",
      documentType: "",
      documentContent: "",
    });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      update();
    } else {
      save();
    }
  };

  useEffect(() => {
    if (reception) {
      setIsUpdate(true);
      setFormData(reception);
    }
  }, [reception]);

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
          value={formData.receptionDate.split("T")[0]}
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
        {isUpdate ? "Editar Recepción" : "Registrar Recepción"}
      </Button>
    </form>
  );
};

export default ProcessReception;
