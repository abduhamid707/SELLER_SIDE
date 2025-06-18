// utils/uploadImage.ts

import BaseUrl from "@/services/axios";

export const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("files", file);

    try {
        const { data } = await BaseUrl.post(
            "seller/product-skus/upload/images",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        const url = data.url || data.data;
        return url;
    } catch (error) {
        console.error("Rasm yuklashda xatolik:", error);
        return null;
    }
};
