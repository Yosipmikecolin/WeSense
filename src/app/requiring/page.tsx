import { Dashboard } from "@/components";
import { ViewCarries, ViewCreateRequest } from "@/views";
import { FileInput, Files } from "lucide-react";

const ProfileRequirers = () => {
  const menuItems = [
    {
      icon: <FileInput size={17} />,
      label: "Crear solicitud",
      content: <ViewCreateRequest />,
    },

    {
      icon: <Files size={17} />,
      label: "Solicitudes",
      content: <ViewCarries />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default ProfileRequirers;
