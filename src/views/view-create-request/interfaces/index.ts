export interface FormData {
    step1: Step1Data;
    step2: Step2Data;
    step3: Step3Data;
    step4: Step3Data;
  }
  
  export interface Step1Data {
    nombreCompleto: string;
    nombreSocial: string;
    run: string;
    sexo: string;
    genero: string;
    fechaNacimiento: string;
    estadoCivil: string;
    nacionalidad: string;
    telefono: string;
  }
  
  export interface Step2Data {
    tipoPena: string;
    corteApelaciones: string;
    regionTribunal: string;
    tribunal: string;
    ruc: string;
    rit: string;
    rol: string;
  }
  
  export interface Step3Data {
    crs: string;
    areas: string;
    duracionMedida: string;
    horarioControl: string;
    periodoEfectivo: string;
    solicitudesFactibilidad: string;
    sentencia: string;
    programacionesInstalacion: string;
    instalacionesRealizadas: string;
    resolucionesModificacion: string;
    soportesTecnicos: string;
    informesIncumplimiento: string;
    diasControl: string;
    desinstalaciones: string;
  }
  
  export interface StepProps {
    data: Step1Data | Step2Data | Step3Data;
    updateData: (data: Step1Data | Step2Data | Step3Data) => void;
    setCompleteForm: (complete: boolean) => void;
  }
  
  export interface TimelineProps {
    steps: string[];
    currentStep: number;
  }
  