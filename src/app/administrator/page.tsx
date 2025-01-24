import { Dashboard } from "@/components";
import { UserPlus, UserRoundSearch, Users, Users2 } from "lucide-react";
import {
  ViewCarries,
  ViewCreateCarrier,
  ViewCreateRequester,
  ViewRequester,
  ViewUsers,
} from "@/views";

const Admin = () => {
  const menuItems = [
    {
      icon: <Users2 size={17} />,
      label: "Usuarios",
      content: <ViewUsers />,
    },
    {
      icon: <Users size={17} />,
      label: "Portadores",
      content: <ViewCarries />,
    },
    {
      icon: <UserPlus size={17} />,
      label: "Crear portador",
      content: <ViewCreateCarrier />,
    },
    {
      icon: <UserRoundSearch size={17} />,
      label: "Requirentes",
      content: <ViewRequester />,
    },
    {
      icon: <UserPlus size={17} />,
      label: "Crear requirente",
      content: <ViewCreateRequester />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Admin;
