// hooks/useCreateShop.ts
import { createShop } from "@/services/shop/shopService";
import { useMutation } from "@tanstack/react-query";

export const useCreateShop = () => {
  return useMutation({
    mutationFn: createShop,
  });
};
