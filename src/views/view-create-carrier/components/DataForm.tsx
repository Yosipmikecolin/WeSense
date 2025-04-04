import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Step1Data, StepProps } from "../interfaces";
import { Switch } from "@/components/ui/switch";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const DataForm = ({ data, setCompleteForm, updateData }: StepProps) => {
  const [formData, setFormData] = useState<Step1Data>(data as Step1Data);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, updateData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nombreCompleto">Nombre Completo</Label>
        <Input
          id="nombreCompleto"
          name="nombreCompleto"
          value={formData.nombreCompleto || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="nombreSocial">Nombre Social</Label>
        <Input
          id="nombreSocial"
          name="nombreSocial"
          value={formData.nombreSocial || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
        <Input id="apellidoPaterno" name="apellidoPaterno" />
      </div>
      <div>
        <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
        <Input id="apellidoMaterno" name="apellidoMaterno" />
      </div>
      <div>
        <Label htmlFor="run">RUN</Label>
        <Input
          id="run"
          name="run"
          value={formData.run || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="sexo">Tipo de portador</Label>
        <Select
          name="type_current"
          onValueChange={(value) => handleSelectChange("type_current", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Personas condenada</SelectItem>
            <SelectItem value="2">Personas sujeta a control</SelectItem>
            <SelectItem value="3">Víctima</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="sexo">Género</Label>
        <Select
          name="genero"
          onValueChange={(value) => handleSelectChange("sexo", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="femenino">Femenino</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="sexo">Sexo</Label>
        <Select name="sexo">
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el sexo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="femenino">Femenino</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
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
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              classNames={{
                day_selected: "bg-green-500 text-white hover:bg-green-500",
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="estadoCivil">Estado Civil</Label>
        <Select
          name="estadoCivil"
          onValueChange={(value) => handleSelectChange("estadoCivil", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione estado civil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="soltero">Soltero/a</SelectItem>
            <SelectItem value="casado">Casado/a</SelectItem>
            <SelectItem value="divorciado">Divorciado/a</SelectItem>
            <SelectItem value="viudo">Viudo/a</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="nacionalidad">Nacionalidad</Label>
        <Input
          id="nacionalidad"
          name="nacionalidad"
          value={formData.nacionalidad || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="telefono">Número teléfono celular</Label>
        <Input
          id="telefono"
          name="telefono"
          type="tel"
          value={formData.telefono || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="extranjero" name="extranjero" />
        <Label htmlFor="extranjero">¿Es extranjero?</Label>
      </div>
    </div>
  );
};

export default DataForm;
