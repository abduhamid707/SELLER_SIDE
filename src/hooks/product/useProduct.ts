import { createProduct, getProductsBySellerId, getProductsByShopId } from "@/services/products/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProductsByShopId = (shopId?: number) => {
    return useQuery({
        queryKey: ["products", shopId],
        queryFn: () => getProductsByShopId(shopId!),
        enabled: !!shopId,
    });
};


export const useProductsBySellerId = (sellerId?: number) => {
    return useQuery({
        queryKey: ["products-by-seller", sellerId],
        queryFn: () => getProductsBySellerId(sellerId!), // bu siz yozgan API
        enabled: !!sellerId,
    });
};

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: createProduct,
    });
};