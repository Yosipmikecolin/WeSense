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
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const FormRequest = () => {
  const [date, setDate] = useState<Date>();
  return (
    <Card className="w-full max-w-3xl mx-auto p-5">
      <CardHeader>
        <CardTitle className="text-3xl mb-3">Crear requirente</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input id="fullName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Apellido paterno</Label>
              <Input id="fullName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Apellido Materno</Label>
              <Input id="email" type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">RUN</Label>
              <Input id="email" type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de usuario</Label>
              <Select>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Seleccione el tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defensores">Defensores</SelectItem>
                  <SelectItem value="abogados">
                    Abogados particulares
                  </SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institución</Label>
              <Input id="institution" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="identificationNumber">
                Número de Identificación
              </Label>
              <Input id="identificationNumber" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Región</Label>
              <Input id="region" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessAreas">Áreas de Acceso</Label>
              <Input id="accessAreas" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationDate">Fecha de Registro</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? (
                      format(date, "PPP", { locale: es })
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    classNames={{
                      day_selected:
                        "bg-green-500 text-white hover:bg-green-500",
                    }}
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
                  <SelectItem value="tarjeta">Tarjeta de identidad</SelectItem>
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
            <Textarea id="observations" />
          </div>
          <Button variant={"primary"} type="submit">
            Crear requirente
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormRequest;
