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
import PhotoUpload from "../photo-upload/PhotoUpload";
import Map from "@/components/map/Map";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface DomicilioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DomicilioModal = ({ isOpen, onClose }: DomicilioModalProps) => {
  const [calificacion, setCalificacion] = useState<string>("");
  const [ubicacion, setUbicacion] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [fotos, setFotos] = useState<File[]>([]);
  const [cobertura, setCobertura] = useState<string>("");
  const [opciones, setOpciones] = useState<string[]>([]);

  const handleSubmit = () => {
    console.log({ calificacion, ubicacion, fotos, cobertura, opciones });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-3xl mb-3">Editar estado</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="calificacion">Calificación</Label>
              <Select onValueChange={setCalificacion} value={calificacion}>
                <SelectTrigger id="calificacion">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positivo">Positivo</SelectItem>
                  <SelectItem value="negativo">Negativo</SelectItem>
                  <SelectItem value="no-recomendable">
                    No recomendable
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 w-full">
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
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <Label>Ubicación</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={15} />
                  </TooltipTrigger>
                  <TooltipContent className="w-44">
                    Para obtener la ubicación exacta, por favor, introduce las
                    coordenadas de latitud y longitud
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex justify-between gap-2  mb-2">
              <Input type="number" placeholder="Latitud" />
              <Input type="number" placeholder="Longitud" />
            </div>
            <Map latitude={4.742607980750079} longitude={-74.09222245670576} />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="calificacion">Opciones</Label>
            <Select onValueChange={setCalificacion} value={calificacion}>
              <SelectTrigger id="options">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="positivo">geográficos</SelectItem>
                <SelectItem value="negativo">habitacionales</SelectItem>
                <SelectItem value="negativo">infraestructura</SelectItem>
                <SelectItem value="negativo">conectividad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 ">
            <Label>Fotos</Label>
            <PhotoUpload onPhotosSelected={setFotos} />
          </div>
        </div>
        <DialogFooter>
          <Button variant={"primary"} onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DomicilioModal;
