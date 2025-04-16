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

export interface AlertType {
  _id: string;
  alarmId: string;
  alarmDateTime: string;
  alarmType: string;
  alarmDescription: string;
  actionTaken: string;
  resolutionStatus: string;
}

interface Props {
  onClose: () => void;
  alert: AlertType | null;
}

const ProcessManagementAlarms = ({ alert, onClose }: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    alarmId: "",
    alarmDateTime: "",
    alarmType: "",
    alarmDescription: "",
    actionTaken: "",
    resolutionStatus: "",
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
    console.log("FORM: ", formData);
    const response = await axios.post(`/api/awardee/alert`, formData);
    console.log("DATA: ", response.data);
    setFormData({
      alarmId: "",
      alarmDateTime: "",
      alarmType: "",
      alarmDescription: "",
      actionTaken: "",
      resolutionStatus: "",
    });
    onClose();
  };

  const update = async () => {
    const data = {
      ...alert,
      ...formData,
    };
    const response = await axios.put(`/api/awardee/alert`, data);
    setFormData({
      alarmId: "",
      alarmDateTime: "",
      alarmType: "",
      alarmDescription: "",
      actionTaken: "",
      resolutionStatus: "",
    });
    onClose();
  };

  useEffect(() => {
    if (alert) {
      setIsUpdate(true);
      setFormData(alert);
    }
  }, [alert]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Proceso de Gestión de Alarmas</DialogTitle>
      </DialogHeader>
      <div>
        <Label htmlFor="alarmId">ID de Alarma</Label>
        <Input
          id="alarmId"
          name="alarmId"
          value={formData.alarmId}
          onChange={handleChange}
          placeholder="Ej: ALM-2023-001"
        />
      </div>

      <div>
        <Label htmlFor="alarmDateTime">Fecha y Hora de alarma</Label>
        <Input
          id="alarmDateTime"
          name="alarmDateTime"
          type="datetime-local"
          value={formData.alarmDateTime}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="alarmType">Tipo de alarma</Label>
        <Select
          onValueChange={(value) => handleSelectChange("alarmType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona el tipo de alarma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="restricted_zone">
              Entrada a una Zona Restringida
            </SelectItem>
            <SelectItem value="tampering">
              Manipulación del Dispositivo
            </SelectItem>
            <SelectItem value="low_battery">Batería Baja</SelectItem>
            <SelectItem value="signal_loss">Pérdida de Señal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="alarmDescription">Descripción de la alarma</Label>
        <Textarea
          id="alarmDescription"
          name="alarmDescription"
          value={formData.alarmDescription}
          onChange={handleChange}
          placeholder="Detalles sobre la alarma activada"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="actionTaken">Acción tomada</Label>
        <Textarea
          id="actionTaken"
          name="actionTaken"
          value={formData.actionTaken}
          onChange={handleChange}
          placeholder="Describir las acciones tomadas en respuesta a la alarma"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="resolutionStatus">Estado de resolución</Label>
        <Select
          onValueChange={(value) =>
            handleSelectChange("resolutionStatus", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="in_progress">En proceso</SelectItem>
            <SelectItem value="resolved">Resuelta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" variant={"primary"}>
        {isUpdate ? "Editar Alarma" : "Registrar Alarma"}
      </Button>
    </form>
  );
};

export default ProcessManagementAlarms;
