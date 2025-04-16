"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DeviceForm from "@/components/devices/Device";
import axios from "axios";

export interface InstalationType {
  _id: string;
  deviceStatus: string;
  installationLocation: string;
  deviceType: string;
  serialNumber: string;
  installationDate: string;
}

interface Props {
  onClose: () => void;
  instalation: InstalationType | null;
}

const InstallationProcess = ({ instalation, onClose }: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    deviceStatus: "",
    installationLocation: "",
    deviceType: "vacio",
    serialNumber: "",
    installationDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const response = await axios.post(`/api/awardee/instalation`, formData);
    console.log("DATA: ", response.data);
    setFormData({
      deviceStatus: "",
      installationLocation: "",
      deviceType: "",
      serialNumber: "",
      installationDate: "",
    });
    onClose();
  };

  const update = async () => {
    const data = {
      ...instalation,
      ...formData,
    };
    const response = await axios.put(`/api/awardee/instalation`, data);
    setFormData({
      deviceStatus: "",
      installationLocation: "",
      deviceType: "",
      serialNumber: "",
      installationDate: "",
    });
    onClose();
  };

  useEffect(() => {
    if (instalation) {
      setIsUpdate(true);
      setFormData(instalation);
    }
  }, [instalation]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>
          Proceso de Instalación y Entrega de Dispositivo
        </DialogTitle>
      </DialogHeader>

      <div>
        <Label htmlFor="deviceStatus">Estado del dispositivo</Label>
        <Select
          onValueChange={(value) => handleSelectChange("deviceStatus", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Nuevo</SelectItem>
            <SelectItem value="refurbished">Reacondicionado</SelectItem>
            <SelectItem value="used">Usado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="installationLocation">Lugar de instalación</Label>
        <Input
          id="installationLocation"
          name="installationLocation"
          value={formData.installationLocation}
          onChange={handleChange}
          placeholder="Ej: Domicilio del usuario"
        />
      </div>

      <DeviceForm />

      <div>
        <Label htmlFor="serialNumber">Número de serie</Label>
        <Input
          id="serialNumber"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          placeholder="Ej: BRZ-12345"
        />
      </div>

      <div>
        <Label htmlFor="installationDate">Fecha de instalación</Label>
        <Input
          id="installationDate"
          name="installationDate"
          type="date"
          value={formData.installationDate.split("T")[0]}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" variant={"primary"}>
        {isUpdate ? "Editar Instalación" : "Registrar Instalación"}
      </Button>
    </form>
  );
};

export default InstallationProcess;
