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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { requests } from "@/utils";
import { Eye, EyeIcon, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";
import DomicilioModal from "../address-modal/AddressModal";

const TableRequests = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewButton, setViewButton] = useState(false);
  const filters = [
    { id: 1, name: "Tipo de requirente" },
    { id: 2, name: "Nombre del requirente" },
    { id: 3, name: "Numero de identificación" },
    { id: 4, name: "Tipo de situación" },
  ];

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email && email === "administrator@gmail.com") {
      setViewButton(true);
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

                        <Dialog>
                          <DialogTrigger asChild>
                            <EyeIcon
                              size={20}
                              color="#686D76"
                              className="cursor-pointer"
                            />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-semibold">
                                Respuesta a su solicitud
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-4">
                                <div className="flex flex-col items-center pb-4 border-b">
                                  <p>
                                    Después de una cuidadosa consideración y
                                    evaluación de la solicitud, lamento
                                    informarle que no podemos recomendar la
                                    instalación del dispositivo de seguimiento
                                    en este momento.
                                  </p>
                                  <p>
                                    Nuestra decisión se basa en los siguientes
                                    factores:
                                  </p>
                                  <br />
                                  <ul className="flex flex-col gap-2">
                                    <li>
                                      <strong>Evaluación de Riesgo:</strong> La
                                      evaluación de riesgo del preso Albero
                                      Rodiguez indica que no cumple con los
                                      criterios para la instalación de un
                                      dispositivo de seguimiento.
                                    </li>
                                    <li>
                                      <strong>Recursos Limitados:</strong> La
                                      prisión cuenta con recursos limitados para
                                      la instalación y el mantenimiento de
                                      dispositivos de seguimiento.
                                    </li>
                                    <li>
                                      <strong>Alternativas:</strong> Existen
                                      alternativas de supervisión y seguimiento
                                      disponibles que se consideran más
                                      apropiadas para el caso del preso Albero
                                      Rodiguez.
                                    </li>
                                  </ul>

                                  <p>
                                    Le agradezco su comprensión y le invito a
                                    comunicarse conmigo si tiene alguna pregunta
                                    o desea discutir esta decisión con más
                                    detalle.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </TableCell>
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

                    {viewButton && (
                      <Button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <Pencil />
                      </Button>
                    )}

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
      <DomicilioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TableRequests;
