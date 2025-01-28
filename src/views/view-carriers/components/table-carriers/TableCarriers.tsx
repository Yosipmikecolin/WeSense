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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { carriers } from "@/utils";
import { Download, Eye, Pencil, Trash } from "lucide-react";
import { generatePDF, generateWord } from "../../functions";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";

const TableCarriers = () => {
  const [idFilter, setIdFilter] = useState(1);
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
                <TableHead className="text-xs font-bold text-gray-600 w-[150px]">
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
                        <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2">
                          <Eye />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle className="mb-2">
                            Detalles del portador
                          </DialogTitle>
                          <hr />
                        </DialogHeader>
                        <div className="grid gap-4 mt-3">
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">
                              Nombre social:
                            </span>
                            <span>{carrier.socialName}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">Género:</span>
                            <span>{carrier.gender}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">Nacinalidad:</span>
                            <span className="flex gap-2">
                              {carrier.nationality}
                              <Flag code={carrier.countryCode} width={20} />
                            </span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">Estado civil:</span>
                            <span>{carrier.maritalStatus}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">RUN:</span>
                            <span>{carrier.run}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">Télefono:</span>
                            <span>{carrier.phone}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant={"outline"}
                              onClick={() => generatePDF(carrier)}
                              className="bg-red-500 text-white hover:bg-red-600 hover:text-white w-full flex justify-between"
                            >
                              Descagar PDF
                              <Download />
                            </Button>
                            <Button
                              variant={"outline"}
                              onClick={() => generateWord(carrier)}
                              className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white w-full flex justify-between"
                            >
                              Descagar Word
                              <Download />
                            </Button>
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

export default TableCarriers;
