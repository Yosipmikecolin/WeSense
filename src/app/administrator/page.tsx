import { Dashboard } from "@/components";
import { ViewCarries, ViewCreateCarrier, ViewUsers } from "@/views";
import { UserPlus, Users, Users2 } from "lucide-react";

const Admin = () => {
  const menuItems = [
    {
      icon: <Users2 size={17} />,
      label: "Usuarios",
      content: <ViewUsers />,
    },
    {
      icon: <UserPlus size={17} />,
      label: "Crear portador",
      content: <ViewCreateCarrier />,
    },

    {
      icon: <Users size={17} />,
      label: "Portadores",
      content: <ViewCarries />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Admin;
