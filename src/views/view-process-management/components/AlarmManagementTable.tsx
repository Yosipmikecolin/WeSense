"use client";

import { useState } from "react";
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

const AlarmManagementTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});

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
              {data4.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.idAlarma}</TableCell>
                  <TableCell>{item.fechaHoraAlarma}</TableCell>
                  <TableCell>{item.tipoAlarma}</TableCell>
                  <TableCell>{item.descripcionAlarma}</TableCell>
                  <TableCell>{item.accionTomada}</TableCell>
                  <TableCell>{item.estadoResolucion}</TableCell>
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
                            setSelected(item);
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
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Pencil />
                            </Button>
                            <span>Editar</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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
        data={selected}
        fields={[
          { key: "idAlarma", label: "ID de Alarma" },
          { key: "fechaHoraAlarma", label: "Fecha y Hora" },
          { key: "tipoAlarma", label: "Tipo de Alarma" },
          { key: "descripcionAlarma", label: "Descripción" },
          { key: "accionTomada", label: "Acción Tomada" },
          { key: "estadoResolucion", label: "Estado de Resolución" },
        ]}
      />
    </div>
  );
};

export default AlarmManagementTable;
