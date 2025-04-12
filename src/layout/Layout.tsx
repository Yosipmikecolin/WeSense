"use client";

import { Toaster } from "react-hot-toast";
import { ReactNode, useEffect } from "react";
import { users, requesters, carriers } from "@/utils";
import { addUser } from "@/db/user";
import { addRequester } from "@/db/requester";
import { addCarrier } from "@/db/carrier";

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
      for (const requester of requesters) {
        await addRequester(requester);
      }
    };

    const insertCarrier = async () => {
      for (const carrier of carriers) {
        await addCarrier(carrier);
      }
    };

    insertUsers();
    insertRequest();
    insertCarrier();
  }, []);

  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default Layout;
