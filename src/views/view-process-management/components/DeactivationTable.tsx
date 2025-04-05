"use client";

import { useState } from "react";
import { Ellipsis, Eye, Pencil, SendHorizontal, Trash } from "lucide-react";
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
import { data6 } from "../data";
import DetailsModal from "./DetailsModal";

const DeactivationTable = () => {
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
                  ID DEL DISPOSITIVO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  FECHA DE DESACTIVACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  MOTIVO DE DESACTIVACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  ESTADO DEL DISPOSITIVO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  OBSERVACIONES
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 text-right">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data6.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.idDispositivo}</TableCell>
                  <TableCell>{item.fechaDesactivacion}</TableCell>
                  <TableCell>{item.motivoDesactivacion}</TableCell>
                  <TableCell>{item.estadoDispositivo}</TableCell>
                  <TableCell>{item.observaciones}</TableCell>
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
          </TableUI>
        </CardContent>
      </Card>
      <Pagination />
      <DetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalles de la desactivación"
        data={selected}
        fields={[
          { key: "idDispositivo", label: "ID del Dispositivo" },
          { key: "fechaDesactivacion", label: "Fecha de Desactivación" },
          { key: "motivoDesactivacion", label: "Motivo de Desactivación" },
          { key: "estadoDispositivo", label: "Estado del Dispositivo" },
          { key: "observaciones", label: "Observaciones" },
        ]}
      />
    </div>
  );
};

export default DeactivationTable;
