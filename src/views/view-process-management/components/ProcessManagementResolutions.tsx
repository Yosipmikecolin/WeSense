"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";

export interface ResolutionType {
  _id: string;
  resolutionNumber: string;
  issuanceDate: string;
  resolutionType: string;
  resolutionContent: string;
  implementationStatus: string;
}

interface Props {
  onClose: () => void;
  resolution: ResolutionType | null;
}

const ProcessManagementResolutions = ({ onClose, resolution }: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);
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
    if (isUpdate) {
      update();
    } else {
      save();
    }
    console.log("Form data:", formData);
  };

  const save = async () => {
    console.log("FORM: ", formData)
    const response = await axios.post(`/api/awardee/resolution`, formData);
    console.log("DATA: ", response.data)
    setFormData({
      resolutionNumber: "",
      issuanceDate: "",
      resolutionType: "",
      resolutionContent: "",
      implementationStatus: "",
    });
    onClose();
  };

  const update = async () => {
    const data = {
      ...resolution,
      ...formData,
    };
    const response = await axios.put(`/api/awardee/resolution`, data);
    setFormData({
      resolutionNumber: "",
      issuanceDate: "",
      resolutionType: "",
      resolutionContent: "",
      implementationStatus: "",
    });
    onClose();
  };

  useEffect(() => {
    if (resolution) {
      setIsUpdate(true);
      setFormData(resolution);
    }
  }, [resolution]);

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
          value={formData.issuanceDate.split("T")[0]}
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
        {isUpdate ? "Editar Resolución" : "Registrar Resolución"}
      </Button>
    </form>
  );
};

export default ProcessManagementResolutions;
