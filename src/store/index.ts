import { create } from "zustand";

interface BuddieState {
  token: string;
  captcha: string;
  setToken: (token: string) => void;
  setCaptcha: (captcha: string) => void;
}

export const useBuddieStore = create<BuddieState>()((set) => ({
  token: "",
  captcha: "",
  setToken: (token) => set((state) => ({ token })),
  setCaptcha: (captcha) => set((state) => ({ captcha })),
}));
