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
    numeroExpediente: "123/2023",
    fechaRecepcion: "2023-05-15",
    tipoDocumento: "Sentencia",
    contenidoDocumento: "Resumen del contenido...",
  },
];

const ReceptionTable = () => {
  return (
    <Table>
      <TableCaption>
        Lista de Recepciones de Sentencias y Resoluciones Judiciales
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
        {data.map((item) => (
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
