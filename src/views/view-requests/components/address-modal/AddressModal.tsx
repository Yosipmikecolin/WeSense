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
import PhotoUpload from "../photo-upload/PhotoUpload";
import Map from "@/components/map/Map";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, MapPinned } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Foto1 from "/public/foto-1.jpg";
import Foto2 from "/public/foto-2.jpg";
import Foto3 from "/public/foto-3.jpg";
import Foto4 from "/public/foto-4.jpg";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddressModal = ({ isOpen, onClose }: AddressModalProps) => {
  const [status, setStatus] = useState<string>("");
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });

  const [fotos, setFotos] = useState<File[]>([]);
  const [cobertura, setCobertura] = useState<string>("");
  const [opciones, setOpciones] = useState<string[]>([]);

  const handleSubmit = () => {
    console.log({ status, coordinates, fotos, cobertura, opciones });
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-3xl mb-3">
            Gestionar solicitud
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="calificacion">Estado</Label>
              <Select onValueChange={setStatus} value={status}>
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
          {status === "no-recomendable" && (
            <div className="flex flex-col gap-2 w-full">
              <Label>Razones por que no es recomendable</Label>
              <Textarea />
            </div>
          )}

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
            <div className="flex justify-between gap-2 mb-2">
              <Input
                type="text"
                placeholder="Latitud"
                value={coordinates.lat}
                onChange={(e) => {
                  let value = e.target.value;
                  if (!/^-?\d*\.?\d*$/.test(value)) return;
                  if (value.length <= 30) {
                    setCoordinates((prev) => ({
                      ...prev,
                      lat: value,
                    }));
                  }
                }}
              />
              <Input
                type="text"
                placeholder="Longitud"
                value={coordinates.lng}
                onChange={(e) => {
                  let value = e.target.value;
                  if (!/^-?\d*\.?\d*$/.test(value)) return;
                  if (value.length <= 30) {
                    setCoordinates((prev) => ({
                      ...prev,
                      lng: value,
                    }));
                  }
                }}
              />

              <Button>
                <MapPinned size={18} />
              </Button>
            </div>
            <Map latitude={-33.46651382914682} longitude={-70.66412385948745} />
          </div>

          <div className="flex justify-between items-center gap-2 mb-2">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="calificacion">Indicación de aspectos</Label>
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger id="options">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geográficos">Geográficos</SelectItem>
                  <SelectItem value="habitacionales">Habitacionales</SelectItem>
                  <SelectItem value="infraestructura">
                    Infraestructura
                  </SelectItem>
                  <SelectItem value="conectividad">Conectividad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="value">Valor</Label>
              <Input placeholder="Valor" />
            </div>
          </div>
        </div>
        <Label>Pruebas fotograficas</Label>
        <div className="flex gap-2 flex-wrap">
          <Image
            width={70}
            height={70}
            src={Foto1}
            alt="foto-1"
            className="rounded-md"
          />

          <Image
            width={70}
            height={70}
            src={Foto2}
            alt="foto-2"
            className="rounded-md"
          />

          <Image
            width={70}
            height={70}
            src={Foto3}
            alt="foto-3"
            className="rounded-md"
          />

          <Image
            width={70}
            height={70}
            src={Foto4}
            alt="foto-4"
            className="rounded-md"
          />
        </div>

        <DialogFooter className="flex items-center justify-between">
          <PhotoUpload onPhotosSelected={setFotos} />
          <Button variant={"primary"} onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
