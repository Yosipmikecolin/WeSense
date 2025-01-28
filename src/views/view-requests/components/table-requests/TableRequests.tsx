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
import { profiles, requests } from "@/utils";
import { Circle, Eye, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";

const TableRequests = () => {
  const [idFilter, setIdFilter] = useState(1);
  const filters = [
    { id: 1, name: "Tipo de requirente" },
    { id: 2, name: "Nombre del requirente" },
    { id: 3, name: "Numero de identificación" },
    { id: 4, name: "Tipo de situación" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Solicitudes
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
                  TIPO DE REQUIRENTE
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  NOMBRE DEL REQUIRENTE
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  NUMERO DE IDENTIFICACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  TIPO DE SITUACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600 w-[150px]">
                  FECHA DE SOLICITUD
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600 w-[150px]">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {requests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.requester_type}</TableCell>
                  <TableCell>{request.requester_name}</TableCell>
                  <TableCell>{request.identification_number}</TableCell>
                  <TableCell>{request.situation_type}</TableCell>
                  <TableCell>{request.request_date}</TableCell>

                  <TableCell className="w-[150px] flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2">
                          <Eye />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold">
                            Detalles de solicitud
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b">
                              <span className="text-sm text-gray-500">
                                Nombre del solicitante
                              </span>
                              <span className="font-medium">
                                {request.requester_name}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b">
                              <span className="text-sm text-gray-500">
                                Numero de identifiación del solicitante
                              </span>
                              <span className="font-mono">
                                {request.identification_number}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b">
                              <span className="text-sm text-gray-500">
                                Tipo de solicitante
                              </span>
                              <span className="font-medium">
                                {request.requester_type}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">
                                Fecha de solicitud
                              </span>
                              <span className="font-medium">
                                {request.request_date}
                              </span>
                            </div>
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

export default TableRequests;
