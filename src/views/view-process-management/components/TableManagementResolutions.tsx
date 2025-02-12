import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data3 } from "../data";
import { Pagination } from "@/components";

const TableManagementResolutions = () => {
  return (
    <Table>
      <TableCaption>
        <Pagination />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Número de Resolución</TableHead>
          <TableHead>Fecha de Emisión</TableHead>
          <TableHead>Tipo de Resolución</TableHead>
          <TableHead>Contenido de la Resolución</TableHead>
          <TableHead>Estado de Implementación</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data3.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.numeroResolucion}</TableCell>
            <TableCell>{item.fechaEmision}</TableCell>
            <TableCell>{item.tipoResolucion}</TableCell>
            <TableCell>{item.contenidoResolucion}</TableCell>
            <TableCell>{item.estadoImplementacion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableManagementResolutions;
