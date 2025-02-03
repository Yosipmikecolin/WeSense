import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { StepProps } from "../interfaces";

const CaseForm = ({ data, updateData, setCompleteForm }: StepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="numeroExpediente">Número de expediente o proceso</Label>
        <Input id="numeroExpediente" name="numeroExpediente" />
      </div>
      <div>
        <Label htmlFor="tribunalJuez">Tribunal/Juez asignado al caso</Label>
        <Input id="tribunalJuez" name="tribunalJuez" />
      </div>
      <div>
        <Label htmlFor="fechaAudiencia">Fecha de audiencia o resolución</Label>
        <Input id="fechaAudiencia" name="fechaAudiencia" type="date" />
      </div>
      <div>
        <Label htmlFor="motivoSolicitud">Motivo de la solicitud</Label>
        <Textarea
          id="motivoSolicitud"
          name="motivoSolicitud"
          placeholder="Explique las razones para solicitar la tobillera"
        />
      </div>
    </div>
  );
};

export default CaseForm;
