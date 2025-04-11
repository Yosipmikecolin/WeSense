"use client";

import { Toaster } from "react-hot-toast";
import { ReactNode, useEffect } from "react";
import { users, requesters } from "@/utils";
import { addUser } from "@/db/user";
import { addRequest } from "@/db/request";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  useEffect(() => {
    const insertUsers = async () => {
      for (const user of users) {
        await addUser(user);
      }
    };

    const insertRequest = async () => {
      for (const request of requesters) {
        await addRequest(request);
      }
    };

    insertUsers();
    insertRequest();
  }, []);

  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default Layout;
