"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FormUser = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    nit: "",
    profile: "",
    status: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      toast({
        title: "Error",
        description: "Por favor, complete todos los campos.",
        variant: "default",
      });
    } else {
      console.log("Datos del formulario:", formData);
      toast({
        title: "Éxito",
        description: "Formulario enviado correctamente.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-5">
      <CardHeader>
        <CardTitle className="text-3xl">Registro de usuario</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Ingrese su nombre completo"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nit">NIT</Label>
            <Input
              id="nit"
              name="nit"
              value={formData.nit}
              onChange={handleInputChange}
              placeholder="Ingrese su NIT"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile">Perfil</Label>
            <Select
              name="profile"
              value={formData.profile}
              onValueChange={(value) => handleSelectChange("profile", value)}
            >
              <SelectTrigger id="profile">
                <SelectValue placeholder="Seleccione un perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user">Requirente</SelectItem>
                <SelectItem value="guest">Coordinador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccione un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-green-400 text-white hover:bg-green-500 w-full mt-2" type="submit">
            Crear usuario
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormUser;
