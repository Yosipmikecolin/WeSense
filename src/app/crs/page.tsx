import { Dashboard } from "@/components";
import { TableCrs } from "@/views/view-requests/components/tables/TableCrs";
import { ClipboardPenLine } from "lucide-react";

const Crs = () => {
  const menuItems = [
    {
      icon: <ClipboardPenLine size={17} />,
      label: "Resoluciones",
      content: <TableCrs />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Crs;
