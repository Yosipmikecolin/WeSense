"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Ellipsis, Eye, Check, Delete, PlusCircle } from "lucide-react";
import ProcessReception, { ReceptionType } from "./components/ProcessReception";
import InstallationProcess from "./components/CreationProcess";
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

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Card, CardContent } from "@/components/ui/card";
import CreationProcess from "./components/CreationProcess";
import axios from "axios";

import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

interface ProcessType {
  _id: string;
  createdAt: string;
  type_law: string;
  rit: string;
  ruc: string;
  run: string;
  document: string;
  date_limit: string;
  type_resolution: string;
  status: string;
}

const ViewProcessManagement = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [idFilter, setIdFilter] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);

  const [isProcessReception, setIsProcessReception] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const [reception, setReception] = useState<ReceptionType | null>(null);

  const [products, setProducts] = useState<ProcessType[]>([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    type_law: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    rit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    ruc: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    run: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    type_resolution: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const closeDialog = () => {
    setIsShowModal(false);
  };

  const onChangeModal = (e: boolean) => {
    setIsShowModal(e);
    if (isProcessReception && isUpdate) {
      setIsUpdate(false);
      setReception(null);
    }
  };

  const show = () => {
    setIsShowModal(true);
    setIsProcessReception(true);
  };

  const getAllProcess = async () => {
    const response = await axios.get(`/api/awardee`);
    console.log("DATA: ", response.data);
    setProducts(response.data);
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const filters2 = [
    { id: 1, name: "Numero" },
    { id: 2, name: "Tipo" },
    { id: 3, name: "Fecha" },
  ];

  const laws = ["Ley 21.378", "Ley 18.216"];
  const resolutions = [
    "Instalación",
    "Prorroga / Extensión",
    "Cese de control",
    "Cambio de domicilio",
    "Solicita informe de control",
  ];

  const renderHeader = () => {
    return (
      <div className="flex justify-between">
        <Button onClick={show} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Proceso
        </Button>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            autoFocus
            className="p-1"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Filtrar..."
          />
        </IconField>
      </div>
    );
  };

  useEffect(() => {
    getAllProcess();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        Proceso de recepción de sentencias y resoluciones
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mt-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-2"></div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start"></DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isShowModal} onOpenChange={onChangeModal}>
        <DialogContent>
          <CreationProcess onClose={closeDialog} />
        </DialogContent>
      </Dialog>

      <Card className="">
        <CardContent>
          <div className="flex items-center justify-between my-5">
            {/* <Button onClick={show} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Proceso
            </Button> */}
            {/* <div className="flex gap-2">
              <Input
                maxLength={30}
                placeholder={`Buscar por ${filters2
                  .find((i) => i.id === idFilter)
                  ?.name.toLowerCase()}`}
              />
              <DropdownFilter
                filters={filters2}
                idFilter={idFilter}
                setIdFilter={setIdFilter}
              />
            </div> */}
          </div>
          <DataTable
            dataKey="_id"
            value={products}
            tableStyle={{ minWidth: "50rem" }}
            size="small"
            filters={filters}
            columnResizeMode="expand"
            resizableColumns
            filterDisplay="row"
            header={renderHeader}
            globalFilterFields={[
              "type_law",
              "rit",
              "ruc",
              "run",
              "type_resolution",
            ]}
          >
            <Column field="date" header="Fecha"></Column>
            <Column field="type_law" sortable header="Tipo de ley"></Column>
            <Column field="rit" sortable header="RIT"></Column>
            <Column field="ruc" sortable header="RUC"></Column>
            <Column field="run" sortable header="RUN"></Column>
            <Column field="date_limit" header="Fecha limite"></Column>
            <Column
              field="type_resolution"
              sortable
              header="Tipo de resolución"
            ></Column>
            <Column field="document" header="Documento adjunto"></Column>
            <Column field="status" header="Estado"></Column>
            <Column
              field="actions"
              header="Acciones"
              body={
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                          <Check />
                        </Button>
                        <span>Aceptar</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                          <Delete />
                        </Button>
                        <span>Devolución</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              }
            ></Column>
          </DataTable>
        </CardContent>
      </Card>

      <Tabs defaultValue="reception" className="mt-4" defaultChecked>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="facility">Instalación</TabsTrigger>
          <TabsTrigger value="management-resolutions">
            Prorroga / Extensión
          </TabsTrigger>
          <TabsTrigger value="deactivation">Cese de control </TabsTrigger>
          <TabsTrigger value="alarm-management">
            Cambio de domicilio
          </TabsTrigger>
          <TabsTrigger value="technical-support">
            Solicita informe de control
          </TabsTrigger>
        </TabsList>
        <TabsContent value="facility">
          <InstallationTable />
        </TabsContent>
        <TabsContent value="management-resolutions">
          {/* <TableManagementResolutions onUpdate={onUpdateResolution} /> */}
        </TabsContent>
        <TabsContent value="alarm-management">
          {/* <AlarmManagementTable onUpdate={onUpdateAlert} /> */}
        </TabsContent>
        <TabsContent value="technical-support">
          {/* <TechnicalSupportTable onUpdate={onUpdateSuport} /> */}
        </TabsContent>
        <TabsContent value="deactivation">
          {/* <DeactivationTable onUpdate={onUpdateDesactivation} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ViewProcessManagement;
