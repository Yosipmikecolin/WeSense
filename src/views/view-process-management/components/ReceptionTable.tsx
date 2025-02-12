import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data1 } from "../data";
import { Pagination } from "@/components";

const ReceptionTable = () => {
  return (
    <Table>
      <TableCaption>
        <Pagination />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Número de Expediente</TableHead>
          <TableHead>Fecha de Recepción</TableHead>
          <TableHead>Tipo de Documento</TableHead>
          <TableHead>Contenido del Documento</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data1.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.numeroExpediente}</TableCell>
            <TableCell>{item.fechaRecepcion}</TableCell>
            <TableCell>{item.tipoDocumento}</TableCell>
            <TableCell>{item.contenidoDocumento}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReceptionTable;
