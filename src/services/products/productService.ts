import BaseUrl from "../axios"
export const getProductsByShopId = async (
    shopId: number
): Promise<any[]> => {
    const res = await BaseUrl.get(`/seller/products/all/shop/${shopId}`);
    return res.data.data;
};

export const getProductsBySellerId = async (
    sellerId: number
): Promise<any[]> => {
    const res = await BaseUrl.get(`/seller/products/all/seller/${sellerId}`);
    return res.data.data;
};
export const createProduct = async (data: any): Promise<any> => {
    const res = await BaseUrl.post(`/seller/products`, { ...data });
    return res.data;
};