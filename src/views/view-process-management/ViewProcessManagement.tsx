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
import InstallationTable from "./components/TableInstalation";
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
import ProcessModal from "./components/ProcessModal";

export interface ProcessType {
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
  const [currentProcess, setCurrentProcess] = useState<ProcessType>();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalProcess, setIsShowModalProcess] = useState(false);

  const [isProcessReception, setIsProcessReception] = useState(false);

  const [modal, setModal] = useState(false);

  const [typeModal, setTypeModal] = useState("0");

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
  };

  const show = () => {
    setIsShowModal(true);
  };

  const getAllProcess = async () => {
    const response = await axios.get(`/api/awardee`, {
      params: {
        method: "get.all",
      },
    });
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

  const renderHeader = () => {
    return (
      <div className="flex justify-between">
        <Button onClick={show} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Proceso
        </Button>
        <IconField iconPosition="left">
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

  const bodyActions = (process: ProcessType) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              onChangeStatus("1", process);
            }}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                <Check />
              </Button>
              <span>Aceptar</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onChangeStatus("0", process);
            }}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                <i className="pi pi-times-circle"></i>
                {/* <Delete /> */}
              </Button>
              <span>Devolución</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  useEffect(() => {
    getAllProcess();
  }, []);

  const onChangeStatus = (value: string, process: ProcessType) => {
    if (value === "1") {
      setTypeModal(value);
      setCurrentProcess(process);
      setModal(true);
    }
    if (value === "0") {
      setTypeModal(value);
      setCurrentProcess(process);
      setModal(true);
    }
  };

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

      <Card>
        <CardContent>
          <DataTable
            className="mt-6"
            dataKey="_id"
            value={products}
            tableStyle={{ minWidth: "50rem" }}
            size="small"
            filters={filters}
            columnResizeMode="expand"
            resizableColumns
            stripedRows
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
            <Column
              field="document"
              header="Documento adjunto"
              body={<span>Sin documento</span>}
            ></Column>
            <Column field="status" header="Estado"></Column>
            <Column
              field="actions"
              header="Acciones"
              body={bodyActions}
            ></Column>
          </DataTable>
        </CardContent>
      </Card>

      <Tabs defaultValue="0" className="mt-2" defaultChecked>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="0">Instalación</TabsTrigger>
          <TabsTrigger value="1">Prorroga / Extensión</TabsTrigger>
          <TabsTrigger value="2">Cese de control </TabsTrigger>
          <TabsTrigger value="3">Cambio de domicilio</TabsTrigger>
          <TabsTrigger value="4">Solicita informe de control</TabsTrigger>
        </TabsList>
        <TabsContent value="0">
          <InstallationTable />
        </TabsContent>
        <TabsContent value="1">
          {/* <TableManagementResolutions onUpdate={onUpdateResolution} /> */}
        </TabsContent>
        <TabsContent value="2">
          {/* <AlarmManagementTable onUpdate={onUpdateAlert} /> */}
        </TabsContent>
        <TabsContent value="3">
          {/* <TechnicalSupportTable onUpdate={onUpdateSuport} /> */}
        </TabsContent>
        <TabsContent value="4">
          {/* <DeactivationTable onUpdate={onUpdateDesactivation} /> */}
        </TabsContent>
      </Tabs>

      <ProcessModal
        open={modal}
        type={typeModal}
        process={currentProcess}
        onClose={() => setModal(false)}
        // refetch={refetch}
      />
    </div>
  );
};

export default ViewProcessManagement;
