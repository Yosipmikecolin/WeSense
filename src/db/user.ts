import { initDB } from "./db";

export interface User {
  id: string;
  name: string;
  nit: string;
  perfil: string;
  status: string;
  email: string;
  phone: string;
  creation_date: string;
}

export const addUser = async (usuario: User) => {
  const db = await initDB();
  const tx = db.transaction("users", "readwrite");
  await tx.store.put(usuario);
  await tx.done;
};

export const getUsers = async (): Promise<User[]> => {
  const db = await initDB();
  const tx = db.transaction("users", "readonly");
  const store = tx.objectStore("users");
  const allUsers = await store.getAll();
  await tx.done;
  return allUsers;
};

export const deleteUser = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("users", "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
