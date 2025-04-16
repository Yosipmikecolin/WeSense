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
import { data5 } from "../data";
import DetailsModal from "./DetailsModal";
import { SuportType } from "./ProcessTechnicalSupport";
import axios from "axios";
import DeleteModalSuport from "./DeleteModalSuport";

interface Props {
  onUpdate: (type: string, suport: SuportType) => void;
}

const TechnicalSupportTable = ({ onUpdate }: Props) => {
  const [data, setData] = useState<SuportType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState("");

  const getAll = async () => {
    const response = await axios.get(`/api/awardee/suport`);
    setData(response.data);
  };

  const onDelete = async (item: SuportType) => {
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
              {data.map((ticket, index) => (
                <TableRow key={index}>
                  <TableCell>{ticket.ticketId}</TableCell>
                  <TableCell>{ticket.openingDate}</TableCell>
                  <TableCell>{ticket.issueType}</TableCell>
                  <TableCell>{ticket.ticketStatus}</TableCell>
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
                            setSelectedDocument(ticket);
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
                          onClick={() => onUpdate("suport", ticket)}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Pencil />
                            </Button>
                            <span>Editar</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(ticket)}>
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
        title="Detalles del ticket"
        data={selectedDocument}
        fields={[
          { key: "ticketId", label: "ID de Ticket" },
          { key: "openingDate", label: "Fecha de Apertura" },
          { key: "issueType", label: "Tipo de Problema" },
          { key: "issueDescription", label: "Descripción del Problema" },
          { key: "actionsTaken", label: "Acciones Tomadas" },
          { key: "ticketStatus", label: "Estado del Ticket" },
        ]}
      />
      <DeleteModalSuport
        id={selectedToDelete}
        open={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        // refetch={refetch}
      />
    </div>
  );
};

export default TechnicalSupportTable;
