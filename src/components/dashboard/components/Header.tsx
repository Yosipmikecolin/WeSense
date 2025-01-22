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

      default:
        return "Perfil no autorizado";
    }
  };

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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-green-500">
                {profile(email || "")}
              </span>
              <span className="text-xs text-gray-500">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
