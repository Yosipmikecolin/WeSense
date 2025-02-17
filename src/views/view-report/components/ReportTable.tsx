import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components";

interface Report {
  id: number;
  name: string;
  pdfUrl: string;
}

const reports: Report[] = [
  { id: 1, name: "Pantalla principal de reportería con la lista de links de los reportes", pdfUrl: "#" },
  { id: 2, name: "Solicitudes de factibilidad técnica", pdfUrl: "#" },
  { id: 3, name: "Instalaciones realizadas por CRS", pdfUrl: "#" },
  { id: 4, name: "Dispositivos de victima entregados", pdfUrl: "#" },
  { id: 5, name: "Desinstalaciones realizadas por CRS", pdfUrl: "#" },
  { id: 6, name: "Hoja de evolución con el resumen de las actividades ordenadas por fecha", pdfUrl: "#" },
  { id: 7, name: "Otras actividades relevantes", pdfUrl: "#" },
  { id: 8, name: "Solicitudes de factibilidad técnica enviados a requirente", pdfUrl: "#" },
  { id: 9, name: "Solicitudes de factibilidad técnica positivo, negativo y no recomendable", pdfUrl: "#" },
  { id: 10, name: "Solicitudes de factibilidad técnica por cambio de domicilio", pdfUrl: "#" },
  { id: 11, name: "Total de soportes técnicos realizados", pdfUrl: "#" },
  { id: 12, name: "Total de instalaciones agenciadas", pdfUrl: "#" },
  { id: 13, name: "Total de desinstalaciones agenciadas", pdfUrl: "#" },
  { id: 14, name: "Total de desinstalaciones agenciadas", pdfUrl: "#" },
  { id: 15, name: "Total de soportes técnicos agenciados", pdfUrl: "#" },
  { id: 16, name: "Total entrega de dispositivos a víctimas agenciados", pdfUrl: "#" },
  { id: 17, name: "Total procesos no realizados por área", pdfUrl: "#" },
]

const ReportTable: React.FC = () => {
  return (
    <div className="mb-5">
      <CardTitle className="text-3xl font-bold tracking-tight mb-5">
        Reportes
      </CardTitle>
      <div className="w-full flex flex-col gap-4">
        <Card className="w-full shadow-lg py-2">
          <CardContent className="w-full px-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-bold text-gray-600">ID</TableHead>
                  <TableHead className="text-xs font-bold text-gray-600 uppercase">
                    Nombre del Reporte
                  </TableHead>
                  <TableHead className=" text-xs flex justify-end mr-2 font-bold text-gray-600 uppercase">
                    Descargar
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.name}</TableCell>
                    <TableCell className="flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://drive.google.com/file/d/1LJ7vLP96ypdCPJXDIpU6cYSaCSCvj_Z3/view?usp=sharing" download target="_blank">
                          <FileDown className="mr-2 h-4 w-4" />
                          PDF
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Pagination />
      </div>
    </div>
  );
};

export default ReportTable;
