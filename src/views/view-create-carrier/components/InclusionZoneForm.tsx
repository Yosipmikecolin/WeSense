import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepProps4 } from "../interfaces";

const InclusionZoneForm = ({
  formData,
  setFormData,
  setCompleteForm,
}: StepProps4) => {
  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, setCompleteForm]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="street">Calle</Label>
        <Input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="number">Número</Label>
        <Input
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="additionalInformation">Block/Dpto/Casa</Label>
        <Input
          id="additionalInformation"
          name="additionalInformation"
          value={formData.additionalInformation}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="commune">Comuna</Label>
        <Input
          id="commune"
          name="commune"
          value={formData.commune}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="region">Región</Label>
        <Input
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="road">Carretera/Ruta/Kilómetro</Label>
        <Input
          id="road"
          name="road"
          value={formData.road}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="population">Población/Condominio/Villa</Label>
        <Input
          id="population"
          name="population"
          value={formData.population}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="zipCode">Código Postal</Label>
        <Input
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="geographicCoordinates">Coordenadas Geográficas</Label>
        <Input
          id="geographicCoordinates"
          name="geographicCoordinates"
          value={formData.geographicCoordinates}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="radio">Radio</Label>
        <Input
          id="radio"
          name="radio"
          value={formData.radio}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="complianceSchedule">Horario de Cumplimiento</Label>
        <Input
          id="complianceSchedule"
          name="complianceSchedule"
          value={formData.complianceSchedule}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="characteristics">Características del sector</Label>
        <Textarea
          id="characteristics"
          name="characteristics"
          value={formData.characteristics}
          placeholder="Describa las características del sector"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InclusionZoneForm;
