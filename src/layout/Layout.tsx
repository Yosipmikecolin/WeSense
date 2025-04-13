"use client";

import { Toaster } from "react-hot-toast";
import { ReactNode, useEffect } from "react";
import { requesters, carriers } from "@/utils";
import { addRequester } from "@/db/requester";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const queryClient = new QueryClient();
  useEffect(() => {
    const insertRequest = async () => {
      for (const requester of requesters) {
        await addRequester(requester);
      }
    };

    insertRequest();
  }, []);

  return (
    <div>
      <Toaster />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
};

export default Layout;
