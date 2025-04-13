import {
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
} from "@/views/view-create-carrier/interfaces";

export interface TimelineProps {
  steps: string[];
  currentStep: number;
}

export interface FormDataRequest {
  id: string;
  applicationDate?: Date;
  requester: {
    id: string;
    applicationDate?: Date;
    fullName: string;
    lastName: string;
    middleName: string;
    email: string;
    ruc: string;
    phone: string;
    userType: string;
    institution: string;
    identificationNumber: string;
    region: string;
    address: string;
    accessAreas: string;
    identityVerification: string;
    securityQuestion: string;
    registrationDate: string;
    observations: string;
  };
  carrier: {
    id: string;
    personalData: Step1Data;
    cause: Step2Data;
    monitoring: Step3Data;
    inclusionArea: Step4Data;
    exclusionArea: Step5Data;
  };
}

export interface StepProps1 {
  formData: Step1Data;
  setFormData: (data: Step1Data) => void;
  setCompleteForm: (complete: boolean) => void;
}
