import BaseUrl from "../axios";

export const createSkuProduct = async (data: any): Promise<any> => {
console.log('data :', data);
    const res = await BaseUrl.post(`/seller/product-skus`, { ...data });
    console.log('res.data :', res.data);
    return res.data;
};
