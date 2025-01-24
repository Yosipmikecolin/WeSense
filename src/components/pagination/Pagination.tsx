import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

const Pagination = () => {
  return (
    <PaginationUI className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="secondary"
            className="bg-black text-white hover:bg-gray-800 gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            Atras
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="secondary"
            className="bg-black text-white hover:bg-gray-800 gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            Siguiente
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
};

export default Pagination;
