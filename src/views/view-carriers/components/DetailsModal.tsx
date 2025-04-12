import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Flag from "react-world-flags";
import { Download } from "lucide-react";
import { generatePDF, generateWord } from "../functions";
import { FormDataCarrier } from "@/views/view-create-carrier/interfaces";
import { getCountryCode } from "@/functions";

interface Props {
  carrier?: FormDataCarrier;
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ carrier, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="modal sm:max-w-[600px] h-[800px] overflow-auto">
        <DialogClose />
        <DialogHeader className="border-[1.5px] rounded-sm pl-2 pt-2">
          <DialogTitle className="mb-2 text-2xl">
            Detalles del portador
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mt-3">
          <div className="w-full text-left border-collapse">
            <div className="flex gap-5 flex-col">
              <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Datos Personales
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Nombre Completo:</div>
                  <div className="text-end">{carrier?.step1.fullname}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Nombre Social:</div>
                  <div className="text-end">
                    {carrier?.step1.socialName || "No registra"}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Nacionalidad:</div>
                  <div className="text-end flex items-center gap-2">
                    {carrier?.step1.nationality}
                    <Flag
                      width={20}
                      code={getCountryCode(carrier?.step1.nationality || "")}
                    />
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">¿Es estranjero?:</div>
                  <div className="text-end">
                    {carrier?.step1.foreigner ? "Si" : "No"}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Apellido paterno:
                  </div>
                  <div className="text-end">
                    {carrier?.step1.paternalSurname}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Apellido materno:
                  </div>
                  <div className="text-end">{carrier?.step1.motherSurname}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Estado Civil:</div>
                  <div className="text-end">{carrier?.step1.maritalStatus}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Tipo de portador:
                  </div>
                  <div className="text-end">{carrier?.step1.type_current}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Género:</div>
                  <div className="text-end">{carrier?.step1.gender}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">RUN:</div>
                  <div className="text-end">{carrier?.step1.run}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Teléfono:</div>
                  <div className="text-end">{carrier?.step1.phone}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Fecha de Nacimiento: :
                  </div>
                  <div className="text-end">{carrier?.step1.dateBirth}</div>
                </div>
              </div>

              <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Causa
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Tipo de Pena:</div>
                  <div className="text-end">{carrier?.step2.penatype}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Delito:</div>
                  <div className="text-end">{carrier?.step2.crime}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Corte de Apelaciones:
                  </div>
                  <div className="text-end">{carrier?.step2.courtAppeals}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Región Judicial:</div>
                  <div className="text-end">{carrier?.step2.courtRegion}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Tribunal:</div>
                  <div className="text-end">{carrier?.step2.court}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">RUC:</div>
                  <div className="text-end">{carrier?.step2.ruc}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">RIT:</div>
                  <div className="text-end">{carrier?.step2.rit}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">ROL:</div>
                  <div className="text-end">{carrier?.step2.rol}</div>
                </div>
              </div>

              <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Monitoreo
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">CRS:</div>
                  <div className="text-end">{carrier?.step3.crs}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Área de inclusión y exclusión:
                  </div>
                  <div className="text-end">{carrier?.step3.areas}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Duración de la medida:
                  </div>
                  <div className="text-end">
                    {carrier?.step3.durationMeasurement}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Horario de control:
                  </div>
                  <div className="text-end">
                    {carrier?.step3.controlSchedule}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Periodo efectivo de control:
                  </div>
                  <div className="text-end">
                    {carrier?.step3.effectivePeriod}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Solicitudes de Factibilidad Técnica:
                  </div>
                  <div className="text-end">
                    {carrier?.step3.requestsFeasibility}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Sentencia:</div>
                  <div className="text-end">{carrier?.step3.judgment}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Programaciones de Instalación:
                  </div>
                  <div className="text-end">
                    {carrier?.step3.programmingInstallation}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Instalaciones realizadas:
                  </div>
                  <div className="text-end">
                    {carrier?.step3.installationsDone}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Resoluciones judiciales:
                  </div>
                  <div className="text-end">
                    {carrier?.step3.modificationResolution}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Soportes Técnicos Realizados:
                  </div>
                  <div className="text-end">
                    {carrier?.step3.technicalSupports}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Informes de incumplimiento:
                  </div>
                  <div className="text-end">{carrier?.step3.nonReports}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Días efectivos de control:
                  </div>
                  <div className="text-end">{carrier?.step3.daysControl}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Desinstalaciones realizadas:
                  </div>
                  <div className="text-end">
                    {carrier?.step3.uninstallations}
                  </div>
                </div>
              </div>

