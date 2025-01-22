"use client";

import { JSX, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Content from "./components/Content";

interface DashboardProps {
  menuItems: {
    label: string;
    icon: JSX.Element;
    content: JSX.Element;
  }[];
}

export default function Dashboard({ menuItems }: DashboardProps) {
  const [view, setView] = useState(menuItems[0].label);

  return (
    <div className="flex h-screen">
      <Sidebar menuItems={menuItems} view={view} setView={setView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <Content view={view} menuItems={menuItems} />
      </div>
    </div>
  );
}
