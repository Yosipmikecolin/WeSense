import { Button } from "@/components/ui/button";
import axios from "axios";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setEmail(email);
    }
  }, []);

  const profile = (email: string) => {
    switch (email) {
      case "administrator@gmail.com":
        return "Administrador";

      case "requiring@gmail.com":
        return "Requiriente";

      case "coordinator@gmail.com":
        return "Coordinador";

      case "awardee@gmail.com":
        return "Adjudicatorio";

      default:
        return "Perfil no autorizado";
    }
  };

  async function onLogout() {
    const response_logout = await axios.post("/api/buddie", {
      method: "auth.logout",
    });
    console.log("LOGOUT: ", response_logout.data);
  }

  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-end px-6 py-4">
        {/*     <div className="flex items-center flex-1 gap-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input placeholder="Type here to search" className="pl-9" />
          </div>
          <span className="text-gray-400">₣</span>
        </div> */}
        <div className="flex gap-12">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-green-500">
                {profile(email || "")}
              </span>
              <span className="text-xs text-gray-500">{email}</span>
            </div>
            <Link href={"/"}>
              <Button
                onClick={onLogout}
                className="bg-green-100 text-green-600 hover:bg-green-200"
              >
                <LogOut size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