              <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Área de inclusión
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Calle:</div>
                  <div className="text-end">{carrier?.step4.street}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Número:</div>
                  <div className="text-end">{carrier?.step4.number}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Block/Dpto/Casa:</div>
                  <div className="text-end">
                    {carrier?.step4.additionalInformation}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Comuna:</div>
                  <div className="text-end">{carrier?.step4.commune}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Región:</div>
                  <div className="text-end">{carrier?.step4.region}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Carretera/Ruta/Kilómetro
                  </div>
                  <div className="text-end">{carrier?.step4.road}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Población/Condominio/Villa:
                  </div>
                  <div className="text-end">{carrier?.step4.population}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Código Postal:</div>
                  <div className="text-end">{carrier?.step4.zipCode}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Coordenadas Geográficas:
                  </div>
                  <div className="text-end">
                    {carrier?.step4.geographicCoordinates}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Radio:</div>
                  <div className="text-end">{carrier?.step4.radio}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Horario de Cumplimiento:
                  </div>
                  <div className="text-end">
                    {carrier?.step4.complianceSchedule}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Características del sector:
                  </div>
                  <div className="text-end">
                    {carrier?.step4.characteristics}
                  </div>
                </div>
              </div>
              <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Área de exclusión
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Calle:</div>
                  <div className="text-end">{carrier?.step5.street}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Número:</div>
                  <div className="text-end">{carrier?.step5.number}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Block/Dpto/Casa:</div>
                  <div className="text-end">
                    {carrier?.step5.additionalInformation}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Comuna:</div>
                  <div className="text-end">{carrier?.step5.commune}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Región:</div>
                  <div className="text-end">{carrier?.step5.region}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Carretera/Ruta/Kilómetro
                  </div>
                  <div className="text-end">{carrier?.step5.road}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Población/Condominio/Villa:
                  </div>
                  <div className="text-end">{carrier?.step5.population}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Código Postal:</div>
                  <div className="text-end">{carrier?.step5.zipCode}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Coordenadas Geográficas:
                  </div>
                  <div className="text-end">
                    {carrier?.step5.geographicCoordinates}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Radio:</div>
                  <div className="text-end">{carrier?.step5.radio}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Características del sector:
                  </div>
                  <div className="text-end">
                    {carrier?.step5.characteristics}
                  </div>
                </div>
              </div>
              <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Datos de la víctima
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Apellido Paterno:
                  </div>
                  <div className="text-end">
                    {carrier?.step5.paternalSurname}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Apellido Materno:
                  </div>
                  <div className="text-end">{carrier?.step5.motherSurname}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Nombres:</div>
                  <div className="text-end">{carrier?.step5.names}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">RUT:</div>
                  <div className="text-end">{carrier?.step5.rut}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Región:</div>
                  <div className="text-end">{carrier?.step5.region}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Email Víctima</div>
                  <div className="text-end">{carrier?.step5.victimEmail}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Teléfono Particular:
                  </div>
                  <div className="text-end">{carrier?.step5.homeTelephone}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Teléfono Lugar de Trabajo:
                  </div>
                  <div className="text-end">
                    {carrier?.step5.workplaceTelephone}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => carrier && generatePDF(carrier)}
              className="bg-red-600 text-white hover:bg-red-500 hover:text-white flex"
            >
              PDF
              <Download />
            </Button>
            <Button
              variant="outline"
              onClick={() => carrier && generateWord(carrier)}
              className="bg-blue-600 text-white hover:bg-blue-500 hover:text-white flex"
            >
              WORD
              <Download />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
