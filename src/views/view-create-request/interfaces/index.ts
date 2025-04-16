import { Requester } from "@/db/requester";
import {
  FormDataCarrier,
  Step1Data,
} from "@/views/view-create-carrier/interfaces";

export interface TimelineProps {
  steps: string[];
  currentStep: number;
}

export interface FormDataRequest {
  answer: string;
  issue_date: string;
  reason_return: string;
  description_reason: string;
  response_date: string;
  return_date: string;
  time_respond: string;
  status: string;
  requester: Requester;
  carrier: FormDataCarrier;
  awardee_response: {
    minimum_coverage: string;
    status: string;
    latitude: string;
    length: string;
    indication_aspects: string;
    value: string;
    photographic_evidence: string[];
  };
}

export interface RequestTable extends FormDataRequest {
  _id: string;
}

export type RequestPost = FormDataRequest;

export interface StepProps1 {
  formData: Step1Data;
  setFormData: (data: Step1Data) => void;
  setCompleteForm: (complete: boolean) => void;
}
