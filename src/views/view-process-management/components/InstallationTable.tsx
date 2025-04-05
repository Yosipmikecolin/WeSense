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
import { data2 } from "../data";
import DetailsModal from "./DetailsModal";

const InstallationTable = () => {
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
                  ESTADO DEL DISPOSITIVO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  LUGAR DE INSTALACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO DE DISPOSITIVO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  NÚMERO DE SERIE
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  FECHA DE INSTALACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 text-right">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data2.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.estadoDispositivo}</TableCell>
                  <TableCell>{item.lugarInstalacion}</TableCell>
                  <TableCell>{item.tipoDispositivo}</TableCell>
                  <TableCell>{item.numeroSerie}</TableCell>
                  <TableCell>{item.fechaInstalacion}</TableCell>
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
        title="Detalles del instalación"
        data={selected}
        fields={[
          { key: "estadoDispositivo", label: "Estado del Dispositivo" },
          { key: "lugarInstalacion", label: "Lugar de Instalación" },
          { key: "tipoDispositivo", label: "Tipo de Dispositivo" },
          { key: "numeroSerie", label: "Número de Serie" },
          { key: "fechaInstalacion", label: "Fecha de Instalación" },
        ]}
      />
    </div>
  );
};

export default InstallationTable;
