import { Dashboard } from "@/components";
import {
  ViewCreationEvents,
  ViewProcessManagement,
  ViewReport,
  ViewRequests,
} from "@/views";
import ViewHistory from "@/views/view-history/ViewHistory";
import ViewSupportManagement from "@/views/view-support-management/ViewSupportManagement";
import {
  BookText,
  CalendarPlus,
  Cog,
  Files,
  FileStack,
  RefreshCcwDot,
} from "lucide-react";

const Awardee = () => {
  const menuItems = [
    {
      icon: <Files size={17} />,
      label: "Solicitudes",
      content: <ViewRequests />,
    },
    {
      icon: <RefreshCcwDot size={17} />,
      label: "Gestión de resoluciones",
      content: <ViewProcessManagement />,
    },
    {
      icon: <Cog size={17} />,
      label: "Gestión de soporte",
      content: <ViewSupportManagement />,
    },
    {
      icon: <CalendarPlus size={17} />,
      label: "Creación de eventos",
      content: <ViewCreationEvents />,
    },
    {
      icon: <BookText size={17} />,
      label: "Reportes",
      content: <ViewReport />,
    },
    {
      icon: <FileStack size={17} />,
      label: "Histórico de resoluciones",
      content: <ViewHistory />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Awardee;
