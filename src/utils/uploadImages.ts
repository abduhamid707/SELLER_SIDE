// src/utils/uploadImages.ts
import BaseUrl from "@/services/axios";

export const uploadImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));


  const res = await BaseUrl.post(
    "seller/product-skus/upload/images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // API sizga image URL larni qaytaradi deb hisoblayapman:
  return res.data; // ["url1", "url2", ...]
};
