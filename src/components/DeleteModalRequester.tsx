import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteRequest, getRequest, Request } from "@/db/request";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id?: string;
  open: boolean;
  setRequestDB: Dispatch<SetStateAction<Request[]>>;
  onClose: VoidFunction;
}

const DeleteModalRequester = ({ id, open, onClose, setRequestDB }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await deleteRequest(id || "");
    const result = await getRequest();
    setTimeout(() => {
      toast.success("Eliminado exitosamente");
      setRequestDB(result.sort((a, b) => {
        return (
          new Date(a.registrationDate).getTime() -
          new Date(b.registrationDate).getTime()
        );
      }));
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
            Eliminar requirente
          </DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-sm text-center">
            Estas seguro que deseas eliminar el requirente
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
            {loading ? (
              <div className="loader-button-2" />
            ) : (
              "Eliminar requirente"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModalRequester;
