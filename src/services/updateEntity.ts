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
  id?: number | null;
  params: T;
  old_params: T | null;
  seller_id: number;
}

export const updateEntity = async <T>({
  type,
  id,
  params,
  old_params,
  seller_id,
}: UpdateEntityPayload<T>): Promise<any> => {
  const idMap: Record<UpdateType, string> = {
    shops: "shop_id",
    product: "product_id",
    "product-sku": "product_sku_id",
    seller: "seller_id",
    "comment-order": "comment_order_id",
  };

  const dynamicIdField = idMap[type];

  const payload: any = {
    params,
    old_params,
    [dynamicIdField]: id,
    seller_id,
  };

  console.log("payload:", payload);

  const res = await BaseUrl.post(`/seller/modiratings/update`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("res.data:", res.data);
  return res.data;
};
