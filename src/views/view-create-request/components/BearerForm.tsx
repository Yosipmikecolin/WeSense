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

import { Loader2 } from "lucide-react";
import { getCarrier } from "@/db/carrier";
import { FormDataCarrier } from "@/views/view-create-carrier/interfaces";
import { initialFormData } from "@/views/view-create-carrier/data/initialFormData";

interface Props {
  formData: FormDataCarrier;
  setFormData: (data: FormDataCarrier) => void;
  setCompleteForm: (complete: boolean) => void;
}

const BearerForm = ({ formData, setFormData, setCompleteForm }: Props) => {
  const [requesterType, setRequesterType] = useState<string>("");
  const [selectedCarrier, setSelectedCarrier] = useState<string>("");
  const [carriers, setCarriers] = useState<FormDataCarrier[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, setCompleteForm]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCarrier();
      setCarriers(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (requesterType) {
      setLoading(true);
      setSelectedCarrier("");
      setFormData(initialFormData);

      setTimeout(async () => {
        setLoading(false);
      }, 600);
    }
  }, [requesterType]);

  const selectCarrier = (value: string) => {
    setSelectedCarrier(value);
    const selectRequirent = carriers.find(
      (i) => i.step1.fullName === value && i.step2.crime === requesterType
    );
    if (selectRequirent) {
      setFormData(selectRequirent);
    }
  };

  const uniqueArray = (carriers: FormDataCarrier[]) => {
    const seen = new Set();
    return carriers.filter((item) => {
      if (seen.has(item.step2.crime)) return false;
      seen.add(item.step2.crime);
      return true;
    });
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
              {uniqueArray(carriers).map((type) => (
                <SelectItem key={type.id} value={type.step2.crime}>
                  {type.step2.crime}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requester">Portador</Label>
        <Select
          value={selectedCarrier}
          onValueChange={selectCarrier}
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
            {carriers
              .filter((i) => i.step2.crime === requesterType)
              .map((carrier, index) => (
                <SelectItem key={index} value={carrier.step1.fullName}>
                  {carrier.step1.fullName}
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
            value={formData.step1.fullName}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tribunal">Nacionalidad</Label>
          <Input
            id="tribunal"
            value={formData.step1.nationality}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ruc">Estado Civil</Label>
          <Input
            id="ruc"
            value={formData.step1.maritalStatus}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rit">Género</Label>
          <Input
            id="rit"
            value={formData.step1.gender}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="rol">Tipo de pena</Label>
          <Input
            id="rol"
            value={formData.step1.type_current}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default BearerForm;
