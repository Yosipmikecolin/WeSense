import { IDBPDatabase, openDB } from "idb";

let dbPromise: Promise<IDBPDatabase>;

export const initDB = () => {
  dbPromise = openDB("wesense", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("request")) {
        db.createObjectStore("request", { keyPath: "id" });
      }
    },
  });

  return dbPromise;
};
