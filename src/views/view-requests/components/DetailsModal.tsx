import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from "@/components/map/Map";
import Image from "next/image";
import Foto1 from "/public/foto-1.jpg";
import Foto2 from "/public/foto-2.jpg";

interface Props {
  request?: {
    requester_type: string;
    requester_name: string;
    identification_number: string;
    situation_type: string;
    request_date: string;
    status: string;
  };
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ request, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Detalles de la factibilidad técnica
          </DialogTitle>
        </DialogHeader>
        <DialogClose />
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger value="account">
              Información de la solicitud
            </TabsTrigger>
            <TabsTrigger value="password">
              Respuesta del adjudicatario
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-sm text-gray-500">
                    Nombre del solicitante
                  </span>
                  <span className="font-medium">{request?.requester_name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-sm text-gray-500">
                    Numero de identifiación del solicitante
                  </span>
                  <span className="font-mono">
                    {request?.identification_number}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-sm text-gray-500">
                    Tipo de solicitante
                  </span>
                  <span className="font-medium">{request?.requester_type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Fecha de solicitud
                  </span>
                  <span className="font-medium">{request?.request_date}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
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
                <Map
                  latitude={-33.46651382914682}
                  longitude={-70.66412385948745}
                />
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
