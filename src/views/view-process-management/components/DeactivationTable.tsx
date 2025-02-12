import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    id: 1,
    idDispositivo: "BRZ-12345",
    fechaDesactivacion: "2023-05-25",
    motivoDesactivacion: "Fin de Condena",
    estadoDispositivo: "Funcional",
    observaciones: "Dispositivo devuelto en buen estado",
  },
];

const DeactivationTable = () => {
  return (
    <Table>
      <TableCaption>Lista de Desactivaciones de Dispositivos</TableCaption>
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
        {data.map((item) => (
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
