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
import { profiles } from "@/utils";
import { Circle, Eye, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";

const TableUsers = () => {
  const [idFilter, setIdFilter] = useState(1);
  const filters = [
    { id: 1, name: "Nombre" },
    { id: 2, name: "Nit" },
    { id: 3, name: "Perfil" },
    { id: 4, name: "Estado" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Usuarios
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
                  NOMBRE COMPLETO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  NIT
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  PERFIL
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  ESTADO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600 w-[150px]">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {profiles.map((persona) => (
                <TableRow key={persona.id}>
                  <TableCell>{persona.name}</TableCell>
                  <TableCell>{persona.nit}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                        persona.perfil === "Requiriente"
                          ? "bg-orange-400 text-white p-1 rounded-md"
                          : persona.perfil === "Coordinador"
                          ? "bg-blue-400 text-white p-1 rounded-md"
                          : "bg-red-400 text-white p-1 rounded-md"
                      }`}
                    >
                      {persona.perfil}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        persona.status === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {persona.status === "Activo" ? (
                        "● Activo"
                      ) : (
                        <div className="flex items-center gap-1">
                          <Circle size={7} /> Inactivo
                        </div>
                      )}
                    </span>
                  </TableCell>

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
                            Detalles de usuario
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b">
                              <span className="text-sm text-gray-500">
                                Nombre
                              </span>
                              <span className="font-medium">
                                {persona.name}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b">
                              <span className="text-sm text-gray-500">NIT</span>
                              <span className="font-mono">{persona.nit}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b">
                              <span className="text-sm text-gray-500">
                                Perfil
                              </span>
                              <span className="font-medium">
                                {persona.perfil}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">
                                Estado
                              </span>
                              <span className="font-medium">
                                {persona.status}
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

export default TableUsers;
