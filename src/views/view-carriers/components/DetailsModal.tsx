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
import { carrierFields } from "@/constants/carrierFields";
import React from "react";

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
          <table className="w-full text-left border-collapse">
            <tbody className="flex gap-5 flex-col">
              {carrier &&
                carrierFields.map(({ title, fields }) => (
                  <div key={title}>
                    <div className="border rounded-sm">
                      <div className="bg-gray-100 font-bold p-2 text-lg border-gray-300">
                        {title}
                      </div>

                      {fields.map(({ key, label }) =>
                        carrier[key as keyof Carrier] ? (
                          <tr key={key} className="rounded-sm border-gray-200">
                            <td className="font-semibold p-2">{label}:</td>
                            <td className="p-2">
                              {key === "nationality" ? (
                                <div className="flex items-center gap-3">
                                  {carrier[key]}
                                  <Flag code={carrier.countryCode} width={20} />
                                </div>
                              ) : (
                                (carrier[key as keyof Carrier] as string)
                              )}
                            </td>
                          </tr>
                        ) : null
                      )}
                    </div>
                  </div>
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
