"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Flag from "react-world-flags";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { carriers } from "@/utils";
import { Ellipsis, Eye, Pencil, Trash } from "lucide-react";
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
import { Carrier } from "@/interfaces";

const TableCarriers = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState<Carrier>();
  const filters = [
    { id: 1, name: "Nombre" },
    { id: 2, name: "Nombre social" },
    { id: 3, name: "Nacioanlidad" },
    { id: 4, name: "Estado civil" },
    { id: 5, name: "Género" },
    { id: 6, name: "Run" },
    { id: 7, name: "Teléfono" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Portadores
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
                <TableHead className="text-xs font-bold text-gray-600">
                  NOMBRE COMPLETO
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600">
                  NOMBRE SOCIAL
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600">
                  NACIONALIDAD
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  ESTADO CIVIL
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  GÉNERO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  RUN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TELÉFONO
                </TableHead>
                <TableHead className="mr-10 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {carriers.map((carrier) => (
                <TableRow key={carrier.id}>
                  <TableCell>{carrier.fullName}</TableCell>
                  <TableCell>{carrier.socialName}</TableCell>
                  <TableCell>
                    <div className="flex justify-between items-center gap-1 max-w-[100px]">
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis ">
                        {carrier.nationality}
                      </span>
                      <Flag code={carrier.countryCode} width={20} />
                    </div>
                  </TableCell>
                  <TableCell>{carrier.maritalStatus}</TableCell>
                  <TableCell>{carrier.gender}</TableCell>
                  <TableCell>{carrier.run}</TableCell>
                  <TableCell>{carrier.phone}</TableCell>

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
                            setSelectedCarrier(carrier);
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
        carrier={selectedCarrier}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TableCarriers;
