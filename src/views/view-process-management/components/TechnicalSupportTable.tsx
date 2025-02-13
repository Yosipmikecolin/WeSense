"use client";

import { useState } from "react";
import { Ellipsis, Eye, Pencil, Trash } from "lucide-react";
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
import { data5 } from "../data";
import DetailsModal from "./DetailsModal";

const TechnicalSupportTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});

  return (
    <div>
      <Card className="w-full shadow-lg py-2 mt-7">
        <CardContent className="w-full px-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold text-gray-600">
                  ID DE TICKET
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  FECHA DE APERTURA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO DE PROBLEMA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  ESTADO DEL TICKET
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 text-right">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data5.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.idTicket}</TableCell>
                  <TableCell>{ticket.fechaApertura}</TableCell>
                  <TableCell>{ticket.tipoProblema}</TableCell>
                  <TableCell>{ticket.estadoTicket}</TableCell>
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
                            setSelectedTicket(ticket);
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
          </Table>
        </CardContent>
      </Card>
      <Pagination />
      <DetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalles del ticket"
        data={selectedTicket}
        fields={[
          { key: "idTicket", label: "ID de Ticket" },
          { key: "fechaApertura", label: "Fecha de Apertura" },
          { key: "tipoProblema", label: "Tipo de Problema" },
          { key: "descripcionProblema", label: "Descripción del Problema" },
          { key: "accionesTomadas", label: "Acciones Tomadas" },
          { key: "estadoTicket", label: "Estado del Ticket" },
        ]}
      />
    </div>
  );
};

export default TechnicalSupportTable;
