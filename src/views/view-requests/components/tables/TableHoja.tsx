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

import { ArrowDownFromLine, Ellipsis, Eye, FileDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import FilterStatus from "../FilterStatus";
import { useQueryRequest } from "@/api/queries";
import { RequestTable } from "@/views/view-create-request/interfaces";
import DetailsModalHoja from "../DetailsModalHoja";

export const TableHoja = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);

  const [stateFilter, setStateFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<RequestTable>();
  const { data: requests, isLoading } = useQueryRequest();

  const filters = [
    { id: 1, name: "Tipo de requirente" },
    { id: 2, name: "Nombre del requirente" },
    { id: 3, name: "Numero de identificación" },
    { id: 4, name: "Tipo de situación" },
  ];

  const dowloadExel = () => {
    const link = document.createElement("a");
    link.href = "/Hoja_Evolucion_Roberto_Herrera.xlsx"; // Ruta al archivo en la carpeta `public`
    link.download = "Hoja_Evolucion_Roberto_Herrera.xlsx"; // Nombre del archivo que se descargará
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dowloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/Informe de incumplimiento.pdf"; // Ruta al archivo en la carpeta `public`
    link.download = "Informe_incumplimiento.pdf"; // Nombre del archivo que se descargará
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Hoja de devolución
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
          <FilterStatus
            stateFilter={stateFilter}
            setStateFilter={setStateFilter}
          />
        </div>
      </div>
      <Card className="w-full shadow-lg py-2">
        <CardContent className="w-full px-3">
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold text-gray-600">
                  FOLIO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  NOMBRE COMPLETO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 ">
                  RIT
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  RUC
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  RUT
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600 ">
                  DIAS EFECTIVOS DE CONTROL
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600 ">
                  CRS
                </TableHead>

                <TableHead className="mr-10 mt-6 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {requests
                ?.filter((i) => i._id === "6807acc2a727d75fb424774d")
                ?.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{request.folio}</TableCell>
                    <TableCell>
                      {request.carrier.personalData.socialName}
                    </TableCell>
                    <TableCell>{request.carrier.cause.rit}</TableCell>
                    <TableCell className="text-xs ">
                      {request.carrier.cause.ruc}
                    </TableCell>
                    <TableCell>{request.carrier.personalData.run}</TableCell>

                    <TableCell>
                      {request.carrier.monitoring.daysControl}
                    </TableCell>

                    <TableCell>{request.carrier.cause.crs}</TableCell>

                    <TableCell className="mr-10 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              dowloadExel();
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <FileDown />
                              </Button>
                              <span>Descargar EXCEL</span>
                            </div>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              dowloadPDF();
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <FileDown />
                              </Button>
                              <span>Ver Incumplimiento</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedRequest(request);
                              setIsModalOpenDetails(true);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <Eye />
                              </Button>
                              <span>Ver hoja devolución</span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TableUI>
          {isLoading && (
            <div className="w-full h-[500px] bg-r flex justify-center items-center">
              <div className="loader-spiner" />
            </div>
          )}
          {!isLoading && !requests?.length && (
            <div className="w-full h-[500px] bg-r flex justify-center items-center">
              <h1 className="text-xl">No hay solicitudes</h1>
            </div>
          )}
        </CardContent>
      </Card>
      <Pagination />

      <DetailsModalHoja
        open={isModalOpenDetails}
        request={selectedRequest}
        onClose={() => setIsModalOpenDetails(false)}
      />
    </div>
  );
};
