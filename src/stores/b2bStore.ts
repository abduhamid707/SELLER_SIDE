import { create } from "zustand";
import { persist } from "zustand/middleware";

interface B2BUser {
  access_token: string;
  user: {
    id: number;
    full_name?: string;
    phone?: string;
    // boshqa kerakli fieldlar
  };
}

interface B2BState {
  b2bUser: B2BUser | null;
  setB2BUser: (user: B2BUser) => void;
  clearB2B: () => void;
}

export const useB2BStore = create<B2BState>()(
  persist(
    (set) => ({
      b2bUser: null,
      setB2BUser: (user) => set({ b2bUser: user }),
      clearB2B: () => set({ b2bUser: null }),
    }),
    {
      name: "b2b-storage",
    }
  )
);
