import { Request } from "@/db/requester";
import {
  FormDataCarrier,
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
  requester: {
    id: string;
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
    step1: Step1Data;
    step2: Step2Data;
    step3: Step3Data;
    step4: Step4Data;
    step5: Step5Data;
  };
}

export interface StepProps1 {
  formData: Step1Data;
  setFormData: (data: Step1Data) => void;
  setCompleteForm: (complete: boolean) => void;
}
