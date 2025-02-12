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
    estadoDispositivo: "Nuevo",
    lugarInstalacion: "Domicilio del usuario",
    tipoDispositivo: "Tobillera",
    numeroSerie: "BRZ-12345",
    fechaInstalacion: "2023-05-20",
  },
];

const InstallationTable = () => {
  return (
    <Table>
      <TableCaption>Lista de Instalaciones de Dispositivos</TableCaption>
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
        {data.map((item) => (
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
