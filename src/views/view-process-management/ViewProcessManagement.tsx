"use client";

import { useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import ProcessReception from "./components/ProcessReception";
import InstallationProcess from "./components/InstallationProcess";
import ProcessManagementResolutions from "./components/ProcessManagementResolutions";
import ProcessManagementAlarms from "./components/ProcessManagementAlarms";
import ProcessTechnicalSupport from "./components/ProcessTechnicalSupport";
import DeactivationProcess from "./components/DeactivationProcess";
import ReceptionTable from "./components/ReceptionTable";
import InstallationTable from "./components/InstallationTable";
import TableManagementResolutions from "./components/TableManagementResolutions";
import AlarmManagementTable from "./components/AlarmManagementTable";
import TechnicalSupportTable from "./components/TechnicalSupportTable";
import DeactivationTable from "./components/DeactivationTable";

const ViewProcessManagement = () => {
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

  const openDialog = (content: ReactNode) => {
    setDialogContent(content);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        Agendamiento y ejecución de procesos
      </h1>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="mt-5">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Proceso
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={() => openDialog(<ProcessReception />)}
              >
                Recepción de Sentencias
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={() => openDialog(<InstallationProcess />)}
              >
                Instalación de Dispositivo
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={() => openDialog(<ProcessManagementResolutions />)}
              >
                Gestión de Resoluciones
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={() => openDialog(<ProcessManagementAlarms />)}
              >
                Gestión de Alarmas
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={() => openDialog(<ProcessTechnicalSupport />)}
              >
                Soporte Técnico
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={() => openDialog(<DeactivationProcess />)}
              >
                Desactivación de Dispositivo
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>{dialogContent}</DialogContent>
      </Dialog>

      <Tabs defaultValue="reception" className="mt-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="reception">Recepción</TabsTrigger>
          <TabsTrigger value="facility">Instalación</TabsTrigger>
          <TabsTrigger value="management-resolutions">Resoluciones</TabsTrigger>
          <TabsTrigger value="alarm-management">Alarmas</TabsTrigger>
          <TabsTrigger value="technical-support">Soporte</TabsTrigger>
          <TabsTrigger value="deactivation">Desactivación</TabsTrigger>
        </TabsList>
        <TabsContent value="reception">
          <ReceptionTable />
        </TabsContent>
        <TabsContent value="facility">
          <InstallationTable />
        </TabsContent>
        <TabsContent value="management-resolutions">
          <TableManagementResolutions />
        </TabsContent>
        <TabsContent value="alarm-management">
          <AlarmManagementTable />
        </TabsContent>
        <TabsContent value="technical-support">
          <TechnicalSupportTable />
        </TabsContent>
        <TabsContent value="deactivation">
          <DeactivationTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ViewProcessManagement;
