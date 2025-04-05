import { Dashboard } from "@/components";
import { ViewCreateObligations, ViewObligations } from "@/views";
import { FilePlus, FileSearch2 } from "lucide-react";

const Contract = () => {
  const menuItems = [
    {
      icon: <FilePlus size={17} />,
      label: "Crear obligación",
      content: <ViewCreateObligations />,
    },

    {
      icon: <FileSearch2 size={17} />,
      label: "Obligaciones",
      content: <ViewObligations />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Contract;
