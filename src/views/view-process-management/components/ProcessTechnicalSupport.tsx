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

export interface SuportType {
  _id: string;
  ticketId: string;
  openingDate: string;
  issueType: string;
  issueDescription: string;
  actionsTaken: string;
  ticketStatus: string;
}

interface Props {
  onClose: () => void;
  suport: SuportType | null;
}

const ProcessTechnicalSupport = ({ onClose, suport }: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);
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
    if (isUpdate) {
      update();
    } else {
      save();
    }
    console.log("Form data:", formData);
  };

  const save = async () => {
    console.log("FORM: ", formData);
    const response = await axios.post(`/api/awardee/suport`, formData);
    console.log("DATA: ", response.data);
    setFormData({
      ticketId: "",
      openingDate: "",
      issueType: "",
      issueDescription: "",
      actionsTaken: "",
      ticketStatus: "",
    });
    onClose();
  };

  const update = async () => {
    const data = {
      ...alert,
      ...formData,
    };
    const response = await axios.put(`/api/awardee/suport`, data);
    setFormData({
      ticketId: "",
      openingDate: "",
      issueType: "",
      issueDescription: "",
      actionsTaken: "",
      ticketStatus: "",
    });
    onClose();
  };

  useEffect(() => {
    if (suport) {
      setIsUpdate(true);
      setFormData(suport);
    }
  }, [suport]);

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
        {isUpdate ? "Editar Ticket" : "Registrar Ticket"}
      </Button>
    </form>
  );
};

export default ProcessTechnicalSupport;
