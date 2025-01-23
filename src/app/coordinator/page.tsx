import { Dashboard } from "@/components";
import { UserPlus, Users } from "lucide-react";
import { Carries, CreateCarrier } from "@/views";

const Koordinator = () => {
  const menuItems = [
    {
      icon: <UserPlus size={17} />,
      label: "Crear portador",
      content: <CreateCarrier />,
    },

    {
      icon: <Users size={17} />,
      label: "Portadores",
      content: <Carries />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Koordinator;
