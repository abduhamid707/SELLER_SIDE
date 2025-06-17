// services/b2bService.ts
import axios from "axios";
import BaseUrl from "../axios";

export const registerB2B = async (b2bId: string, token: string) => {
    const res = await BaseUrl.get(`seller/b2b-users/${b2bId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const confirmB2BCode = async (code: string, sellerId: number, token: string) => {
    const res = await BaseUrl.get(
        `seller/b2b-users/code/${sellerId}?code=${code}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data;
};

export const getB2BOrders = async (userId: string, token: string) => {
    const xUuid = "259bb5ce-16a8-4d4a-81d5-1aaba0ba4a54";
    const res = await axios.get(`https://api.abusahiy.uz/api/b2b/orders?user_id=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-uuid": xUuid,
        },
    });
    return res.data;
};
