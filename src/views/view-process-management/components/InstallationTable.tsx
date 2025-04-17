"use client";

import { useEffect, useState } from "react";
import { Ellipsis, Eye, Pencil, SendHorizontal, Trash } from "lucide-react";
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
import { Pagination } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DetailsModal from "./DetailsModal";
import { InstalationType } from "./CreationProcess";
import axios from "axios";
import DeleteModalInstalation from "./DeleteModalInstalation";

interface Props {
  onUpdate: (type: string, instalation: InstalationType) => void;
}

const InstallationTable = () => {
  const [data, setData] = useState<InstalationType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState("");

  const getAll = async () => {
    const response = await axios.get(`/api/awardee/instalation`);
    setData(response.data);
  };

  const onDelete = async (item: InstalationType) => {
    setSelectedToDelete(item._id);
    setIsModalDeleteOpen(true);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <Card className="w-full shadow-lg py-2 mt-7">
        <CardContent className="w-full px-3">
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold text-gray-600">
                  ESTADO DEL DISPOSITIVO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  LUGAR DE INSTALACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO DE DISPOSITIVO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  NÚMERO DE SERIE
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  FECHA DE INSTALACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 text-right">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.deviceStatus}</TableCell>
                  <TableCell>{item.installationLocation}</TableCell>
                  <TableCell>{item.deviceType}</TableCell>
                  <TableCell>{item.serialNumber}</TableCell>
                  <TableCell>{item.installationDate}</TableCell>
                  <TableCell className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedDocument(item);
                            setIsModalOpen(true);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Eye />
                            </Button>
                            <span>
                              La persona no llega después de la fecha límite
                            </span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Pencil />
                            </Button>
                            <span>
                              La persona llega dentro de la fecha límite
                            </span>
                          </div>
                        </DropdownMenuItem>
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
      <DetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalles del instalación"
        data={selectedDocument}
        fields={[
          { key: "deviceStatus", label: "Estado del Dispositivo" },
          { key: "installationLocation", label: "Lugar de Instalación" },
          { key: "deviceType", label: "Tipo de Dispositivo" },
          { key: "serialNumber", label: "Número de Serie" },
          { key: "installationDate", label: "Fecha de Instalación" },
        ]}
      />
      <DeleteModalInstalation
        id={selectedToDelete}
        open={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        // refetch={refetch}
      />
    </div>
  );
};

export default InstallationTable;
