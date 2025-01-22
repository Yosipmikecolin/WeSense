import { Dashboard } from "@/components";
import { ArrowLeftRight, CreditCard, FileText, Users2 } from "lucide-react";
import Users from "./views/users/Users";

const Admin = () => {
  const menuItems = [
    {
      icon: <Users2 size={17} />,
      label: "Perfiles",
      content: <Users />,
    },
    {
      icon: <ArrowLeftRight size={17} />,
      label: "Solicitudes",
      content: <Users />,
    },
    {
      icon: <CreditCard size={17} />,
      label: "Reportes",
      content: <Users />,
    },
    {
      icon: <FileText size={17} />,
      label: "Documentos",
      content: <Users />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Admin;
