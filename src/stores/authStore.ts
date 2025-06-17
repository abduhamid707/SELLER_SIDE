// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Seller {
  id: number;
  first_name: string;
  phone: string;
  // boshqa kerakli fieldlar
}

interface AuthState {
  token: string | null;
  seller: Seller | null;
  setAuth: (token: string, seller: Seller) => void;
  setSeller: (seller: Seller) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      seller: null,
      setAuth: (token, seller) => set({ token, seller }),
      setSeller: (seller) => set({ seller }), 
      clearAuth: () => set({ token: null, seller: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
