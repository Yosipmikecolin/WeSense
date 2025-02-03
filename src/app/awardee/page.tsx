import { Dashboard } from "@/components";
import { ViewRequests } from "@/views";
import { Files } from "lucide-react";

const Awardee = () => {
  const menuItems = [
    {
      icon: <Files size={17} />,
      label: "Solicitudes",
      content: <ViewRequests />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Awardee;
