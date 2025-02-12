import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data2 } from "../data";
import { Pagination } from "@/components";

const InstallationTable = () => {
  return (
    <Table>
      <TableCaption>
        <Pagination />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Estado del Dispositivo</TableHead>
          <TableHead>Lugar de Instalación</TableHead>
          <TableHead>Tipo de Dispositivo</TableHead>
          <TableHead>Número de Serie</TableHead>
          <TableHead>Fecha de Instalación</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data2.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.estadoDispositivo}</TableCell>
            <TableCell>{item.lugarInstalacion}</TableCell>
            <TableCell>{item.tipoDispositivo}</TableCell>
            <TableCell>{item.numeroSerie}</TableCell>
            <TableCell>{item.fechaInstalacion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InstallationTable;
