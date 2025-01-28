import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Step3Data, StepProps } from "../../interfaces";

const MonitoringForm = ({ data, updateData, setCompleteForm }: StepProps) => {
  const [formData, setFormData] = useState<Step3Data>(data as Step3Data);

  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, setFormData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="crs">CRS donde se controla</Label>
        <Input
          id="crs"
          name="crs"
          value={formData.crs || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="areas">Área o áreas de inclusión y exclusión</Label>
        <Textarea
          id="areas"
          name="areas"
          value={formData.areas || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="duracionMedida">
          Duración de la medida o pena, abonos y periodo de control
        </Label>
        <Input
          id="duracionMedida"
          name="duracionMedida"
          value={formData.duracionMedida || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="horarioControl">Horario de control</Label>
        <Input
          id="horarioControl"
          name="horarioControl"
          value={formData.horarioControl || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="periodoEfectivo">Periodo efectivo de control</Label>
        <Input
          id="periodoEfectivo"
          name="periodoEfectivo"
          value={formData.periodoEfectivo || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="solicitudesFactibilidad">
          Solicitudes de Factibilidad Técnica
        </Label>
        <Textarea
          id="solicitudesFactibilidad"
          name="solicitudesFactibilidad"
          value={formData.solicitudesFactibilidad || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="sentencia">
          Sentencia ingresada o resolución judicial
        </Label>
        <Textarea
          id="sentencia"
          name="sentencia"
          value={formData.sentencia || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="programacionesInstalacion">
          Programaciones de Instalación
        </Label>
        <Input
          id="programacionesInstalacion"
          name="programacionesInstalacion"
          value={formData.programacionesInstalacion || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="instalacionesRealizadas">
          Instalaciones realizadas
        </Label>
        <Input
          id="instalacionesRealizadas"
          name="instalacionesRealizadas"
          value={formData.instalacionesRealizadas || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="resolucionesModificacion">
          Resoluciones judiciales que modifican medida de control
        </Label>
        <Textarea
          id="resolucionesModificacion"
          name="resolucionesModificacion"
          value={formData.resolucionesModificacion || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="soportesTecnicos">Soportes Técnicos Realizados</Label>
        <Input
          id="soportesTecnicos"
          name="soportesTecnicos"
          value={formData.soportesTecnicos || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="informesIncumplimiento">
          Informes de incumplimiento
        </Label>
        <Textarea
          id="informesIncumplimiento"
          name="informesIncumplimiento"
          value={formData.informesIncumplimiento || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="diasControl">
          Días efectivos de control y los días que se Incumplió el control
        </Label>
        <Input
          id="diasControl"
          name="diasControl"
          value={formData.diasControl || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="desinstalaciones">
          Desinstalaciones realizadas - indicando motivo de la desinstalación
        </Label>
        <Textarea
          id="desinstalaciones"
          name="desinstalaciones"
          value={formData.desinstalaciones || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default MonitoringForm;
