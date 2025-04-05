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
import { Textarea } from "@/components/ui/textarea";

const FormObligations = () => {
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
        <CardTitle className="text-3xl">Registrar obligacion</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Obligación contractual</Label>
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
            <Label htmlFor="nit">Adjuntar archivo</Label>
            <Input
              id="nit"
              type="file"
              name="nit"
              value={formData.nit}
              onChange={handleInputChange}
              placeholder="Ingrese su NIT"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Observaciones</Label>
            <Textarea />
          </div>
          <Button variant={"primary"} className="w-full mt-2" type="submit">
            Crear obligación
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormObligations;
