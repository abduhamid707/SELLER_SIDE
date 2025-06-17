// hooks/useUpdateEntity.ts
import { updateEntity } from "@/services/updateEntity";
import { useMutation } from "@tanstack/react-query";

type UpdateType =
  | "shops"
  | "product"
  | "product-sku"
  | "seller"
  | "comment-order";

interface MutationArgs<T> {
  type: UpdateType;
  id: number;
  params: T;
  old_params: T;
  seller_id: number;
}

export const useUpdateEntity = <T>() => {
  return useMutation({
    mutationFn: (data: MutationArgs<T>) => updateEntity<T>(data),
  });
};
