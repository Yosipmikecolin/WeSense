"use client";

import { useEffect, useState } from "react";
import { Ellipsis, Eye, Pencil, SendHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DetailsModal from "./DetailsModal";
import axios from "axios";
import { ReceptionType } from "./ProcessReception";
import DeleteModal from "./ProcessModal";

interface Props {
  onUpdate: (type: string, reception: ReceptionType) => void;
}

const ReceptionTable = ({ onUpdate }: Props) => {
  const [data, setData] = useState<ReceptionType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState("");

  const getAll = async () => {
    const response = await axios.get(`/api/awardee/reception`);
    setData(response.data);
  };

  const onDelete = async (item: ReceptionType) => {
    setSelectedToDelete(item._id);
    setIsModalDeleteOpen(true);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <Card className="w-full shadow-lg py-2 mt-7">
        <CardContent className="w-full px-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold text-gray-600">
                  NÚMERO DE EXPEDIENTE
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  FECHA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO DE DOCUMENTO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  CONTENIDO DEL DOCUMENTO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 text-right">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.caseNumber}</TableCell>
                  <TableCell>{item.receptionDate}</TableCell>
                  <TableCell>{item.documentType}</TableCell>
                  <TableCell>{item.documentContent}</TableCell>
                  <TableCell className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedDocument(item);
                            setIsModalOpen(true);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Eye />
                            </Button>
                            <span>Detalles</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onUpdate("reception", item)}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Pencil />
                            </Button>
                            <span>Editar</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(item)}>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Trash />
                            </Button>
                            <span>Eliminar</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <SendHorizontal />
                            </Button>
                            <span>Informar y enviar al tribunal</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Pagination />
      <DetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalles del documento"
        data={selectedDocument}
        fields={[
          { key: "caseNumber", label: "Número de Expediente" },
          { key: "receptionDate", label: "Fecha de Recepción" },
          { key: "documentType", label: "Tipo de Documento" },
          { key: "documentContent", label: "Contenido del Documento" },
        ]}
      />
      <DeleteModal
        id={selectedToDelete}
        open={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        // refetch={refetch}
      />
    </div>
  );
};

export default ReceptionTable;
