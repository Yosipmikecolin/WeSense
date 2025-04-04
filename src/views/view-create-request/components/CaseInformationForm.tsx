import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepProps } from "../interfaces";
import { useEffect, useState } from "react";

import { CalendarIcon, Loader2 } from "lucide-react";
import { requesters } from "@/utils";
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

// Mock data for demonstration
const REQUESTER_TYPES = [
  { id: "Juez", name: "Juez" },
  { id: "Abogado", name: "Abogado" },
  { id: "Tribunal", name: "Tribunal" },
];

const CaseInformationForm = ({}: StepProps) => {
  const [requesterType, setRequesterType] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [selectedRequester, setSelectedRequester] = useState<string>("");
  const [formData, setFormData] = useState({
    region: "",
    tribunal: "",
    ruc: "",
    rit: "",
    rol: "",
  });
  const [loading, setLoading] = useState(false);
  const [availableRequesters, setAvailableRequesters] = useState<
    {
      fullName: string;
      email: string;
      phone: string;
      userType: string;
      institution: string;
      identificationNumber: string;
      region: string;
      address: string;
      accessAreas: string;
      registrationDate: string;
      identityVerification: string;
      securityQuestion: string;
      observations: string;
    }[]
  >([]);

  useEffect(() => {
    if (requesterType) {
      setLoading(true);
      setSelectedRequester("");
      setFormData({
        region: "",
        tribunal: "",
        ruc: "",
        rit: "",
        rol: "",
      });

      // Simulate API call delay
      setTimeout(() => {
        const data = requesters.filter((i) => i.userType === requesterType);
        setAvailableRequesters(data);
        setLoading(false);
      }, 600);
    } else {
      setAvailableRequesters([]);
    }
  }, [requesterType]);

  const selectReqii = (value: string) => {
    setSelectedRequester(value);
    const selectRequirent = requesters.find((i) => i.fullName === value);
    if (selectRequirent) {
      setFormData({
        region: selectRequirent.region,
        tribunal: selectRequirent.institution,
        ruc: selectRequirent.ruc,
        rit: selectRequirent.identificationNumber,
        rol: selectRequirent.userType,
      });
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-5">
        <div className="space-y-2 w-full">
          <Label htmlFor="requesterType">Tipo de Requiriente</Label>
          <Select value={requesterType} onValueChange={setRequesterType}>
            <SelectTrigger id="requesterType" className="w-full">
              <SelectValue placeholder="Seleccione un tipo de requiriente" />
            </SelectTrigger>
            <SelectContent>
              {REQUESTER_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="requesterType">Fecha de la solicitud</Label>
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
                    "bg-green-500 text-white hover:bg-green-500 hover:text-white",
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requester">Requiriente</Label>
        <Select
          value={selectedRequester}
          onValueChange={selectReqii}
          disabled={!requesterType || loading}
        >
          <SelectTrigger id="requester" className="w-full">
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Cargando requirientes...</span>
              </div>
            ) : (
              <SelectValue placeholder="Seleccione un requiriente" />
            )}
          </SelectTrigger>
          <SelectContent>
            {availableRequesters.map((requester, index) => (
              <SelectItem key={index} value={requester.fullName}>
                {requester.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="region">Región</Label>
          <Input
            id="region"
            value={formData.region}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tribunal">Tribunal/Juzgado</Label>
          <Input
            id="tribunal"
            value={formData.tribunal}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ruc">RUC</Label>
          <Input
            id="ruc"
            value={formData.ruc}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rit">RIT</Label>
          <Input
            id="rit"
            value={formData.rit}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="rol">Rol</Label>
          <Input
            id="rol"
            value={formData.rol}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default CaseInformationForm;
