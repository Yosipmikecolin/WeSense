"use client";

import { useEffect, useState } from "react";
import { Ellipsis, Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table as TableUI,
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
import { data3 } from "../data";
import DetailsModal from "./DetailsModal";
import { ResolutionType } from "./ProcessManagementResolutions";
import axios from "axios";
import DeleteModalResolution from "./DeleteModalResolution";

interface Props {
  onUpdate: (type: string, instalation: ResolutionType) => void;
}

const TableManagementResolutions = ({ onUpdate }: Props) => {
  const [data, setData] = useState<ResolutionType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState("");

  const getAll = async () => {
    const response = await axios.get(`/api/awardee/resolution`);
    setData(response.data);
  };

  const onDelete = async (item: ResolutionType) => {
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
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold text-gray-600">
                  NÚMERO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  FECHA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  CONTENIDO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  ESTADO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 text-right">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.resolutionNumber}</TableCell>
                  <TableCell>{item.issuanceDate}</TableCell>
                  <TableCell>{item.resolutionType}</TableCell>
                  <TableCell>{item.resolutionContent}</TableCell>
                  <TableCell>{item.implementationStatus}</TableCell>
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
                          onClick={() => onUpdate("resolution", item)}
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableUI>
        </CardContent>
      </Card>
      <Pagination />
      <DetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalles de la resolución"
        data={selectedDocument}
        fields={[
          { key: "resolutionNumber", label: "Número" },
          { key: "issuanceDate", label: "Fecha" },
          { key: "resolutionType", label: "Tipo" },
          { key: "implementationStatus", label: "Estado" },
          { key: "resolutionContent", label: "Contenido" },
        ]}
      />
      <DeleteModalResolution
        id={selectedToDelete}
        open={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        // refetch={refetch}
      />
    </div>
  );
};

export default TableManagementResolutions;
