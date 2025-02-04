import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <DialogClose />
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger value="account">Detalles de la solicitud</TabsTrigger>
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
            AQUI VA LOS DATOS QUE ADJUNTA EL ADJUDICATARIO
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
