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
    idAlarma: "ALM-2023-001",
    fechaHoraAlarma: "2023-05-23 14:30",
    tipoAlarma: "Ingreso a Zona Prohibida",
    descripcionAlarma: "El usuario ingresó a una zona restringida",
    accionTomada: "Se notificó a las autoridades",
    estadoResolucion: "Resuelto",
  },
  // Add more sample data here
];

const AlarmManagementTable = () => {
  return (
    <Table>
      <TableCaption>Lista de Alarmas Gestionadas</TableCaption>
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
        {data.map((item) => (
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
