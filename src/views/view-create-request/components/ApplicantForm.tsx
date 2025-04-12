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
import { getRequester, Requester } from "@/db/requester";

interface Props {
  setDate: (date?: Date) => void;
  formData: Requester;
  setFormData: (data: Requester) => void;
  setCompleteForm: (complete: boolean) => void;
}

const ApplicantForm = ({
  formData,
  setFormData,
  setDate: setDateForm,
  setCompleteForm,
}: Props) => {
  const [requesterType, setRequesterType] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [selectedRequester, setSelectedRequester] = useState<string>("");
  const [requesters, setRequesters] = useState<Requester[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isComplete = Object.values(formData).every(
      (value) => value !== "" && date
    );
    setCompleteForm(isComplete);
  }, [formData, setCompleteForm, date]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRequester();
      setRequesters(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (requesterType) {
      setLoading(true);
      setSelectedRequester("");
      setFormData({
        id: "",
        fullName: "",
        lastName: "",
        middleName: "",
        email: "",
        ruc: "",
        phone: "",
        userType: "",
        institution: "",
        identificationNumber: "",
        region: "",
        address: "",
        accessAreas: "",
        identityVerification: "",
        securityQuestion: "",
        registrationDate: "",
        observations: "",
      });

      setTimeout(async () => {
        setLoading(false);
      }, 600);
    }
  }, [requesterType]);

  const selectApplicant = (value: string) => {
    setSelectedRequester(value);
    const selectRequirent = requesters.find((i) => i.fullName === value);
    if (selectRequirent) {
      setFormData(selectRequirent);
    }
  };

  const uniqueByUserType = (requesters: Requester[]) => {
    const seen = new Set();
    return requesters.filter((item) => {
      if (seen.has(item.userType)) return false;
      seen.add(item.userType);
      return true;
    });
  };

  useEffect(() => {
    setDateForm(date);
  }, [date]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-5">
        <div className="space-y-2 w-full">
          <Label htmlFor="requesterType">Tipo de Solicitante</Label>
          <Select value={requesterType} onValueChange={setRequesterType}>
            <SelectTrigger id="requesterType" className="w-full">
              <SelectValue placeholder="Seleccione un tipo de requiriente" />
            </SelectTrigger>
            <SelectContent>
              {uniqueByUserType(requesters).map((type) => (
                <SelectItem key={type.id} value={type.userType}>
                  {type.userType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="requesterType">Fecha de la Solicitud</Label>
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
          onValueChange={selectApplicant}
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
            {requesters
              .filter((i) => i.userType === requesterType)
              .map((requester, index) => (
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
          <Label htmlFor="tribunal">Institución</Label>
          <Input
            id="tribunal"
            value={formData.institution}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ruc">Telefono movil</Label>
          <Input
            id="ruc"
            value={formData.phone}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rit">RUC</Label>
          <Input
            id="rit"
            value={formData.ruc}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="rol">Email</Label>
          <Input
            id="rol"
            value={formData.email}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantForm;
