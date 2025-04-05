import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { obligations } from "@/utils";
import {
  Circle,
  Ellipsis,
  Eye,
  FilePenLine,
  FileSymlink,
  FileUp,
  Pencil,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DetailsModal from "./DetailsModal";
import ObservationModal from "./ObservationModal";

const TableObligations = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [obligation, setObligation] = useState<{
    contractualObligation: string;
    fileName: string;
    status: string;
    observations: string;
  }>();
  const filters = [
    { id: 1, name: "Obligación" },
    { id: 2, name: "Nombre" },
    { id: 3, name: "Estado" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Registro de obligaciones
        </CardTitle>
        <div className="flex gap-2">
          <Input
            maxLength={30}
            placeholder={`Buscar por ${filters
              .find((i) => i.id === idFilter)
              ?.name.toLowerCase()}`}
          />
          <DropdownFilter
            filters={filters}
            idFilter={idFilter}
            setIdFilter={setIdFilter}
          />
        </div>
      </div>
      <Card className="w-full shadow-lg py-2">
        <CardContent className="w-full px-3">
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  OBLIGACIÓN CONTRACTUAL
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  NOMBRE DEL ARCHIVO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  ESTADO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  OBERVACIÓN
                </TableHead>

                <TableHead className="mr-10 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {obligations.map((obligation, index) => (
                <TableRow key={index}>
                  <TableCell>{obligation.contractualObligation}</TableCell>
                  <TableCell>{obligation.fileName}</TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                        obligation.status === "Activo"
                          ? "bg-green-400 text-white"
                          : obligation.status === "Pendiente"
                          ? "bg-yellow-400 text-black"
                          : obligation.status === "En progreso"
                          ? "bg-blue-400 text-white"
                          : obligation.status === "Completado"
                          ? "bg-purple-400 text-white"
                          : "bg-gray-100 text-gray-800" // Estado por defecto
                      }`}
                    >
                      {obligation.status === "Activo" ? (
                        "● Activo"
                      ) : obligation.status === "Pendiente" ? (
                        "● Pendiente"
                      ) : obligation.status === "En progreso" ? (
                        "● En progreso"
                      ) : obligation.status === "Completado" ? (
                        "● Completado"
                      ) : (
                        <div className="flex items-center gap-1">
                          <Circle size={7} /> Desconocido
                        </div>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>{obligation.observations}</TableCell>
                  <TableCell className="mr-10 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-10">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setIsModalOpen(true);
                            setObligation(obligation);
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
                        <DropdownMenuItem
                          onClick={() => {
                            setIsModalOpen2(true);
                            setObligation(obligation);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <FileUp />
                            </Button>
                            <span>Fiscalizar</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setIsModalOpen2(true);
                            setObligation(obligation);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <FileSymlink />
                            </Button>
                            <span>Auditar</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setIsModalOpen2(true);
                            setObligation(obligation);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <FilePenLine />
                            </Button>
                            <span>Registrar</span>
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
        obligation={obligation}
        onClose={() => setIsModalOpen(false)}
      />
      <ObservationModal
        open={isModalOpen2}
        obligation={obligation}
        onClose={() => setIsModalOpen2(false)}
      />
    </div>
  );
};

export default TableObligations;
