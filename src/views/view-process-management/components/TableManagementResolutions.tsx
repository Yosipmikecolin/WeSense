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
    numeroResolucion: "RES-2023-001",
    fechaEmision: "2023-05-22",
    tipoResolucion: "Modificación de condiciones",
    contenidoResolucion: "Resumen del contenido...",
    estadoImplementacion: "En Proceso",
  },
];

const TableManagementResolutions = () => {
  return (
    <Table>
      <TableCaption>Lista de Resoluciones Judiciales</TableCaption>
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
        {data.map((item) => (
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
