"use client";

import { useState } from "react";
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
import { data1 } from "../data";
import DetailsModal from "./DetailsModal";

const ReceptionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});

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
                <TableHead className="text-xs font-bold text-gray-600"></TableHead>
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
              {data1.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.numeroExpediente}</TableCell>
                  <TableCell>{item.fechaRecepcion}</TableCell>
                  <TableCell>{item.tipoDocumento}</TableCell>
                  <TableCell>{item.contenidoDocumento}</TableCell>
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
                              <SendHorizontal  />
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
          { key: "numeroExpediente", label: "Número de Expediente" },
          { key: "fechaRecepcion", label: "Fecha de Recepción" },
          { key: "tipoDocumento", label: "Tipo de Documento" },
          { key: "contenidoDocumento", label: "Contenido del Documento" },
        ]}
      />
    </div>
  );
};

export default ReceptionTable;
