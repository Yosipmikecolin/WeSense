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
  CircleMinus,
  CircleSlash,
  Ellipsis,
  Eye,
  FileCheck2,
  FilePen,
  Info,
  Mail,
  Redo2,
  RotateCw,
  SendHorizontal,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";

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
import DetailsModal from "../DetailsModal";
import ReturnRequestModal from "../ReturnRequestModal";
import ReturnDetailsModal from "../ReturnDetailsModal";
import { toast } from "@/hooks/use-toast";
import FilterStatus from "../FilterStatus";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryRequest } from "@/api/queries";
import { RequestTable } from "@/views/view-create-request/interfaces";

export const TableAdministrator = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReturnOpen, setIsModaReturnlOpen] = useState(false);
  const [isModalReturnOpenDetails, setIsModaReturnlOpenDetails] =
    useState(false);
  const email = "sgamgc@correo.com";
  const subject = encodeURIComponent("SGAMGC");
  const body = encodeURIComponent("Respuesta de la solicitud");
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
  const [viewButton, setViewButton] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<RequestTable>();
  const { data: requests, isLoading } = useQueryRequest();
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

  const handleClick = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

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
                  TIPO DE REQUIRENTE
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  NOMBRE DEL REQUIRENTE
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600">
                  RESPUESTA
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600 ">
                  FECHA DE EMISIÓN
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600 ">
                  FECHA DE RESPUESTA
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600">
                  <Popover>
                    <PopoverTrigger className="flex gap-2">
                      ESTADO <Info size={15} />
                    </PopoverTrigger>
                    <PopoverContent>
                      <ul>
                        <li className="flex items-center gap-2">
                          <CircleSlash size={17} color="#B7B7B7" />
                          Sin confirmar
                        </li>

                        <li className="flex items-center gap-2">
                          <RotateCw size={17} color="#FF9D23" />
                          Retornado
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={17} color="#16a34a" /> Confirmado
                        </li>

                        <li className="flex items-center gap-2">
                          <CircleMinus size={17} color="#577BC1" />
                          Hay respuesta
                        </li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </TableHead>
                <TableHead className="mr-10 mt-6 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {requests?.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.requester.userType}</TableCell>
                  <TableCell>{request.requester.fullName}</TableCell>
                  <TableCell className="text-xs ">
                    <div className="w-[110px]">
                      {request.status === "positive" && (
                        <span className="bg-green-400 text-white p-1 rounded-md">
                          {request.status}
                        </span>
                      )}

                      {request.status === "negative" && (
                        <span className="bg-red-400 text-white p-1 rounded-md">
                          {request.status}
                        </span>
                      )}
                      {request.status === "not-recommended" && (
                        <div className="flex items-center gap-2">
                          <span className="bg-orange-400 text-white p-1 rounded-md">
                            {request.status}
                          </span>
                        </div>
                      )}

                      {request.status === "no-confirmed" && (
                        <div className="flex items-center gap-2">
                          <span className="bg-gray-400 text-white p-1 rounded-md">
                            Sin respuesta
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{request.issue_date}</TableCell>

                  <TableCell>{request.response_date || "----"}</TableCell>

                  <TableCell>
                    {request.answer === "confirmed" && (
                      <CircleCheck size={17} color="#16a34a" />
                    )}

                    {request.answer === "no-confirmed" &&
                      request.response_date === "" && (
                        <CircleSlash size={17} color="#B7B7B7" />
                      )}

                    {request.answer === "returned" && (
                      <div className="flex gap-2 items-center">
                        <RotateCw size={17} color="#FF9D23" />
                      </div>
                    )}

                    {request.answer === "no-answer" &&
                      request.response_date === "" && (
                        <div className="flex items-center gap-2">
                          <CircleSlash size={17} color="#B7B7B7" />
                          <span className="text-sm">Sin confirmar</span>
                        </div>
                      )}
                  </TableCell>

                  <TableCell className="mr-10 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
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

                        {/* 
                        {viewButton === "administrator@gmail.com" &&
                          request.status !== "Sin respuesta" &&
                          request.confirmation === "false" && (
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
                          )} */}

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

                        {/*        {viewButton === "administrator@gmail.com" &&
                          request.status !== "Sin respuesta" &&
                          request.status !== "Positivo" &&
                          request.confirmation === "false" && (
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
                          )} */}

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

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <SendHorizontal />
                              </Button>
                              <span>Enviar IFT</span>
                            </div>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem onClick={handleClick}>
                                <Mail size={15} />
                                Email
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
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
      {/*       

      <AddressModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}

      <ReturnDetailsModal
        open={isModalReturnOpenDetails}
        onClose={() => setIsModaReturnlOpenDetails(false)}
      />
    </div>
  );
};
