import BaseUrl from "../axios";

interface ShopPayload {
    shopName: string;
    shopNameUrl: string;
    shopDescUz: string;
    shopDescRu?: string;
    image: string;
    seller_id: number;
}
export const getShopsBySeller = async (sellerId: string) => {
    const res = await BaseUrl.get(`seller/shops/seller/${sellerId}`);

    console.log('res.data?.data :', res.data?.data);
    return res.data?.data;
};
export const createShop = async (shop: ShopPayload): Promise<any> => {
    try {
        const res = await BaseUrl.post("seller/shops", shop, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log('res.data :', res.data);
        return res.data;
    } catch (error) {
        console.error("Do‘kon yaratishda xatolik:", error);
        throw error;
    }
};