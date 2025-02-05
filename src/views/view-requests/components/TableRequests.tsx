import { useEffect, useState } from "react";
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

import { requests } from "@/utils";
import {
  CircleCheck,
  CircleSlash,
  Ellipsis,
  Eye,
  FileCheck2,
  FilePen,
  Pencil,
  Redo2,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";
import AddressModal from "./AddressModal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import DetailsModal from "./DetailsModal";
import ReturnRequestModal from "./ReturnRequestModal";
import { toast } from "@/hooks/use-toast";

const TableRequests = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReturnOpen, setIsModaReturnlOpen] = useState(false);
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
  const [viewButton, setViewButton] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<{
    requester_type: string;
    requester_name: string;
    identification_number: string;
    situation_type: string;
    request_date: string;
    response_date: string;
    status: string;
    confirmation: boolean;
  }>();
  const filters = [
    { id: 1, name: "Tipo de requirente" },
    { id: 2, name: "Nombre del requirente" },
    { id: 3, name: "Numero de identificación" },
    { id: 4, name: "Tipo de situación" },
  ];

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setViewButton(email);
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Solicitudes de factibilidad técnica
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
                  ESTADO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  TIPO DE SITUACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600 ">
                  FECHA DE EMISIÓN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600 ">
                  FECHA DE RESPUESTA
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600 ">
                  CONFIRMACIÓN
                </TableHead>
                <TableHead className="mr-10 text-xs font-bold uppercase text-gray-600 flex justify-end">
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
                  <TableCell className="text-xs">
                    {request.status === "Positivo" && (
                      <span className="bg-green-400 text-white p-1 rounded-md">
                        {request.status}
                      </span>
                    )}

                    {request.status === "Sin respuesta" && (
                      <span className="bg-gray-400 text-white p-1 rounded-md">
                        {request.status}
                      </span>
                    )}

                    {request.status === "Negativo" && (
                      <span className="bg-red-400 text-white p-1 rounded-md">
                        {request.status}
                      </span>
                    )}

                    {request.status === "No recomendable" && (
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-400 text-white p-1 rounded-md">
                          {request.status}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{request.situation_type}</TableCell>
                  <TableCell>{request.request_date}</TableCell>
                  <TableCell>{request.response_date}</TableCell>
                  <TableCell>
                    {request.confirmation ? (
                      <CircleCheck size={17} color="#16a34a" />
                    ) : (
                      <CircleSlash size={17} color="#B7B7B7" />
                    )}
                  </TableCell>

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
                            setSelectedRequest(request);
                            setIsModalOpenDetails(true);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Eye />
                            </Button>
                            <span>Detalles</span>
                          </div>
                        </DropdownMenuItem>
                        {viewButton === "awardee@gmail.com" && (
                          <DropdownMenuItem
                            onClick={() => setIsModalOpen(true)}
                          >
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <FilePen />
                              </Button>
                              <span>Gestionar</span>
                            </div>
                          </DropdownMenuItem>
                        )}
                        {viewButton === "administrator@gmail.com" &&
                          request.status !== "Sin respuesta" &&
                          !request.confirmation && (
                            <DropdownMenuItem
                              onClick={() =>
                                toast({
                                  title: "Solicitud confirmada",
                                  className: "bg-green-500 text-white",
                                  description:
                                    "Esta solicitud ha pasado por todo el proceso de verificación y validación.",
                                })
                              }
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <FileCheck2 />
                                </Button>
                                <span>Confirmar</span>
                              </div>
                            </DropdownMenuItem>
                          )}

                        {viewButton === "administrator@gmail.com" &&
                          request.status !== "Sin respuesta" &&
                          request.status !== "Positivo" &&
                          !request.confirmation && (
                            <DropdownMenuItem
                              onClick={() => setIsModaReturnlOpen(true)}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <Redo2 />
                                </Button>
                                <span>Devolver</span>
                              </div>
                            </DropdownMenuItem>
                          )}

                        {viewButton === "awardee@gmail.com" &&
                          !request.confirmation && (
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                Estado
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      toast({
                                        title:
                                          "El estado ha sido cambiado a (Positivo)",
                                        className:
                                          "border border-green-500 text-green-600",
                                      });
                                    }}
                                  >
                                    Positivo
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      toast({
                                        title:
                                          "El estado ha sido cambiado a (Negativo)",
                                        className:
                                          "border border-red-500 text-red-600",
                                      });
                                    }}
                                  >
                                    Negativo
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      toast({
                                        title:
                                          "El estado ha sido cambiado a (No recomendable)",
                                        className:
                                          "border border-orange-500 text-orange-600",
                                      });
                                    }}
                                  >
                                    No recomendable
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          )}

                        {viewButton === "requiring@gmail.com" && (
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <Pencil />
                              </Button>
                              <span>Editar</span>
                            </div>
                          </DropdownMenuItem>
                        )}
                        {viewButton === "requiring@gmail.com" && (
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <Trash />
                              </Button>
                              <span>Eliminar</span>
                            </div>
                          </DropdownMenuItem>
                        )}
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
      <ReturnRequestModal
        open={isModalReturnOpen}
        onClose={() => setIsModaReturnlOpen(false)}
      />
      <DetailsModal
        open={isModalOpenDetails}
        request={selectedRequest}
        onClose={() => setIsModalOpenDetails(false)}
      />
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TableRequests;
