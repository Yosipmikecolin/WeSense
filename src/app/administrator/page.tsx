import { Dashboard } from "@/components";
import { Carries, CreateCarrier, Profiles } from "@/views";
import { UserPlus, Users, Users2 } from "lucide-react";

const Admin = () => {
  const menuItems = [
    {
      icon: <Users2 size={17} />,
      label: "Usuarios",
      content: <Profiles />,
    },
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

export default Admin;
