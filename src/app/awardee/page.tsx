import { Dashboard } from "@/components";
import {
  ViewCreationEvents,
  ViewProcessManagement,
  ViewRequests,
} from "@/views";
import { BookText, CalendarPlus, Files, RefreshCcwDot } from "lucide-react";

const Awardee = () => {
  const menuItems = [
    {
      icon: <Files size={17} />,
      label: "Solicitudes",
      content: <ViewRequests />,
    },
    {
      icon: <RefreshCcwDot size={17} />,
      label: "Gestion de procesos",
      content: <ViewProcessManagement />,
    },
    {
      icon: <CalendarPlus size={17} />,
      label: "Creación de eventos",
      content: <ViewCreationEvents />,
    },
    {
      icon: <BookText size={17} />,
      label: "Reportes",
      content: <div>En desarrollo</div>,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Awardee;
