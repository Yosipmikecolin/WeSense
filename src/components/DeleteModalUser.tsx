import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteUser, getUsers, User } from "@/db/user";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id?: string;
  open: boolean;
  setUsersDB: Dispatch<SetStateAction<User[]>>;
  onClose: VoidFunction;
}

const DeleteModalUser = ({ id, open, onClose, setUsersDB }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await deleteUser(id || "");
    const result = await getUsers();
    setTimeout(() => {
      toast.success("Eliminado exitosamente");
      setUsersDB(result);
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
            Eliminar usuario
          </DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-sm text-center">
            Estas seguro que deseas eliminar el usuario
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

export default DeleteModalUser;
