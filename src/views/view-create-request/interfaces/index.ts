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
  response_date: string;
  return_date: string;
  time_respond: string;
  status: string;
  requester: Requester;
  carrier: FormDataCarrier;
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
