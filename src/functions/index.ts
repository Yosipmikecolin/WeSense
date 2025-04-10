import { v4 as uuidv4 } from "uuid";

export const getDate = (): string => {
  const hoy = new Date();

  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
  const day = String(hoy.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const generateUUID = (): string => {
  return uuidv4();
};
