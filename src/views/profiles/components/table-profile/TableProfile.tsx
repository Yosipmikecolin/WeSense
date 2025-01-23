import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { profiles } from "@/utils";
import { Eye, Pencil, Trash } from "lucide-react";

type Persona = {
  id: number;
  name: string;
  nit: string;
  perfil: string;
  status: string;
};

const TableProfile = () => {
  const [personaSeleccionada, setPersonaSeleccionada] =
    useState<Persona | null>(null);
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Perfiles de usuario</h1>
        <Button>Crear usuario</Button>
      </div>
      <Card className="w-full shadow-lg p-4">
        <CardContent>
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm font-semibold">
                  Nombre Completo
                </TableHead>
                <TableHead className="text-sm font-semibold">NIT</TableHead>
                <TableHead className="text-sm font-semibold">Perfil</TableHead>
                <TableHead className="text-sm font-semibold">Estado</TableHead>
                <TableHead className="text-sm font-semibold w-[150px]">
                  Acciones
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
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        (persona.perfil === "Requiriente" &&
                          "bg-orange-200 text-orange-800") ||
                        (persona.perfil === "Coordinador" &&
                          "bg-indigo-200 text-indigo-800") ||
                        (persona.perfil === "Administrador" &&
                          "bg-red-200 text-red-800")
                      }`}
                    >
                      {persona.perfil}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        persona.status === "Activo"
                          ? "bg-green-200 text-green-800 py-1 px-2 rounded-md text-sm"
                          : "bg-green-100 text-green-500 py-1 px-2 rounded-md text-sm"
                      }
                    >
                      {persona.status}
                    </span>
                  </TableCell>

                  <TableCell className="w-[150px] flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setPersonaSeleccionada(persona)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2"
                        >
                          <Eye />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            Detalles de {personaSeleccionada?.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">NIT:</span>
                            <span>{personaSeleccionada?.nit}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">Perfil:</span>
                            <span>{personaSeleccionada?.perfil}</span>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <span className="font-semibold">
                              Fecha de Nacimiento: 10-10-1998
                            </span>
                            <span>{personaSeleccionada?.status}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => setPersonaSeleccionada(persona)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2"
                    >
                      <Pencil />
                    </Button>

                    <Button
                      onClick={() => setPersonaSeleccionada(persona)}
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

export default TableProfile;
