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

export interface DesactivationType {
  _id: string;
  deviceId: string;
  deactivationDate: string;
  deactivationReason: string;
  deviceStatus: string;
  comments: string;
}

interface Props {
  onClose: () => void;
  desactivation: DesactivationType | null;
}

const DeactivationProcess = ({ desactivation, onClose }: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    deviceId: "",
    deactivationDate: "",
    deactivationReason: "",
    deviceStatus: "",
    comments: "",
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
    console.log("Datos del formulario:", formData);
  };

  const save = async () => {
    console.log("FORM: ", formData);
    const response = await axios.post(`/api/awardee/desactivation`, formData);
    console.log("DATA: ", response.data);
    setFormData({
      deviceId: "",
      deactivationDate: "",
      deactivationReason: "",
      deviceStatus: "",
      comments: "",
    });
    onClose();
  };

  const update = async () => {
    const data = {
      ...desactivation,
      ...formData,
    };
    const response = await axios.put(`/api/awardee/desactivation`, data);
    setFormData({
      deviceId: "",
      deactivationDate: "",
      deactivationReason: "",
      deviceStatus: "",
      comments: "",
    });
    onClose();
  };

  useEffect(() => {
    if (desactivation) {
      setIsUpdate(true);
      setFormData(desactivation);
    }
  }, [desactivation]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>
          Proceso de Desactivación, Desinstalación y Retiro de Dispositivo
        </DialogTitle>
      </DialogHeader>

      <div>
        <Label htmlFor="deviceId">ID del Dispositivo</Label>
        <Input
          id="deviceId"
          name="deviceId"
          value={formData.deviceId}
          onChange={handleChange}
          placeholder="Ej: BRZ-12345"
        />
      </div>

      <div>
        <Label htmlFor="deactivationDate">Fecha de Desactivación</Label>
        <Input
          id="deactivationDate"
          name="deactivationDate"
          type="date"
          value={formData.deactivationDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="deactivationReason">Motivo de Desactivación</Label>
        <Select
          onValueChange={(value) =>
            handleSelectChange("deactivationReason", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el motivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="end_of_sentence">Fin de Condena</SelectItem>
            <SelectItem value="court_order">Orden Judicial</SelectItem>
            <SelectItem value="technical_failure">Fallo Técnico</SelectItem>
            <SelectItem value="replacement">
              Reemplazo de Dispositivo
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="deviceStatus">Estado del Dispositivo</Label>
        <Select
          onValueChange={(value) => handleSelectChange("deviceStatus", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="functional">Funcional</SelectItem>
            <SelectItem value="damaged">Dañado</SelectItem>
            <SelectItem value="obsolete">Obsoleto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="comments">Observaciones</Label>
        <Textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Detalles adicionales sobre la desactivación y retiro del dispositivo"
          rows={3}
        />
      </div>

      <Button type="submit" variant={"primary"}>
        {isUpdate ? "Editar Desactivación" : "Registrar Desactivación"}
      </Button>
    </form>
  );
};
export default DeactivationProcess;
