import { useEffect, useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Requester, RequesterPost } from "@/db/requester";
import { getRequesters } from "@/api/request";

interface Props {
  setCompleteForm: (complete: boolean) => void;
}

const ApplicantForm = ({  setCompleteForm }: Props) => {
  useEffect(() => {
    setCompleteForm(true);
  }, []);

  return (
    <div className="space-y-1">
      <div className="bg-gray-100 rounded-sm font-bold p-3 text-lg border-gray-300">
        Información del solicitante
      </div>
      <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
        <div className="font-semibold flex">Tipo de requirente:</div>
        <div className="text-end">
          <div className="flex items-center gap-2">
            <span className="bg-green-400 text-white py-1 px-2 rounded-md">
              Abogado
            </span>
          </div>
        </div>
      </div>
      <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
        <div className="font-semibold flex">Nombre del requirente:</div>
        <div className="text-end">
          <div className="flex items-center gap-2">
            <span>Jose Alfredo Mendoza</span>
          </div>
        </div>
      </div>
      <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
        <div className="font-semibold flex">Ciudad:</div>
        <div className="text-end">
          <div className="flex items-center gap-2">
            <span>Santiago de Chile</span>
          </div>
        </div>
      </div>
      <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
        <div className="font-semibold flex">Dirección:</div>
        <div className="text-end">
          <div className="flex items-center gap-2">
            <span>Calle 32 # 53-43</span>
          </div>
        </div>
      </div>
      <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
        <div className="font-semibold flex">Télefono:</div>
        <div className="text-end">
          <div className="flex items-center gap-2">
            <span>94635727</span>
          </div>
        </div>
      </div>
      <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
        <div className="font-semibold flex">Institución:</div>
        <div className="text-end">
          <div className="flex items-center gap-2">
            <span>
            Tribunal Pereira</span>
          </div>
        </div>
      </div>
      <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
        <div className="font-semibold flex">Número de identificación:</div>
        <div className="text-end">
          <div className="flex items-center gap-2">
            <span>34276323</span>
          </div>
        </div>
      </div>
      <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
        <div className="font-semibold flex">Email:</div>
        <div className="text-end">
          <div className="flex items-center gap-2">
            <span>jose.alfredo@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantForm;
