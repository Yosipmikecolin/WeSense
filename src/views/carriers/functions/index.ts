import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

export const generatePDF = (selectedCarrier: {
  id: number;
  fullName: string;
  socialName: string;
  nationality: string;
  maritalStatus: string;
  countryCode: string;
  gender: string;
  run: string;
  phone: string;
}) => {
  const doc = new jsPDF();

  //ENCABEZADO
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 0, 210, 20, "F");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(`Portador ${selectedCarrier.fullName}`, 105, 12, {
    align: "center",
  });

  // CUERPO
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Negro
  const details = [
    { label: "Nombre social", value: selectedCarrier.socialName },
    { label: "Género", value: selectedCarrier.gender },
    { label: "Nacionalidad", value: selectedCarrier.nationality },
    { label: "Estado civil", value: selectedCarrier.maritalStatus },
    { label: "RUN", value: selectedCarrier.run },
    { label: "Teléfono", value: selectedCarrier.phone },
  ];

  let y = 30; // Coordenada Y inicial
  details.forEach((detail, index) => {
    // Fondo alternado para filas
    if (index % 2 === 0) {
      doc.setFillColor(240, 253, 244);
      doc.rect(10, y - 8, 190, 10, "F");
    }

    // TEXTO
    doc.setTextColor(51, 51, 51);
    doc.setFont("helvetica", "bold");
    doc.text(`${detail.label}:`, 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(detail.value, 80, y);

    y += 12; // Espaciado entre filas
  });

  //FOOTER
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 280, 210, 20, "F");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Generado con SGAMGC", 105, 289, { align: "center" });

  const nameFile = selectedCarrier.fullName.split(" ").join("_").toLowerCase();
  doc.save(`detalles_${nameFile}.pdf`);
};

export const generateWord = (selectedCarrier: {
  id: number;
  fullName: string;
  socialName: string;
  nationality: string;
  maritalStatus: string;
  countryCode: string;
  gender: string;
  run: string;
  phone: string;
}) => {
  // Información personal
  const details = [
    { label: "Nombre social", value: selectedCarrier.socialName },
    { label: "Género", value: selectedCarrier.gender },
    { label: "Nacionalidad", value: selectedCarrier.nationality },
    { label: "Estado civil", value: selectedCarrier.maritalStatus },
    { label: "RUN", value: selectedCarrier.run },
    { label: "Teléfono", value: selectedCarrier.phone },
  ];

  // Filas de la tabla
  const tableRows = details.map((detail, index) => {
    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  font: "Arial",
                  text: detail.label,
                  bold: true,
                  size: 24, // Tamaño de texto más grande
                }),
              ],
            }),
          ],
          shading: {
            fill: index % 2 === 0 ? "F0FDF4" : "FFFFFF",
          },
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  font: "Arial",
                  text: detail.value,
                  size: 24, // Tamaño de texto más grande
                }),
              ],
            }),
          ],
        }),
      ],
    });
  });

  // Documento Word
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Título
          new Paragraph({
            children: [
              new TextRun({
                text: `Portador ${selectedCarrier.fullName}`,
                bold: true,
                font: "Arial",
                color: "FFFFFF", // Color blanco
                size: 36, // Tamaño grande para el título
              }),
            ],
            heading: "Heading1",
            alignment: AlignmentType.CENTER,
            shading: { fill: "22C55E" },
            spacing: { after: 300 },
          }),

          // Tabla de detalles
          new Table({
            rows: [
              // Encabezados de tabla
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Campo",
                            font: "Arial",
                            bold: true,
                            color: "FFFFFF",
                            size: 26,
                          }),
                        ],
                      }),
                    ],
                    shading: { fill: "22C55E" },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Valor",
                            font: "Arial",
                            bold: true,
                            color: "FFFFFF",
                            size: 26, // Tamaño mayor para encabezado
                          }),
                        ],
                      }),
                    ],
                    shading: { fill: "22C55E" },
                  }),
                ],
              }),
              ...tableRows,
            ],
            width: { size: 100, type: "pct" },
          }),

          // Pie de página
          new Paragraph({
            children: [
              new TextRun({
                font: "Arial",
                text: "Generado con SGAMGC",
                color: "AAAAAA", // Gris claro
                italics: true,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 300 },
          }),
        ],
      },
    ],
  });

  // Generar y descargar el archivo Word
  Packer.toBlob(doc).then((blob) => {
    const nameFile = selectedCarrier.fullName
      .split(" ")
      .join("_")
      .toLowerCase();
    saveAs(blob, `detalles_${nameFile}.docx`);
  });
};
