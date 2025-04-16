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
import ProcessReception, { ReceptionType } from "./components/ProcessReception";
import InstallationProcess, {
  InstalationType,
} from "./components/InstallationProcess";
import ProcessManagementResolutions, {
  ResolutionType,
} from "./components/ProcessManagementResolutions";
import ProcessManagementAlarms, {
  AlertType,
} from "./components/ProcessManagementAlarms";
import ProcessTechnicalSupport, {
  SuportType,
} from "./components/ProcessTechnicalSupport";
import DeactivationProcess, {
  DesactivationType,
} from "./components/DeactivationProcess";
import ReceptionTable from "./components/ReceptionTable";
import InstallationTable from "./components/InstallationTable";
import TableManagementResolutions from "./components/TableManagementResolutions";
import AlarmManagementTable from "./components/AlarmManagementTable";
import TechnicalSupportTable from "./components/TechnicalSupportTable";
import DeactivationTable from "./components/DeactivationTable";
import { Input } from "@/components/ui/input";
import { DropdownFilter } from "@/components";

const ViewProcessManagement = () => {
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);
  const [idFilter, setIdFilter] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);

  const [isProcessReception, setIsProcessReception] = useState(false);
  const [isInstalation, setIsInstalation] = useState(false);
  const [isResolution, setIsResolution] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isSuport, setIsSuport] = useState(false);
  const [isDesactivation, setIsDesactivation] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const [reception, setReception] = useState<ReceptionType | null>(null);
  const [instalation, setInstalation] = useState<InstalationType | null>(null);
  const [resolution, setResolution] = useState<ResolutionType | null>(null);
  const [alert, setAlert] = useState<AlertType | null>(null);
  const [suport, setSuport] = useState<SuportType | null>(null);
  const [desactivation, setDesactivation] = useState<DesactivationType | null>(
    null
  );

  const filters = [
    { id: 1, name: "Numero" },
    { id: 2, name: "Tipo" },
    { id: 3, name: "Fecha" },
  ];

  const closeDialog = (type: string) => {
    if (type === "reception") {
      setIsProcessReception(false);
      setIsShowModal(false);
    }
    if (type === "instalation") {
      setIsInstalation(false);
      setIsShowModal(false);
    }
    if (type === "resolution") {
      setIsResolution(false);
      setIsShowModal(false);
    }

    if (type === "alert") {
      setIsAlert(false);
      setIsShowModal(false);
    }
    if (type === "suport") {
      setIsSuport(false);
      setIsShowModal(false);
    }
    if (type === "desactivation") {
      setIsDesactivation(false);
      setIsShowModal(false);
    }
  };

  const onChangeModal = (e: boolean) => {
    setIsShowModal(e);
    if (isProcessReception && isUpdate) {
      setIsUpdate(false);
      setReception(null);
    }
    if (isInstalation && isUpdate) {
      setIsUpdate(false);
      setInstalation(null);
    }
    if (isResolution && isUpdate) {
      setIsUpdate(false);
      setResolution(null);
    }
    if (isAlert && isUpdate) {
      setIsUpdate(false);
      setAlert(null);
    }
    if (isSuport && isUpdate) {
      setIsUpdate(false);
      setSuport(null);
    }
    if (isDesactivation && isUpdate) {
      setIsUpdate(false);
      setDesactivation(null);
    }
  };

  const show = (type: string) => {
    if (type === "reception") {
      setIsShowModal(true);
      setIsProcessReception(true);

      setIsInstalation(false);
      setIsResolution(false);
      setIsAlert(false);
      setIsSuport(false);
      setIsDesactivation(false);
    }
    if (type === "instalation") {
      setIsShowModal(true);
      setIsInstalation(true);

      setIsProcessReception(false);
      setIsResolution(false);
      setIsAlert(false);
      setIsSuport(false);
      setIsDesactivation(false);
    }
    if (type === "resolution") {
      setIsShowModal(true);
      setIsResolution(true);

      setIsProcessReception(false);
      setIsInstalation(false);
      setIsAlert(false);
      setIsSuport(false);
      setIsDesactivation(false);
    }
    if (type === "alert") {
      setIsShowModal(true);
      setIsAlert(true);

      setIsProcessReception(false);
      setIsResolution(false);
      setIsInstalation(false);
      setIsSuport(false);
      setIsDesactivation(false);
    }
    if (type === "suport") {
      setIsShowModal(true);
      setIsSuport(true);

      setIsProcessReception(false);
      setIsResolution(false);
      setIsInstalation(false);
      setIsAlert(false);
      setIsDesactivation(false);
    }
    if (type === "desactivation") {
      setIsShowModal(true);
      setIsDesactivation(true);

      setIsProcessReception(false);
      setIsResolution(false);
      setIsInstalation(false);
      setIsSuport(false);
      setIsAlert(false);
    }
  };

  const onUpdateReception = (type: string, value: ReceptionType) => {
    setIsUpdate(true);
    setReception(value);
    show(type);
  };

  const onUpdateInstalation = (type: string, value: InstalationType) => {
    setIsUpdate(true);
    setInstalation(value);
    show(type);
  };
  const onUpdateResolution = (type: string, value: ResolutionType) => {
    setIsUpdate(true);
    setResolution(value);
    show(type);
  };
  const onUpdateAlert = (type: string, value: AlertType) => {
    setIsUpdate(true);
    setAlert(value);
    show(type);
  };
  const onUpdateSuport = (type: string, value: SuportType) => {
    setIsUpdate(true);
    setSuport(value);
    show(type);
  };
  const onUpdateDesactivation = (type: string, value: DesactivationType) => {
    setIsUpdate(true);
    setDesactivation(value);
    show(type);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        Agendamiento y ejecución de procesos
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mt-5">
          <div className="flex items-center justify-between">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Proceso
            </Button>
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
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => show("reception")}>
            Recepción de Sentencias
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => show("instalation")}>
            Instalación de Dispositivo
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => show("resolution")}>
            Gestión de Resoluciones
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => show("alert")}>
            Gestión de Alarmas
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => show("suport")}>
            Soporte Técnico
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => show("desactivation")}>
            Desactivación de Dispositivo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isShowModal} onOpenChange={onChangeModal}>
        <DialogContent>
          {isProcessReception && (
            <ProcessReception
              reception={reception}
              onClose={() => closeDialog("reception")}
            />
          )}

          {isInstalation && (
            <InstallationProcess
              instalation={instalation}
              onClose={() => closeDialog("instalation")}
            />
          )}

          {isResolution && (
            <ProcessManagementResolutions
              resolution={resolution}
              onClose={() => closeDialog("resolution")}
            />
          )}
          {isAlert && (
            <ProcessManagementAlarms
              alert={alert}
              onClose={() => closeDialog("alert")}
            />
          )}
          {isSuport && (
            <ProcessTechnicalSupport
              suport={suport}
              onClose={() => closeDialog("suport")}
            />
          )}
          {isDesactivation && (
            <DeactivationProcess
              desactivation={desactivation}
              onClose={() => closeDialog("desactivation")}
            />
          )}
        </DialogContent>
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
          <ReceptionTable onUpdate={onUpdateReception} />
        </TabsContent>
        <TabsContent value="facility">
          <InstallationTable onUpdate={onUpdateInstalation} />
        </TabsContent>
        <TabsContent value="management-resolutions">
          <TableManagementResolutions onUpdate={onUpdateResolution} />
        </TabsContent>
        <TabsContent value="alarm-management">
          <AlarmManagementTable onUpdate={onUpdateAlert} />
        </TabsContent>
        <TabsContent value="technical-support">
          <TechnicalSupportTable onUpdate={onUpdateSuport} />
        </TabsContent>
        <TabsContent value="deactivation">
          <DeactivationTable onUpdate={onUpdateDesactivation} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ViewProcessManagement;
