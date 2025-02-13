import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  requester?: {
    fullName: string;
    email: string;
    phone: string;
    userType: string;
    institution: string;
    identificationNumber: string;
    region: string;
    address: string;
    accessAreas: string;
    registrationDate: string;
    identityVerification: string;
    securityQuestion: string;
    observations: string;
  };
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ requester, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="mb-2">Detalles del requirente</DialogTitle>
          <hr />
        </DialogHeader>
        <div className="grid gap-4 mt-3">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Nombre completo:</span>
            <span>{requester?.fullName}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Tipo:</span>
            <span>{requester?.userType}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Telefono:</span>
            <span className="flex gap-2">{requester?.phone}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Fecha de registro:</span>
            <span>{requester?.registrationDate}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Institucion:</span>
            <span>{requester?.institution}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Télefono:</span>
            <span>{requester?.phone}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Número de identificación:</span>
            <span>{requester?.identificationNumber}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Ciudad:</span>
            <span>{requester?.region}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Dirección:</span>
            <span>{requester?.address}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Áreas de acceso:</span>
            <span>{requester?.accessAreas}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Verificación de identidad:</span>
            <span>{requester?.identityVerification}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Pregunta de seguridad:</span>
            <span>{requester?.securityQuestion}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Observaciones:</span>
            <span>{requester?.observations}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
