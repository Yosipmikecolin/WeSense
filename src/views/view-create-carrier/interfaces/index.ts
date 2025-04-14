export interface FormDataCarrier {
  _id: string;
  personalData: Step1Data;
  cause: Step2Data;
  monitoring: Step3Data;
  inclusionArea: Step4Data;
  exclusionArea: Step5Data;
  wearer: Step6Data;
}

export interface Step1Data {
  fullName: string;
  socialName: string;
  paternalSurname: string;
  motherSurname: string;
  type_current: string;
  gender: string;
  dateBirth: string;
  maritalStatus: string;
  nationality: string;
  run: string;
  phone: string;
  foreigner: boolean;
}

export interface Step2Data {
  penatype: string;
  crime: string;
  courtAppeals: string;
  courtRegion: string;
  court: string;
  ruc: string;
  rit: string;
  rol: string;
}

export interface Step3Data {
  crs: string;
  areas: string;
  durationMeasurement: string;
  controlSchedule: string;
  effectivePeriod: string;
  requestsFeasibility: string;
  judgment: string;
  programmingInstallation: string;
  installationsDone: string;
  modificationResolution: string;
  technicalSupports: string;
  nonReports: string;
  daysControl: string;
  uninstallations: string;
}

export interface Step4Data {
  street: string;
  number: string;
  additionalInformation: string;
  commune: string;
  region: string;
  road: string;
  population: string;
  zipCode: string;
  geographicCoordinates: string;
  radio: string;
  complianceSchedule: string;
  characteristics: string;
}

export interface Step5Data {
  street: string;
  number: string;
  additionalInformation: string;
  commune: string;
  region: string;
  road: string;
  population: string;
  zipCode: string;
  geographicCoordinates: string;
  radio: string;
  characteristics: string;
  paternalSurname: string;
  motherSurname: string;
  names: string;
  rut: string;
  victimEmail: string;
  homeTelephone: string;
  workplaceTelephone: string;
}

export interface Step6Data {
  group_id: string;
  first_name: string;
  surname: string;
  ref: string;
  email: string;
  notes?: string;
  start_tagging_time: string;
  end_tagging_time: string;
  device_profile_id: string;
  device_profile_sb_id?: string;
  device_profile_name: string;
  timezone_id: string;
  wearer_type_id: string;
  address_name: string;
  line_1: string;
  line_2: string;
  line_3: string;
  city: string;
  county: string;
  postcode: string;
  address_type_id: string;
  telephone: string;
  interpretor_required: string;
  size_id?: string;
  responsible_officer_id: string;
  country_id: string;
  risk_level_id?: string;
  lat: string;
  lon: string;
}

export interface StepProps1 {
  formData: Step1Data;
  setFormData: (data: Step1Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps2 {
  formData: Step2Data;
  setFormData: (data: Step2Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps3 {
  formData: Step3Data;
  setFormData: (data: Step3Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps4 {
  formData: Step4Data;
  setFormData: (data: Step4Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps5 {
  formData: Step5Data;
  setFormData: (data: Step5Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps6 {
  formData: Step6Data;
  setFormData: (data: Step6Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface TimelineProps {
  steps: string[];
  currentStep: number;
}
