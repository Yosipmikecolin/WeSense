import { User, UserPost } from "@/db/user";
import { axiosConfig } from "./config";
import {
  FormDataCarrier,
  FormDataCarrierPost,
} from "@/views/view-create-carrier/interfaces";
import { Requester, RequesterPost } from "@/db/requester";
import {
  RequestPost,
  RequestTable,
} from "@/views/view-create-request/interfaces";

//* USERS

export const getUsers = async () => {
  return (await axiosConfig.get<User[]>("/users")).data;
};

export const addUser = async (user: UserPost) => {
  return await axiosConfig.post("/users/", user);
};

export const updatedUser = async (user: User) => {
  return await axiosConfig.put(`/users/${user._id}`, user);
};

export const deleteUser = async (id: string) => {
  return (await axiosConfig.delete(`/users/${id}`)).data;
};

//* PORTADORES

export const getCarriers = async () => {
  return (await axiosConfig.get<FormDataCarrier[]>("/carriers")).data;
};

export const addCarrier = async (carrier: FormDataCarrierPost) => {
  return await axiosConfig.post("/carriers/", carrier);
};

export const updatedCarrier = async (carrier: FormDataCarrier) => {
  return await axiosConfig.put(`/carriers/${carrier._id}`, carrier);
};

export const deleteCarrier = async (id: string) => {
  return (await axiosConfig.delete(`/carriers/${id}`)).data;
};

//* REQUIRENTES

export const getRequesters = async () => {
  return (await axiosConfig.get<Requester[]>("/requesters")).data;
};

export const addRequester = async (requester: RequesterPost) => {
  return await axiosConfig.post("/requesters/", requester);
};

export const updatedRequester = async (requester: Requester) => {
  return await axiosConfig.put(`/requesters/${requester._id}`, requester);
};

export const deleteRequester = async (id: string) => {
  return (await axiosConfig.delete(`/requesters/${id}`)).data;
};

//* SOLICITUDES

export const getRequest = async () => {
  return (await axiosConfig.get<RequestTable[]>("/requests")).data;
};

export const addRequest = async (request: RequestPost) => {
  return await axiosConfig.post("/requests/", request);
};
