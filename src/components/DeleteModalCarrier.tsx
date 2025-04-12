import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteCarrier, getCarrier } from "@/db/carrier";
import { deleteUser, getUsers, User } from "@/db/user";
import { FormDataCarrier } from "@/views/view-create-carrier/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id?: string;
  open: boolean;
  setCarrierDB: Dispatch<SetStateAction<FormDataCarrier[]>>;
  onClose: VoidFunction;
}

const DeleteModalCarrier = ({ id, open, onClose, setCarrierDB }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await deleteCarrier(id || "");
    const result = await getCarrier();
    setTimeout(() => {
      toast.success("Eliminado exitosamente");
      setCarrierDB(result);
      setLoading(false);
      onClose();
    }, 500);
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Eliminar portador
          </DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-sm text-center">
            Estas seguro que deseas eliminar el portador
          </p>
          <br />
          <Button
            variant={"destructive"}
            size={"lg"}
            className="w-full mt-2 text-md"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <div className="loader-button-2" /> : "Eliminar usuario"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModalCarrier;
