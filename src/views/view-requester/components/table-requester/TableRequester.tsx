"use client";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { requesters } from "@/utils";
import {
  BriefcaseBusiness,
  Eye,
  Gavel,
  Landmark,
  Pencil,
  Trash,
  UserCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";

const TableRequester = () => {
  const [idFilter, setIdFilter] = useState(1);
  const filters = [
    { id: 1, name: "Nombre" },
    { id: 2, name: "Email" },
    { id: 3, name: "Tipo" },
    { id: 4, name: "Institución" },
    { id: 5, name: "Ciudad" },
    { id: 6, name: "Dirección" },
    { id: 7, name: "Identificación" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Requirentes
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
                  EMAIL
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  INSTITUCIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  CIUDAD
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  DIRECCIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  NÚMERO DE IDENTIFICACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 w-[150px]">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {requesters.map((requester, index) => (
                <TableRow key={index}>
                  <TableCell>{requester.fullName}</TableCell>
                  <TableCell>{requester.email}</TableCell>
                  <TableCell>
                    <div className="w-28 flex items-center justify-between gap-2 bg-green-100 text-green-500 py-1 px-2  rounded-lg">
                      {requester.userType}
                      {requester.userType === "Tribunal" && (
                        <Landmark size={15} />
                      )}

                      {requester.userType === "Juez" && <Gavel size={15} />}

                      {requester.userType === "Abogado" && (
                        <BriefcaseBusiness size={15} />
                      )}

                      {requester.userType === "Personal de Instalación" && (
                        <UserCheck size={15} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{requester.institution}</TableCell>
                  <TableCell>{requester.region}</TableCell>
                  <TableCell>{requester.address}</TableCell>
                  <TableCell>{requester.identificationNumber}</TableCell>

                  <TableCell className="w-[150px] flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2">
                          <Eye />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle className="mb-2">
                            Detalles del requirente
                          </DialogTitle>
                          <hr />
                        </DialogHeader>
                        <div className="grid gap-4 mt-3">
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">
                              Nombre completo:
                            </span>
                            <span>{requester.fullName}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">Tipo:</span>
                            <span>{requester.userType}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">Telefono:</span>
                            <span className="flex gap-2">
                              {requester.phone}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">
                              Fecha de registro:
                            </span>
                            <span>{requester.registrationDate}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">Institucion:</span>
                            <span>{requester.institution}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">
                              Observaciones:
                            </span>
                            <span>{requester.observations}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2">
                      <Pencil />
                    </Button>

                    <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2">
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableUI>
        </CardContent>
      </Card>
      <Pagination />
    </div>
  );
};

export default TableRequester;
