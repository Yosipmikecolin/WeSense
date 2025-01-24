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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FormRequest = () => {
  const [date, setDate] = useState<Date>();
  return (
    
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl mb-3">Crear requirente</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input id="fullName" placeholder="José Alfredo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jose.alfredo@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="3001234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userType">Tipo de Usuario</Label>
                <Select>
                  <SelectTrigger id="userType">
                    <SelectValue placeholder="Seleccione el tipo de usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abogado">Abogado</SelectItem>
                    <SelectItem value="juez">Juez</SelectItem>
                    <SelectItem value="fiscal">Fiscal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institución</Label>
                <Input id="institution" placeholder="Tribunal Superior" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="identificationNumber">
                  Número de Identificación
                </Label>
                <Input id="identificationNumber" placeholder="AB1234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Región</Label>
                <Input id="region" placeholder="Bogotá" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Calle 123 #45-67" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessAreas">Áreas de Acceso</Label>
                <Input id="accessAreas" placeholder="Legal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationDate">Fecha de Registro</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !date && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="identityVerification">
                  Verificación de Identidad
                </Label>
                <Select>
                  <SelectTrigger id="identityVerification">
                    <SelectValue placeholder="Seleccione el tipo de documento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cedula">Cédula de ciudadanía</SelectItem>
                    <SelectItem value="pasaporte">Pasaporte</SelectItem>
                    <SelectItem value="tarjeta">
                      Tarjeta de identidad
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityQuestion">Pregunta de Seguridad</Label>
                <Input
                  id="securityQuestion"
                  placeholder="¿Cómo se llama tu madre?"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observations">Observaciones</Label>
              <Textarea
                id="observations"
                placeholder="Usuario activo desde enero"
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar Formulario
            </Button>
          </form>
        </CardContent>
      </Card>

  );
};

export default FormRequest;
