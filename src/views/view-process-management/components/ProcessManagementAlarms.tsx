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

const ProcessManagementAlarms = () => {
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
    console.log("Form data:", formData);
  };

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
            <SelectValue placeholder="Select alarm type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="restricted_zone">
              Entering a Restricted Zone
            </SelectItem>
            <SelectItem value="tampering">Device Tampering</SelectItem>
            <SelectItem value="low_battery">Low Battery</SelectItem>
            <SelectItem value="signal_loss">Signal Loss</SelectItem>
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" variant={"primary"}>
        Registrar Alarma
      </Button>
    </form>
  );
};

export default ProcessManagementAlarms;
