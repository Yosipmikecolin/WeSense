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
import { data4 } from "../data";
import DetailsModal from "./DetailsModal";
import { AlertType } from "./ProcessManagementAlarms";
import axios from "axios";
import DeleteModalAlert from "./DeleteModalAlert";

interface Props {
  onUpdate: (type: string, instalation: AlertType) => void;
}

const AlarmManagementTable = ({ onUpdate }: Props) => {
  const [data, setData] = useState<AlertType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState("");

  const getAll = async () => {
    const response = await axios.get(`/api/awardee/alert`);
    setData(response.data);
  };

  const onDelete = async (item: AlertType) => {
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
                  ID
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  FECHA Y HORA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO DE ALARMA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  DESCRIPCION
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  ACCIÓN TOMADA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  ESTADO DE RESOLUCIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 text-right">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.alarmId}</TableCell>
                  <TableCell>{item.alarmDateTime}</TableCell>
                  <TableCell>{item.alarmType}</TableCell>
                  <TableCell>{item.alarmDescription}</TableCell>
                  <TableCell>{item.actionTaken}</TableCell>
                  <TableCell>{item.resolutionStatus}</TableCell>
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
                          onClick={() => onUpdate("alert", item)}
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
        title="Detalles de la alarma"
        data={selectedDocument}
        fields={[
          { key: "alarmId", label: "ID de Alarma" },
          { key: "alarmDateTime", label: "Fecha y Hora" },
          { key: "alarmType", label: "Tipo de Alarma" },
          { key: "alarmDescription", label: "Descripción" },
          { key: "actionTaken", label: "Acción Tomada" },
          { key: "resolutionStatus", label: "Estado de Resolución" },
        ]}
      />
      <DeleteModalAlert
        id={selectedToDelete}
        open={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        // refetch={refetch}
      />
    </div>
  );
};

export default AlarmManagementTable;
