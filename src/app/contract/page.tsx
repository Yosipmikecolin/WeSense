import { Dashboard } from "@/components";
import {
  MantencionForm,
  ViewCreateObligations,
  ViewObligations,
} from "@/views";
import MaintenanceView from "@/views/Maintenance";
import ReporteVisitaForm from "@/views/ReporteVisitaForm";
import DeviceStockView from "@/views/device-stock-view/device-stock-view";
import SatellitePhoneTestView from "@/views/evidence/satellite-phone-test-view";
import BillingHistoryView from "@/views/tracking-history/billing-history-view";
import TrainingView from "@/views/training/training-view";
import { FilePlus, FileSearch2 } from "lucide-react";

const Contract = () => {
  const menuItems = [
    {
      icon: <FilePlus size={17} />,
      label: "Crear obligación",
      content: <ViewCreateObligations />,
    },
    {
      icon: <FileSearch2 size={17} />,
      label: "Obligaciones",
      content: <ViewObligations />,
    },
    {
      icon: <FilePlus size={17} />,
      label: "Programación",
      content: <MantencionForm />,
    },
    {
      icon: <FileSearch2 size={17} />,
      label: "Reportes",
      content: <ReporteVisitaForm />,
    },
    {
      icon: <FileSearch2 size={17} />,
      label: "Mantenimientos",
      content: <MaintenanceView />,
    },
    {
      icon: <FileSearch2 size={17} />,
      label: "Capacitaciones",
      content: <TrainingView />,
    },
    {
      icon: <FileSearch2 size={17} />,
      label: "Pruebas telefonicas",
      content: <SatellitePhoneTestView />,
    },
    {
      icon: <FileSearch2 size={17} />,
      label: "Stock dispositivos",
      content: <DeviceStockView />,
    },
    {
      icon: <FileSearch2 size={17} />,
      label: "Facturación",
      content: <BillingHistoryView />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Contract;
