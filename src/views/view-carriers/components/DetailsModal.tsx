import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Flag from "react-world-flags";
import { Download } from "lucide-react";
import { generatePDF, generateWord } from "../functions";
import { Carrier } from "@/interfaces";

interface Props {
  carrier?: Carrier;
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ carrier, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="modal sm:max-w-[600px] h-[800px] overflow-auto">
        <DialogClose />
        <DialogHeader className="border-[1.5px] rounded-sm pl-2 pt-2">
          <DialogTitle className="mb-2 text-2xl">
            Detalles del portador
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mt-3">
          <table className="w-full text-left border-collapse border border-gray-200">
            <tbody>
              {carrier &&
                Object.entries(carrier).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="font-semibold p-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </td>
                    <td className="p-2">
                      {key === "countryCode" ? (
                        <Flag code={value as string} width={20} />
                      ) : (
                        (value as string)
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => carrier && generatePDF(carrier)}
              className="bg-red-500 text-white hover:bg-red-600 hover:text-white w-full flex justify-between"
            >
              Descargar PDF
              <Download />
            </Button>
            <Button
              variant="outline"
              onClick={() => carrier && generateWord(carrier)}
              className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white w-full flex justify-between"
            >
              Descargar Word
              <Download />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
