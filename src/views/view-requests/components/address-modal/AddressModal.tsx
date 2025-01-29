"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from "next/dynamic";
import PhotoUpload from "../photo-upload/PhotoUpload";

interface DomicilioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DomicilioModal({
  isOpen,
  onClose,
}: DomicilioModalProps) {
  const [calificacion, setCalificacion] = useState<string>("");
  const [ubicacion, setUbicacion] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [fotos, setFotos] = useState<File[]>([]);
  const [cobertura, setCobertura] = useState<string>("");
  const [opciones, setOpciones] = useState<string[]>([]);

  const handleSubmit = () => {
    // Aquí puedes manejar el envío del formulario
    console.log({ calificacion, ubicacion, fotos, cobertura, opciones });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar estado</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="calificacion">Calificación</Label>
            <Select onValueChange={setCalificacion} value={calificacion}>
              <SelectTrigger id="calificacion">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="positivo">Positivo</SelectItem>
                <SelectItem value="negativo">Negativo</SelectItem>
                <SelectItem value="no-recomendable">No recomendable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="cobertura">Cobertura mínima</Label>
            <Input
              id="cobertura"
              type="number"
              min="0"
              max="100"
              value={cobertura}
              onChange={(e) => setCobertura(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Ubicación</Label>
            <div>Mapa</div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Fotos</Label>
            <PhotoUpload onPhotosSelected={setFotos} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Opciones</Label>
            <div className="space-y-2">
              {[
                "geográficos",
                "habitacionales",
                "infraestructura",
                "conectividad",
              ].map((opcion) => (
                <div key={opcion} className="flex items-center space-x-2">
                  <Checkbox
                    id={opcion}
                    checked={opciones.includes(opcion)}
                    onCheckedChange={(checked) => {
                      setOpciones(
                        checked
                          ? [...opciones, opcion]
                          : opciones.filter((item) => item !== opcion)
                      );
                    }}
                  />
                  <label
                    htmlFor={opcion}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {opcion}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
