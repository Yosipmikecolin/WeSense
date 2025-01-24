"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Filter } from "lucide-react";

interface DropdownFilterProps {
  filters: { id: number; name: string }[];
  idFilter: number;
  setIdFilter: Dispatch<SetStateAction<number>>;
}

const DropdownFilter = ({
  filters,
  idFilter,
  setIdFilter,
}: DropdownFilterProps) => {
  const selectFilter = (id: number) => {
    setIdFilter(id);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="bg-black text-white hover:bg-gray-800 gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filters.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.id}
            checked={item.id === idFilter}
            onCheckedChange={() => selectFilter(item.id)}
          >
            {item.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownFilter;
