import { Dashboard } from "@/components";
import { ViewRequests } from "@/views";
import { CalendarPlus, Files, LocateFixed } from "lucide-react";

const Awardee = () => {
  const menuItems = [
    {
      icon: <Files size={17} />,
      label: "Solicitudes",
      content: <ViewRequests />,
    },
    {
      icon: <LocateFixed size={17} />,
      label: "Instalación",
      content: <div>En desarrollo</div>,
    },
    {
      icon: <CalendarPlus size={17} />,
      label: "Creación de eventos",
      content: <div>En desarrollo</div>,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Awardee;
