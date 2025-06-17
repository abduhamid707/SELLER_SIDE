import BaseUrl from "./axios";

export const getAllProductTags = async () => {
  const res = await BaseUrl.get("/seller/product-tags/all");
  return res.data.data;
};
