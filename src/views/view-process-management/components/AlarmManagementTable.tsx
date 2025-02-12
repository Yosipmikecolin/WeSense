import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data4 } from "../data";
import { Pagination } from "@/components";

const AlarmManagementTable = () => {
  return (
    <Table>
      <TableCaption>
        <Pagination />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID de Alarma</TableHead>
          <TableHead>Fecha y Hora</TableHead>
          <TableHead>Tipo de Alarma</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Acción Tomada</TableHead>
          <TableHead>Estado de Resolución</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data4.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.idAlarma}</TableCell>
            <TableCell>{item.fechaHoraAlarma}</TableCell>
            <TableCell>{item.tipoAlarma}</TableCell>
            <TableCell>{item.descripcionAlarma}</TableCell>
            <TableCell>{item.accionTomada}</TableCell>
            <TableCell>{item.estadoResolucion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AlarmManagementTable;
