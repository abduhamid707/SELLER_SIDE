import BaseUrl from "../axios";

export const createSkuProduct = async (data: any): Promise<any> => {
    const res = await BaseUrl.post(`/seller/product-skus`, { ...data });
    return res.data;
};


export const getProductSkus = async () => {
    const res = await BaseUrl.get(`/seller/product-skus/all`);
    return res.data;
};
export const getProductSkusByProductId = async (id) => {
    const res = await BaseUrl.get(`/seller/product-skus/product/${id}`);
    return res.data;
};
