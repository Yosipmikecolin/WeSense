import { Dashboard } from "@/components";
import { ViewRequests } from "@/views";
import { BookText, CalendarPlus, Files, RefreshCcwDot } from "lucide-react";

const Contract = () => {
  const menuItems = [
    {
      icon: <Files size={17} />,
      label: "Crear contrato",
      content: <ViewRequests />,
    },

    {
      icon: <Files size={17} />,
      label: "Gestionar contrato",
      content: <ViewRequests />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Contract;
