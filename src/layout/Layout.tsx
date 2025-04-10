"use client";

import { Toaster } from "react-hot-toast";
import { ReactNode, useEffect } from "react";
import { users } from "@/utils";
import { addUser } from "@/db/user";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  useEffect(() => {
    const insertarUsuarios = async () => {
      for (const user of users) {
        await addUser(user);
      }
    };

    insertarUsuarios();
  }, []);

  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default Layout;
