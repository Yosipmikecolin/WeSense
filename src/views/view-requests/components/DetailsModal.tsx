import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Foto1 from "/public/foto-1.jpg";
import Foto2 from "/public/foto-2.jpg";
import dynamic from "next/dynamic";
import { Request } from "@/interfaces";
const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});

interface DetailsModalProps {
  request?: Request;
  open: boolean;
  onClose: VoidFunction;
}

const fieldLabels = {
  requester_type: "Tipo de solicitante",
  requester_name: "Nombre del solicitante",
  identification_number: "Número de identificación",
  situation_type: "Tipo de situación",
  request_date: "Fecha de solicitud",
  response_date: "Fecha de respuesta",
  status: "Estado",
  confirmation: "Confirmación",
  hour: "Hora",
  requesterType: "Tipo de solicitante",
  region: "Región",
  tribunalCourt: "Tribunal o corte",
  crime: "Delito",
  lastName: "Apellido",
  maternalLastName: "Apellido materno",
  firstName: "Primer nombre",
  isForeigner: "Es extranjero",
  street: "Calle",
  number: "Número",
  blockApartmentHouse: "Bloque/Departamento/Casa",
  commune: "Comuna",
  highwayRouteKilometer: "Autopista/Ruta/Kilómetro",
  populationCondominiumVilla: "Población/Condominio/Villa",
  postalCode: "Código postal",
  geographicCoordinates: "Coordenadas geográficas",
  radius: "Radio",
  complianceSchedule: "Horario de cumplimiento",
  sectorCharacteristics: "Características del sector",
  victimLastName: "Apellido de la víctima",
  victimMaternalLastName: "Apellido materno de la víctima",
  victimFirstName: "Primer nombre de la víctima",
  victimRut: "RUT de la víctima",
  victimEmail: "Correo de la víctima",
  victimPhone: "Teléfono de la víctima",
  victimWorkPhone: "Teléfono del trabajo de la víctima",
};

const DetailsModal = ({ request, open, onClose }: DetailsModalProps) => {
  const groupedFields: Record<string, (keyof Request)[]> = {
    "Información de la causa": [
      "requesterType",
      "region",
      "tribunalCourt",
      "identification_number",
      "situation_type",
      "request_date",
      "crime",
      "status",
    ],
    "Datos del solicitante": [
      "lastName",
      "maternalLastName",
      "firstName",
      "identification_number",
    ],
    "Datos de la persona": [
      "victimLastName",
      "victimMaternalLastName",
      "victimFirstName",
      "request_date",
      "isForeigner",
      "identification_number",
    ],
    "Zona de Inclusión": [
      "street",
      "number",
      "blockApartmentHouse",
      "commune",
      "region",
      "highwayRouteKilometer",
      "populationCondominiumVilla",
      "postalCode",
      "geographicCoordinates",
      "radius",
      "complianceSchedule",
      "sectorCharacteristics",
    ],
    "Zona de Exclusión": [
      "street",
      "number",
      "blockApartmentHouse",
      "commune",
      "region",
      "highwayRouteKilometer",
      "populationCondominiumVilla",
      "postalCode",
      "geographicCoordinates",
      "radius",
      "complianceSchedule",
      "sectorCharacteristics",
    ],
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="modal sm:max-w-[550px] max-h-[800px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Detalles de la factibilidad técnica
          </DialogTitle>
        </DialogHeader>
        <DialogClose />
        <Tabs defaultValue="application-information" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger value="application-information">
              Información de la solicitud
            </TabsTrigger>
            <TabsTrigger value="awardee-response">
              Respuesta del adjudicatario
            </TabsTrigger>
          </TabsList>
          <TabsContent value="application-information">
            <div className="grid gap-4 py-4">
              {request &&
                Object.entries(groupedFields).map(([sectionTitle, fields]) => (
                  <div key={sectionTitle} className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2">
                      {sectionTitle}
                    </h3>
                    {fields.map((key) =>
                      request[key] ? (
                        <div
                          key={key}
                          className="flex justify-between items-center pb-2 border-b"
                        >
                          <span className="text-sm text-gray-500">
                            {fieldLabels[key] || key.replace(/_/g, " ")}
                          </span>
                          <span className="font-medium">
                            {String(request[key])}
                          </span>
                        </div>
                      ) : null
                    )}
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="awardee-response">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-md">
              <div>
                <Label className="text-sm font-bold">Estado</Label>
                <span className="block text-gray-700">Positivo</span>
              </div>
              <div>
                <Label className="text-sm font-bold">Cobertura mínima</Label>
                <span className="block text-gray-700">100</span>
              </div>
              <div className="sm:col-span-3">
                <Label className="text-sm font-bold mb-2 block">
                  Ubicación
                </Label>
                <div className="animate-pulse bg-gray-200 rounded-md h-[200px] w-full">
                  <Map
                    latitude={-33.46651382914682}
                    longitude={-70.66412385948745}
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-bold">
                  Indicación de aspectos
                </Label>
                <span className="block text-gray-700">Geográficos</span>
              </div>
              <div className="sm:col-span-2">
                <Label className="text-sm font-bold">
                  Pruebas fotográficas
                </Label>
                <div className="flex gap-2 flex-wrap mt-2">
                  <Image
                    width={70}
                    height={70}
                    src={Foto1}
                    alt="foto-1"
                    className="rounded-md border"
                  />
                  <Image
                    width={70}
                    height={70}
                    src={Foto2}
                    alt="foto-2"
                    className="rounded-md border"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
