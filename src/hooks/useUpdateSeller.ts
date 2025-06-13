// hooks/useUpdateSeller.ts
import { useMutation } from "@tanstack/react-query";
import { updateSeller, SellerPayload } from "@/services/sellerService";

export const useUpdateSeller = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SellerPayload }) =>
      updateSeller(id, data),
  });
};
