import { carrierFields } from "@/constants/carrierFields";
import { Carrier } from "@/interfaces";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

export const generatePDF = (selectedCarrier: Carrier) => {
  const doc = new jsPDF();

  // 🎨 Encabezado
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 0, 210, 20, "F");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(`Portador ${selectedCarrier.fullName}`, 105, 12, {
    align: "center",
  });

  // 🗂️ Secciones de datos

  let y = 30; // Posición inicial en el documento

  carrierFields.forEach(({ title, fields }) => {
    // 📌 Agregar título de la sección
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(34, 197, 94);
    doc.text(title, 15, y);
    y += 8;

    // 📌 Agregar campos de la sección
    fields.forEach(({ key, label }, index) => {
      const value = selectedCarrier[key as keyof Carrier] || "N/A";

      // Fondo alternado en filas
      if (index % 2 === 0) {
        doc.setFillColor(240, 253, 244);
        doc.rect(10, y - 6, 190, 8, "F");
      }

      // Etiqueta
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text(`${label}:`, 15, y);

      // Valor
      doc.setFont("helvetica", "normal");
      doc.text(value.toString(), 80, y);

      y += 10; // Espaciado entre filas
    });

    y += 5; // Espaciado extra entre secciones
  });

  // 🎨 Footer
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 280, 210, 20, "F");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Generado con SGAMGC", 105, 289, { align: "center" });

  const nameFile = selectedCarrier.fullName.split(" ").join("_").toLowerCase();
  doc.save(`detalles_${nameFile}.pdf`);
};

export const generateWord = (selectedCarrier: Carrier) => {
  const sections = carrierFields.map((section) => {
    const tableRows = section.fields.map((field) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: field.label,
                    bold: true,
                    font: "Arial",
                    size: 24,
                  }),
                ],
              }),
            ],
            shading: { fill: "F0FDF4" },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: selectedCarrier[field.key] || "-",
                    font: "Arial",
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    });

    // Add extra spacing or a page break before "CAUSA" and "MONITOREO" sections
    const isCauseOrMonitoring =
      section.title === "Datos Personales" ||
      section.title === "Causa" ||
      section.title === "Monitoreo";
    const spacingBefore = isCauseOrMonitoring ? { before: 100 } : {}; // 600 twips = 0.5 inches of spacing
    // Alternatively, you can use a page break instead of spacing:
    // const pageBreakBefore = isCauseOrMonitoring ? [new Paragraph({ children: [], pageBreakBefore: true })] : [];

    return [
      ...(isCauseOrMonitoring
        ? [
            new Paragraph({
              children: [],
              spacing: { before: 100 }, // Adds spacing before the title
            }),
          ]
        : []),
      new Paragraph({
        children: [
          new TextRun({
            text: section.title,
            bold: true,
            font: "Arial",
            size: 28,
            color: "FFFFFF",
          }),
        ],
        shading: { fill: "22C55E" },
        alignment: AlignmentType.CENTER,
        spacing: { after: 200, ...spacingBefore },
      }),
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Campo",
                        bold: true,
                        font: "Arial",
                        size: 26,
                        color: "FFFFFF",
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
                        bold: true,
                        font: "Arial",
                        size: 26,
                        color: "FFFFFF",
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
        width: { size: 100, type: WidthType.PERCENTAGE },
      }),
    ];
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `Portador ${selectedCarrier.fullName}`,
                bold: true,
                font: "Arial",
                size: 36,
                color: "FFFFFF",
              }),
            ],
            alignment: AlignmentType.CENTER,
            shading: { fill: "22C55E" },
            spacing: { after: 300 },
          }),
          ...sections.flat(),
          new Paragraph({
            children: [
              new TextRun({
                text: "Generado con SGAMGC",
                italics: true,
                font: "Arial",
                size: 20,
                color: "AAAAAA",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 300 },
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const nameFile = selectedCarrier.fullName
      .split(" ")
      .join("_")
      .toLowerCase();
    saveAs(blob, `detalles_${nameFile}.docx`);
  });
};
