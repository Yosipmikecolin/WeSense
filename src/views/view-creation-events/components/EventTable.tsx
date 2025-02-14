import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components";

const events = [
  {
    id: 1,
    type: "Error",
    date: "2023-05-01",
    note: "Sistema caído",
    user: "Juan Pérez",
  },
  {
    id: 2,
    type: "Advertencia",
    date: "2023-05-02",
    note: "Rendimiento lento",
    user: "María García",
  },
  {
    id: 3,
    type: "Información",
    date: "2023-05-03",
    note: "Actualización completada",
    user: "Carlos Rodríguez",
  },
  // Add more mock data to demonstrate scrolling
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 4,
    type: "Evento",
    date: `2023-05-${String(i + 4).padStart(2, "0")}`,
    note: `Nota de ejemplo ${i + 4}`,
    user: "Usuario de Prueba",
  })),
];

export default function EventTable() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Incidencias registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-bold text-gray-600">
                    TIPO DE EVENTO
                  </TableHead>
                  <TableHead className="text-xs font-bold text-gray-600">
                    FECHA
                  </TableHead>
                  <TableHead className="text-xs font-bold text-gray-600">
                    NOTA
                  </TableHead>
                  <TableHead className="text-xs font-bold text-gray-600">
                    USUARIO
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.type}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.note}</TableCell>
                    <TableCell>{event.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Pagination />
    </div>
  );
}
