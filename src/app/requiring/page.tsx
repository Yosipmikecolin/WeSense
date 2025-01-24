import { Dashboard } from "@/components";
import { ViewCarries, ViewCreateCarrier } from "@/views";
import { UserPlus, Users } from "lucide-react";

export default function PerfilRequirentes() {
  const menuItems = [
    {
      icon: <UserPlus size={17} />,
      label: "Consultar portador",
      content: <ViewCreateCarrier />,
    },

    {
      icon: <Users size={17} />,
      label: "Portadores",
      content: <ViewCarries />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
}
