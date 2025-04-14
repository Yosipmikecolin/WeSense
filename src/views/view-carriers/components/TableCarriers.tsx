"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Flag from "react-world-flags";
import axios from "axios";
import { useBuddieStore } from "@/store/index";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

import {
  FormDataCarrier,
  FormDataWearer,
} from "@/views/view-create-carrier/interfaces";
import { getCountryCode } from "@/functions";
import UpdatedCarrierModal from "./UpdatedCarrierModal ";
import DeleteModalCarrier from "@/components/DeleteModalCarrier";
import { useQueryCarriers, useQueryCarriersApi } from "@/api/queries";
import { Wearer } from "@/interfaces/interfaces.read";
import { axiosConfigBuddie } from "@/api/config";

const TableCarriers = () => {
  const { setToken } = useBuddieStore();
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wearers, setWearers] = useState<Wearer[]>([]);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState<FormDataWearer>();
  const { data: carriers, isLoading, refetch } = useQueryCarriersApi();
  // const { data: carriers, refetch, isLoading } = useQueryCarriers();
  const filters = [
    { id: 1, name: "Nombre" },
    { id: 2, name: "Nombre social" },
    { id: 3, name: "Nacioanlidad" },
    { id: 4, name: "Estado civil" },
    { id: 5, name: "Género" },
    { id: 6, name: "Run" },
    { id: 7, name: "Teléfono" },
  ];
  /*   const getAllWearers = async () => {
    const response_read = await axios.get(
      "/api/buddie?method=setup.wearer.grid",
      {}
    );
    setToken(response_read.data.csrf_token);
    console.log("RESPONSE: ", response_read.data);
    if (!response_read.data.error) {
      const wearers: Wearer[] = response_read.data.grid.rows;
      console.log("ALL: ", wearers);
      setWearers(wearers);
    }
  }; */

  /*   useEffect(() => {
    getAllWearers();
  }, []); */

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
                  NOMBRES
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  APELLIDOS
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  CORREO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  ACCIONES
                </TableHead>
                {/* <TableHead className="text-xs font-bold text-gray-600">
                  ESTADO CIVIL
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  NACIONALIDAD
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  GÉNERO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO DE PORTADOR
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TELÉFONO
                </TableHead>
                <TableHead className="mr-10 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {carriers?.map((carrier) => (
                <TableRow key={carrier.id}>
                  <TableCell>{carrier.first_name}</TableCell>
                  <TableCell>{carrier.surname}</TableCell>
                  {/* <TableCell>
                    <div className="flex justify-between items-center gap-1 max-w-[100px]">
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis ">
                        {carrier.country_id}
                      </span>
                      <Flag
                        width={20}
                        code={getCountryCode(carrier?.country_id || "")}
                      />
                    </div>
                  </TableCell> */}
                  {/* <TableCell>{carrier.gender}</TableCell> */}
                  <TableCell>{carrier.email || "Sin email"}</TableCell>
                  {/* <TableCell>{carrier.phone_type}</TableCell> */}

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
                            setSelectedCarrier({
                              wearer: {
                                id: carrier.id,
                                first_name: carrier.first_name,
                                surname: carrier.surname,
                                email: carrier.email,
                              },
                            });
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
                          onClick={() => {
                            setSelectedCarrier({
                              wearer: {
                                id: carrier.id,
                                first_name: carrier.first_name,
                                surname: carrier.surname,
                                email: carrier.email,
                              },
                            });
                            setIsModalOpen2(true);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Pencil />
                            </Button>
                            <span>Editar</span>
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedCarrier({
                              wearer: {
                                id: carrier.id,
                                first_name: carrier.first_name,
                                surname: carrier.surname,
                                email: carrier.email,
                              },
                            });
                            setIsModalOpen3(true);
                          }}
                        >
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
          {isLoading && (
            <div className="w-full h-[500px] bg-r flex justify-center items-center">
              <div className="loader-spiner" />
            </div>
          )}
        </CardContent>
      </Card>
      <Pagination />
      <DetailsModal
        open={isModalOpen}
        carrier={selectedCarrier}
        onClose={() => setIsModalOpen(false)}
      />

      <UpdatedCarrierModal
        open={isModalOpen2}
        carrier={selectedCarrier}
        onClose={() => setIsModalOpen2(false)}
        refetch={refetch}
      />
      <DeleteModalCarrier
        id={selectedCarrier?.wearer.id}
        open={isModalOpen3}
        onClose={() => setIsModalOpen3(false)}
        refetch={refetch}
      />
    </div>
  );
};

export default TableCarriers;
