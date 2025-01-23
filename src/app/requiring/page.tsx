import { Dashboard } from "@/components";
import { UserPlus, Users } from "lucide-react";
import CreateCarrier from "../../views/create-carrier/CreateCarrier";
import { Carries } from "@/views";

export default function PerfilRequirentes() {
  const menuItems = [
    {
      icon: <UserPlus size={17} />,
      label: "Consultar portador",
      content: <CreateCarrier />,
    },

    {
      icon: <Users size={17} />,
      label: "Portadores",
      content: <Carries />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
}
