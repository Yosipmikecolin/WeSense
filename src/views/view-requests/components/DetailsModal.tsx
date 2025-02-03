import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detalles de solicitud
          </DialogTitle>
        </DialogHeader>
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
              <span className="text-sm text-gray-500">Tipo de solicitante</span>
              <span className="font-medium">{request?.requester_type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Fecha de solicitud</span>
              <span className="font-medium">{request?.request_date}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
