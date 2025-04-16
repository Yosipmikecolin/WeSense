import { Dashboard } from "@/components";
import {
  BriefcaseBusiness,
  FileInput,
  Files,
  Link,
  Unlink,
  UserPlus,
  UserRoundPlus,
  Users,
  Users2,
} from "lucide-react";
import {
  ViewCarries,
  ViewCreateCarrier,
  ViewCreateRequest,
  ViewCreateRequester,
  ViewCreateUser,
  ViewRequester,
  ViewRequests,
  ViewUsers,
  ViewWorkload,
} from "@/views";

const Admin = () => {
  const menuItems = [
    {
      icon: <Users2 size={17} />,
      label: "Usuarios",
      content: <ViewUsers />,
    },
    {
      icon: <UserRoundPlus size={17} />,
      label: "Crear usuario",
      content: <ViewCreateUser />,
    },
    {
      icon: <Link size={17} />,
      label: "Persona SC",
      content: <ViewCarries />,
    },
    {
      icon: <Unlink size={17} />,
      label: "Crear portador",
      content: <ViewCreateCarrier />,
    },
    {
      icon: <Users size={17} />,
      label: "Requirentes",
      content: <ViewRequester />,
    },
    {
      icon: <UserPlus size={17} />,
      label: "Crear requirente",
      content: <ViewCreateRequester />,
    },
    {
      icon: <Files size={17} />,
      label: "Solicitudes",
      content: <ViewRequests />,
    },
    {
      icon: <FileInput size={17} />,
      label: "Crear solicitud",
      content: <ViewCreateRequest />,
    },
    {
      icon: <BriefcaseBusiness size={17} />,
      label: "Carga laboral",
      content: <ViewWorkload />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Admin;
