import { User, UserPost } from "@/db/user";
import { axiosConfig } from "./config";

export const getUsers = async () => {
  return (await axiosConfig.get<User[]>("/users")).data;
};

export const deleteUser = async (id: string) => {
  return (await axiosConfig.delete(`/users/${id}`)).data;
};

export const updatedUser = async (user: User) => {
  return await axiosConfig.put(`/users/${user._id}`, user);
};

export const addUser = async (user: UserPost) => {
  return await axiosConfig.post("/users/", user);
};
