import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { StepProps } from "../interfaces";

const InclusionZoneForm = ({}: StepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="calle">Calle</Label>
        <Input id="calle" name="calle" />
      </div>
      <div>
        <Label htmlFor="numero">Número</Label>
        <Input id="numero" name="numero" />
      </div>
      <div>
        <Label htmlFor="blockDptoCasa">Block/Dpto./Casa</Label>
        <Input id="blockDptoCasa" name="blockDptoCasa" />
      </div>
      <div>
        <Label htmlFor="comuna">Comuna</Label>
        <Input id="comuna" name="comuna" />
      </div>
      <div>
        <Label htmlFor="region">Región</Label>
        <Input id="region" name="region" />
      </div>
      <div>
        <Label htmlFor="carreteraRutaKilometro">Carretera/Ruta/Kilómetro</Label>
        <Input id="carreteraRutaKilometro" name="carreteraRutaKilometro" />
      </div>
      <div>
        <Label htmlFor="poblacionCondominioVilla">
          Población/Condominio/Villa
        </Label>
        <Input id="poblacionCondominioVilla" name="poblacionCondominioVilla" />
      </div>
      <div>
        <Label htmlFor="codigoPostal">Código Postal</Label>
        <Input id="codigoPostal" name="codigoPostal" />
      </div>
      <div>
        <Label htmlFor="coordenadasGeograficas">Coordenadas Geográficas</Label>
        <Input id="coordenadasGeograficas" name="coordenadasGeograficas" />
      </div>
      <div>
        <Label htmlFor="radio">Radio</Label>
        <Input id="radio" name="radio" />
      </div>
      <div>
        <Label htmlFor="horarioCumplimiento">Horario de Cumplimiento</Label>
        <Input id="horarioCumplimiento" name="horarioCumplimiento" />
      </div>
      <div>
        <Label htmlFor="caracteristicasSector">
          Características del sector
        </Label>
        <Textarea
          id="caracteristicasSector"
          name="caracteristicasSector"
          placeholder="Describa las características del sector"
        />
      </div>
    </div>
  );
};

export default InclusionZoneForm;
