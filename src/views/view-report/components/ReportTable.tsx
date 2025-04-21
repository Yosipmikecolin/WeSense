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
  {
    id: 1,
    name: "Solicitudes de factibilidad técnica",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F01_Solicitud%2Bde%2Bfactibilidad%2Btecnica.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 2,
    name: "Instalaciones realizadas por CRS",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F02_Instalaciones%2Brealizadas%2Bpor%2BCRS.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 3,
    name: "Dispositivos de víctima entregados",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F03_Dispositivos%2Bde%2Bvictima%2Bentregados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 4,
    name: "Desinstalaciones realizadas por CRS",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F04_Desinstalaciones%2Brealizadas%2Bpor%2BCRS.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 5,
    name: "Solicitudes de retiro de medida",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F09_Total%2Bde%2Bsoportes%2Btecnicos%2Brealizados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 6,
    name: "Medidas retiradas por CRS",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F10_Total%2Bde%2Binstalaciones%2Bagendadas.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 7,
    name: "Reasignaciones por novedad",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F11_Total%2Bde%2Bdesinstalaciones%2Bagendadas.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 8,
    name: "Instalaciones por perfilamiento",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F12_Total%2Bde%2Bsoportes%2Btecnicos%2Bagendados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 9,
    name: "Medidas activas",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F13_Total%2Bde%2Bentrega%2Bde%2Bdispositivos%2Ba%2Bv%25C3%25ADctimas%2Bagendados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 10,
    name: "Medidas inactivas",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F14_Total%2Bde%2Bprocesos%2Bno%2Brealizados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 11,
    name: "Medidas que superan los 180 días",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2FProtocolo%2BAlarmas%2Bv1.xlsx&wdOrigin=BROWSELINK",
  },
];

export default function ReportsTable() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <CardTitle className="mb-4 text-lg">Reportes</CardTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Descargar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.name}</TableCell>
                <TableCell className="text-right">
                  <a
                    href={report.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <FileDown size={16} />
                      Descargar
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Pagination />
        </div>
      </CardContent>
    </Card>
  );
}
