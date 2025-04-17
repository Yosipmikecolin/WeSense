import {
  FormDataCarrier,
  FormDataWearer,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from "@/views/view-create-carrier/interfaces";
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

export const generatePDF = (selectedCarrier: FormDataWearer) => {
  const doc = new jsPDF();

  // 🎨 Encabezado
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 0, 210, 20, "F");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("Informe de factibilidad técnica", 105, 12, {
    align: "center",
  });

  // 🗂️ Definición de secciones y sus campos
  const sections: {
    title: string;
    data: Step1Data | Step2Data | Step3Data | Step4Data | Step5Data | Step6Data;
    fields: { key: string; label: string }[];
  }[] = [
    {
      title: "Información Personal",
      data: selectedCarrier.personalData,
      fields: [
        { key: "fullName", label: "Nombre Completo" },
        { key: "socialName", label: "Nombre Social" },
        { key: "paternalSurname", label: "Apellido Paterno" },
        { key: "motherSurname", label: "Apellido Materno" },
        { key: "type_current", label: "Tipo Actual" },
        { key: "gender", label: "Género" },
        { key: "dateBirth", label: "Fecha de Nacimiento" },
        { key: "maritalStatus", label: "Estado Civil" },
        { key: "nationality", label: "Nacionalidad" },
        { key: "run", label: "RUN" },
        { key: "phone", label: "Teléfono" },
        { key: "foreigner", label: "Extranjero" },
      ],
    },
    {
      title: "Causa",
      data: selectedCarrier.cause,
      fields: [
        { key: "penatype", label: "Tipo de Pena" },
        { key: "crime", label: "Delito" },
        { key: "courtAppeals", label: "Corte de Apelaciones" },
        { key: "courtRegion", label: "Región del Tribunal" },
        { key: "court", label: "Tribunal" },
        { key: "ruc", label: "RUC" },
        { key: "rit", label: "RIT" },
        { key: "rol", label: "ROL" },
      ],
    },
    {
      title: "Monitoreo",
      data: selectedCarrier.monitoring,
      fields: [
        { key: "crs", label: "CRS" },
        { key: "areas", label: "Áreas" },
        { key: "durationMeasurement", label: "Medida de Duración" },
        { key: "controlSchedule", label: "Horario de Control" },
        { key: "effectivePeriod", label: "Período Efectivo" },
        { key: "requestsFeasibility", label: "Solicitudes de Viabilidad" },
        { key: "judgment", label: "Juicio" },
        {
          key: "programmingInstallation",
          label: "Programación de Instalación",
        },
        { key: "installationsDone", label: "Instalaciones Realizadas" },
        { key: "modificationResolution", label: "Resolución de Modificación" },
        { key: "technicalSupports", label: "Soportes Técnicos" },
        { key: "nonReports", label: "Reportes No Realizados" },
        { key: "daysControl", label: "Días de Control" },
        { key: "uninstallations", label: "Desinstalaciones" },
      ],
    },
    {
      title: "Área de inclusión",
      data: selectedCarrier.inclusionArea,
      fields: [
        { key: "street", label: "Calle" },
        { key: "number", label: "Número" },
        { key: "additionalInformation", label: "Información Adicional" },
        { key: "commune", label: "Comuna" },
        { key: "region", label: "Región" },
        { key: "road", label: "Camino" },
        { key: "population", label: "Población" },
        { key: "zipCode", label: "Código Postal" },
        { key: "geographicCoordinates", label: "Coordenadas Geográficas" },
        { key: "radio", label: "Radio" },
        { key: "complianceSchedule", label: "Horario de Cumplimiento" },
        { key: "characteristics", label: "Características" },
      ],
    },
    {
      title: "Área de exclusión y Información de Víctima ",
      data: selectedCarrier.exclusionArea,
      fields: [
        { key: "street", label: "Calle" },
        { key: "number", label: "Número" },
        { key: "additionalInformation", label: "Información Adicional" },
        { key: "commune", label: "Comuna" },
        { key: "region", label: "Región" },
        { key: "road", label: "Camino" },
        { key: "population", label: "Población" },
        { key: "zipCode", label: "Código Postal" },
        { key: "geographicCoordinates", label: "Coordenadas Geográficas" },
        { key: "radio", label: "Radio" },
        { key: "characteristics", label: "Características" },
        { key: "paternalSurname", label: "Apellido Paterno" },
        { key: "motherSurname", label: "Apellido Materno" },
        { key: "names", label: "Nombres" },
        { key: "rut", label: "RUT" },
        { key: "victimEmail", label: "Correo de la Víctima" },
        { key: "homeTelephone", label: "Teléfono Domicilio" },
        { key: "workplaceTelephone", label: "Teléfono Trabajo" },
      ],
    },
  ];

  // 🗂️ Generación de secciones
  let y = 30;

  sections.forEach(({ title, data, fields }, sectionIndex) => {
    // Título de la sección
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(34, 197, 94);
    doc.text(title, 15, y);
    y += 8;

    fields.forEach(({ key, label }, index) => {
      // Salto de página si es necesario
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      const value =
        (data as unknown as Record<string, unknown>)?.[key] ?? "N/A";

      // Fondo alternado
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

      y += 10;
    });

    // Espacio entre secciones
    y += 10;

    // Salto de página si es necesario después de la sección
    if (y > 260 && sectionIndex < sections.length - 1) {
      doc.addPage();
      y = 20;
    }
  });

  // 🎨 Footer
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 280, 210, 20, "F");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Generado con SGAMGC", 105, 289, { align: "center" });

  // Guardar el archivo
  const nameFile = selectedCarrier.personalData.fullName
    .split(" ")
    .join("_")
    .toLowerCase();
  doc.save(`Informe_${nameFile}.pdf`);
};

