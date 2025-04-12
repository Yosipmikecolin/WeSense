/* import { initDB } from "./db";

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

export const addRequest = async (user: User) => {
  const db = await initDB();
  const tx = db.transaction("requests", "readwrite");
  await tx.store.put(user);
  await tx.done;
};

export const getRequest = async (): Promise<User[]> => {
  const db = await initDB();
  const tx = db.transaction("requests", "readonly");
  const store = tx.objectStore("requests");
  const allUsers = await store.getAll();
  await tx.done;
  return allUsers;
};

export const deleteRequest = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("users", "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
 */