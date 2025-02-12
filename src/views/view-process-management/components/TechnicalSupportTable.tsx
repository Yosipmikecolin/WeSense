import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data5 } from "../data";
import { Pagination } from "@/components";

const TechnicalSupportTable = () => {
  return (
    <Table>
      <TableCaption>
        <Pagination />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID de Ticket</TableHead>
          <TableHead>Fecha de Apertura</TableHead>
          <TableHead>Tipo de Problema</TableHead>
          <TableHead>Descripción del Problema</TableHead>
          <TableHead>Acciones Tomadas</TableHead>
          <TableHead>Estado del Ticket</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data5.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.idTicket}</TableCell>
            <TableCell>{item.fechaApertura}</TableCell>
            <TableCell>{item.tipoProblema}</TableCell>
            <TableCell>{item.descripcionProblema}</TableCell>
            <TableCell>{item.accionesTomadas}</TableCell>
            <TableCell>{item.estadoTicket}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TechnicalSupportTable;
