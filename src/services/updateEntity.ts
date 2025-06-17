// services/entityService.ts
import BaseUrl from "./axios";

type UpdateType =
  | "shops"
  | "product"
  | "product-sku"
  | "seller"
  | "comment-order";

interface UpdateEntityPayload<T> {
  type: UpdateType;
  id: number;
  params: T;
  old_params?: T | null;
  seller_id: number;
}

const typeToIdKey: Record<UpdateType, string> = {
  shops: "shop_id",
  product: "product_id",
  "product-sku": "product_sku_id",
  seller: "seller_id",
  "comment-order": "comment_order_id",
};

export const updateEntity = async <T>({
  type,
  id,
  params,
  old_params,
  seller_id,
}: UpdateEntityPayload<T>): Promise<any> => {
  const idField = typeToIdKey[type];

  const payload: Record<string, any> = {
    [idField]: id,
    params,
    seller_id,
  };

  if (old_params) {
    payload.old_params = old_params;
  }

  const res = await BaseUrl.post(`/seller/modiratings/update`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
