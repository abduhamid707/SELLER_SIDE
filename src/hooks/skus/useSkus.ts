import { createSkuProduct, getProductSkus, getProductSkusByProductId } from "@/services/skus/skusService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateSkuProduct = () => {
    return useMutation({
        mutationFn: createSkuProduct,
    });
};
export const useProductSkus = () => {
    return useQuery({
        queryKey: ["product-skus"],
        queryFn: getProductSkus,
    });
};

export const useSkusByProductId = (productId: number | string) => {
    return useQuery({
        queryKey: ["product-skus", productId],
        queryFn: () => getProductSkusByProductId(productId),
        enabled: !!productId,
    });
};