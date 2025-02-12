import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data6 } from "../data";
import { Pagination } from "@/components";

const DeactivationTable = () => {
  return (
    <Table>
      <TableCaption>
        <Pagination />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID del Dispositivo</TableHead>
          <TableHead>Fecha de Desactivación</TableHead>
          <TableHead>Motivo de Desactivación</TableHead>
          <TableHead>Estado del Dispositivo</TableHead>
          <TableHead>Observaciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data6.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.idDispositivo}</TableCell>
            <TableCell>{item.fechaDesactivacion}</TableCell>
            <TableCell>{item.motivoDesactivacion}</TableCell>
            <TableCell>{item.estadoDispositivo}</TableCell>
            <TableCell>{item.observaciones}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeactivationTable;
