import { createSkuProduct } from "@/services/skus/skusService";
import { useMutation } from "@tanstack/react-query";

export const useCreateSkuProduct = () => {
    return useMutation({
        mutationFn: createSkuProduct,
    });
};
