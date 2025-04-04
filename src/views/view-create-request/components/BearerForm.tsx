import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepProps } from "../interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";
import { carriers, requesters } from "@/utils";

const REQUESTER_TYPES = [
  { id: "Homicidio", name: "Homicidio" },
  { id: "Femicidio", name: "Femicidio" },
  { id: "Parricidio", name: "Parricidio" },
  {
    id: "Robo con violencia o intimidación",
    name: "Robo con violencia o intimidación",
  },
  { id: "Hurto", name: "Hurto" },
  { id: "Tráfico de drogas", name: "Tráfico de drogas" },
  { id: "Estafa", name: "Estafa" },
];

const BearerForm = ({}: StepProps) => {
  const [requesterType, setRequesterType] = useState<string>("");
  const [selectedRequester, setSelectedRequester] = useState<string>("");
  const [availableRequesters, setAvailableRequesters] = useState<
    {
      fullName: string;
      nationality: string;
      maritalStatus: string;
      gender: string;
      penaltyType: string;
      court: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    nationality: "",
    maritalStatus: "",
    gender: "",
    penaltyType: "",
    court: "",
  });

  useEffect(() => {
    if (requesterType) {
      setLoading(true);
      setSelectedRequester("");
      setFormData({
        fullName: "",
        nationality: "",
        maritalStatus: "",
        gender: "",
        penaltyType: "",
        court: "",
      });

      // Simulate API call delay
      setTimeout(() => {
        const data = carriers.filter((i) => i.crime === requesterType);
        setAvailableRequesters(data);
        setLoading(false);
      }, 600);
    } else {
      setAvailableRequesters([]);
    }
  }, [requesterType]);

  const selectReqii = (value: string) => {
    setSelectedRequester(value);
    const selectRequirent = carriers.find((i) => i.fullName === value);
    if (selectRequirent) {
      setFormData({
        fullName: selectRequirent.fullName,
        nationality: selectRequirent.nationality,
        maritalStatus: selectRequirent.maritalStatus,
        gender: selectRequirent.gender,
        penaltyType: selectRequirent.penaltyType,
        court: selectRequirent.court,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-5">
        <div className="space-y-2 w-full">
          <Label htmlFor="requesterType">Tipo de Delito</Label>
          <Select value={requesterType} onValueChange={setRequesterType}>
            <SelectTrigger id="requesterType" className="w-full">
              <SelectValue placeholder="Seleccione un tipo de delito" />
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="requester">Portador</Label>
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
              <SelectValue placeholder="Seleccione un portador" />
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
          <Label htmlFor="region">Nombre completo</Label>
          <Input
            id="region"
            value={formData.fullName}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tribunal">Nacionalidad</Label>
          <Input
            id="tribunal"
            value={formData.nationality}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ruc">Estado Civil</Label>
          <Input
            id="ruc"
            value={formData.maritalStatus}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rit">Género</Label>
          <Input
            id="rit"
            value={formData.gender}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="rol">Tipo de pena</Label>
          <Input
            id="rol"
            value={formData.penaltyType}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default BearerForm;