interface Field {
  key: keyof FormDataCarrier; // Unión de todas las claves: "fullName" | "socialName" | "nationality" | etc.
  label: string;
}

interface Section {
  title: string;
  fields: Field[];
}

export const generateWord = (selectedCarrier: FormDataWearer) => {
  // 🗂️ Definición de secciones y sus campos
  const sections = [
    {
      title: "Información Personal",
      data: selectedCarrier.wearer,
      fields: [
        { key: "first_name", label: "Nombres" },
        { key: "surname", label: "Apellidos" },
        { key: "email", label: "Email" },
      ],
    },
    // {
    //   title: "Información Personal",
    //   data: selectedCarrier.personalData,
    //   fields: [
    //     { key: "fullname", label: "Nombre Completo" },
    //     { key: "socialName", label: "Nombre Social" },
    //     { key: "paternalSurname", label: "Apellido Paterno" },
    //     { key: "motherSurname", label: "Apellido Materno" },
    //     { key: "type_current", label: "Tipo Actual" },
    //     { key: "gender", label: "Género" },
    //     { key: "dateBirth", label: "Fecha de Nacimiento" },
    //     { key: "maritalStatus", label: "Estado Civil" },
    //     { key: "nationality", label: "Nacionalidad" },
    //     { key: "run", label: "RUN" },
    //     { key: "phone", label: "Teléfono" },
    //     { key: "foreigner", label: "Extranjero" },
    //   ],
    // },
    // {
    //   title: "Causa",
    //   data: selectedCarrier.cause,
    //   fields: [
    //     { key: "penatype", label: "Tipo de Pena" },
    //     { key: "crime", label: "Delito" },
    //     { key: "courtAppeals", label: "Corte de Apelaciones" },
    //     { key: "courtRegion", label: "Región del Tribunal" },
    //     { key: "court", label: "Tribunal" },
    //     { key: "ruc", label: "RUC" },
    //     { key: "rit", label: "RIT" },
    //     { key: "rol", label: "ROL" },
    //   ],
    // },
    // {
    //   title: "Monitoreo",
    //   data: selectedCarrier.monitoring,
    //   fields: [
    //     { key: "crs", label: "CRS" },
    //     { key: "areas", label: "Áreas" },
    //     { key: "durationMeasurement", label: "Medida de Duración" },
    //     { key: "controlSchedule", label: "Horario de Control" },
    //     { key: "effectivePeriod", label: "Período Efectivo" },
    //     { key: "requestsFeasibility", label: "Solicitudes de Viabilidad" },
    //     { key: "judgment", label: "Juicio" },
    //     {
    //       key: "programmingInstallation",
    //       label: "Programación de Instalación",
    //     },
    //     { key: "installationsDone", label: "Instalaciones Realizadas" },
    //     { key: "modificationResolution", label: "Resolución de Modificación" },
    //     { key: "technicalSupports", label: "Soportes Técnicos" },
    //     { key: "nonReports", label: "Reportes No Realizados" },
    //     { key: "daysControl", label: "Días de Control" },
    //     { key: "uninstallations", label: "Desinstalaciones" },
    //   ],
    // },
    // {
    //   title: "Área de inclusión",
    //   data: selectedCarrier.inclusionArea,
    //   fields: [
    //     { key: "street", label: "Calle" },
    //     { key: "number", label: "Número" },
    //     { key: "additionalInformation", label: "Información Adicional" },
    //     { key: "commune", label: "Comuna" },
    //     { key: "region", label: "Región" },
    //     { key: "road", label: "Camino" },
    //     { key: "population", label: "Población" },
    //     { key: "zipCode", label: "Código Postal" },
    //     { key: "geographicCoordinates", label: "Coordenadas Geográficas" },
    //     { key: "radio", label: "Radio" },
    //     { key: "complianceSchedule", label: "Horario de Cumplimiento" },
    //     { key: "characteristics", label: "Características" },
    //   ],
    // },
    // {
    //   title: "Área de exclusión y Información de Víctima ",
    //   data: selectedCarrier.exclusionArea,
    //   fields: [
    //     { key: "street", label: "Calle" },
    //     { key: "number", label: "Número" },
    //     { key: "additionalInformation", label: "Información Adicional" },
    //     { key: "commune", label: "Comuna" },
    //     { key: "region", label: "Región" },
    //     { key: "road", label: "Camino" },
    //     { key: "population", label: "Población" },
    //     { key: "zipCode", label: "Código Postal" },
    //     { key: "geographicCoordinates", label: "Coordenadas Geográficas" },
    //     { key: "radio", label: "Radio" },
    //     { key: "characteristics", label: "Características" },
    //     { key: "paternalSurname", label: "Apellido Paterno" },
    //     { key: "motherSurname", label: "Apellido Materno" },
    //     { key: "names", label: "Nombres" },
    //     { key: "rut", label: "RUT" },
    //     { key: "victimEmail", label: "Correo de la Víctima" },
    //     { key: "homeTelephone", label: "Teléfono Domicilio" },
    //     { key: "workplaceTelephone", label: "Teléfono Trabajo" },
    //   ],
    // },
  ];

  // 🗂️ Generación de secciones
  const sectionElements = sections.map((section) => {
    // Crear filas de la tabla para los campos
    const tableRows = section.fields.map((field, index) => {
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
            shading: { fill: index % 2 === 0 ? "F0FDF4" : "FFFFFF" }, // Fondo alternado
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text:
                      section.data[field.key as keyof typeof section.data] ??
                      "-",
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

    // Espaciado adicional antes de ciertas secciones
    const isMajorSection = [
      "Información Personal (Paso 1)",
      "Información Legal (Paso 2)",
      "Control y Seguimiento (Paso 3)",
    ].includes(section.title);
    const spacingBefore = isMajorSection ? { before: 600 } : { before: 200 };

    return [
      new Paragraph({
        children: [],
        spacing: spacingBefore,
      }),
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
        spacing: { after: 200 },
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

  // 📄 Crear el documento
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Informe de factibilidad técnica",
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
          ...sectionElements.flat(),
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

  // 💾 Guardar el archivo
  Packer.toBlob(doc).then((blob) => {
    const nameFile = selectedCarrier.wearer.first_name
      .split(" ")
      .join("_")
      .toLowerCase();
    saveAs(blob, `detalles_${nameFile}.docx`);
  });
};
