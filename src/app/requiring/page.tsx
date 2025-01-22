import { Dashboard } from "@/components";
import {
  ArrowLeftRight,
  BarChart2,
  Briefcase,
  Clock,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";

export default function PerfilRequirentes() {
  const menuItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Invoices",
      href: "/invoices",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Cards",
      href: "/cards",
    },
    {
      icon: <ArrowLeftRight className="h-5 w-5" />,
      label: "Transaction",
      href: "/transaction",
      active: true,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
}
