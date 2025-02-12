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
    idTicket: "TIC-2023-001",
    fechaApertura: "2023-05-24",
    tipoProblema: "Problema de Hardware",
    descripcionProblema: "El dispositivo no enciende",
    accionesTomadas: "Se realizó un diagnóstico remoto",
    estadoTicket: "En Proceso",
  },
];

const TechnicalSupportTable = () => {
  return (
    <Table>
      <TableCaption>Lista de Tickets de Soporte Técnico</TableCaption>
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
        {data.map((item) => (
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
