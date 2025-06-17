// stores/b2bStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface B2BUser {
  id: number;
  full_name: string;
  phone: string;
  user_id: string;
  // Agar boshqa fieldlar bo‘lsa, shu yerga qo‘shing
}

interface B2BState {
  b2bUser: B2BUser | null;
  setB2BUser: (b2bUser: B2BUser) => void;
  clearB2B: () => void;
}

export const useB2BStore = create<B2BState>()(
  persist(
    (set) => ({
      b2bUser: null,
      setB2BUser: (b2bUser) => set({ b2bUser }),
      clearB2B: () => set({ b2bUser: null }),
    }),
    {
      name: "b2b-storage", // localStorage key nomi
    }
  )
);
