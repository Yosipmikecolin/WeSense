import { initDB } from "./db";

export interface Request {
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
}

export const addRequest = async (request: Request) => {
  const db = await initDB();
  const tx = db.transaction("request", "readwrite");
  await tx.store.put(request);
  await tx.done;
};

export const getRequest = async (): Promise<Request[]> => {
  const db = await initDB();
  const tx = db.transaction("request", "readonly");
  const store = tx.objectStore("request");
  const allUsers = await store.getAll();
  await tx.done;
  return allUsers;
};

export const deleteRequest = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("request", "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
