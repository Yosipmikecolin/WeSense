"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Flag from "react-world-flags";
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
import { useState } from "react";
import { carriers } from "@/utils";
import { Eye, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";

type Carrier = {
  id: number;
  fullName: string;
  socialName: string;
  nationality: string;
  maritalStatus: string;
  countryCode: string;
  gender: string;
  run: string;
  phone: string;
};

const TableCarriers = () => {
  const [personaSeleccionada, setPersonaSeleccionada] =
    useState<Carrier | null>(null);
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Portadores</h1>
        <div>
          <Input placeholder="Buscar portador" />
        </div>
      </div>
      <Card className="w-full shadow-lg p-4">
        <CardContent>
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm font-semibold">
                  Nombre Completo
                </TableHead>

                <TableHead className="text-sm font-semibold">
                  Nombre Social
                </TableHead>

                <TableHead className="text-sm font-semibold">
                  Nacionalidad
                </TableHead>
                <TableHead className="text-sm font-semibold">
                  Estado Civil
                </TableHead>
                <TableHead className="text-sm font-semibold">Género</TableHead>
                <TableHead className="text-sm font-semibold">RUN</TableHead>
                <TableHead className="text-sm font-semibold">
                  Teléfono
                </TableHead>
                <TableHead className="text-sm font-semibold w-[150px]">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {carriers.map((carrier) => (
                <TableRow key={carrier.id}>
                  <TableCell>{carrier.fullName}</TableCell>
                  <TableCell>{carrier.socialName}</TableCell>
                  <TableCell>
                    <div className="flex justify-between items-center gap-1 max-w-[150px]">
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

                  <TableCell className="w-[150px] flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setPersonaSeleccionada(carrier)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2"
                        >
                          <Eye />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            Detalles de {personaSeleccionada?.fullName}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">NIT:</span>
                            <span>{personaSeleccionada?.gender}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">Perfil:</span>
                            <span>{personaSeleccionada?.nationality}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">
                              Fecha de Nacimiento: 10-10-1998
                            </span>
                            <span>{personaSeleccionada?.phone}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => setPersonaSeleccionada(carrier)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2"
                    >
                      <Pencil />
                    </Button>

                    <Button
                      onClick={() => setPersonaSeleccionada(carrier)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2"
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableUI>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableCarriers;
