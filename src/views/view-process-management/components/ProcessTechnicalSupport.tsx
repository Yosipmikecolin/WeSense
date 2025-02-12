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

const ProcessTechnicalSupport = () => {
  const [formData, setFormData] = useState({
    ticketId: "",
    openingDate: "",
    issueType: "",
    issueDescription: "",
    actionsTaken: "",
    ticketStatus: "",
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
        <DialogTitle>Proceso de Soporte Técnico</DialogTitle>
      </DialogHeader>

      <div>
        <Label htmlFor="ticketId">ID de ticket</Label>
        <Input
          id="ticketId"
          name="ticketId"
          value={formData.ticketId}
          onChange={handleChange}
          placeholder="Ej: TIC-2023-001"
        />
      </div>

      <div>
        <Label htmlFor="openingDate">Fecha de apertura</Label>
        <Input
          id="openingDate"
          name="openingDate"
          type="date"
          value={formData.openingDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="issueType">Tipo de problema</Label>
        <Select
          onValueChange={(value) => handleSelectChange("issueType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el tipo de problema" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hardware">Hardware Issue</SelectItem>
            <SelectItem value="software">Software Issue</SelectItem>
            <SelectItem value="connectivity">Connectivity Issue</SelectItem>
            <SelectItem value="user">User Issue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="issueDescription">Descripción del problema</Label>
        <Textarea
          id="issueDescription"
          name="issueDescription"
          value={formData.issueDescription}
          onChange={handleChange}
          placeholder="Detalle el problema reportado"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="actionsTaken">Acciones tomadas</Label>
        <Textarea
          id="actionsTaken"
          name="actionsTaken"
          value={formData.actionsTaken}
          onChange={handleChange}
          placeholder="Describa las acciones tomadas para resolver el problema"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="ticketStatus">Estado del ticket</Label>
        <Select
          onValueChange={(value) => handleSelectChange("ticketStatus", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" variant={"primary"}>
        Register Ticket
      </Button>
    </form>
  );
};

export default ProcessTechnicalSupport;
