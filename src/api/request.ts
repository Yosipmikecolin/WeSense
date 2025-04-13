import { User, UserPost } from "@/db/user";
import { axiosConfig } from "./config";
import {
  FormDataCarrier,
  FormDataCarrierPost,
} from "@/views/view-create-carrier/interfaces";

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
