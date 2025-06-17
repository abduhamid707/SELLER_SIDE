import BaseUrl from "../axios";

export const getCategories = async () => {
    const res = await BaseUrl.get("/seller/categories/all");
    return res.data.data;
};

export const getSubCategoriesByParentId = async (parentId: number) => {
    const res = await BaseUrl.get(`/seller/categories/all/parent/${parentId}`);
    return res.data.data;
};
