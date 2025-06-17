// hooks/b2b/useB2BOrders.ts
import { useQuery } from "@tanstack/react-query";
import { getB2BOrders } from "@/services/b2b/b2bService";
import { useB2BStore } from "@/stores/b2bStore";

export const useB2BOrders = () => {
    const b2bUser = useB2BStore((s) => s.b2bUser);

    const token = b2bUser?.access_token || b2bUser?.data?.access_token; // strukturaga mos holda
    const userId =
        b2bUser?.user_id || b2bUser?.id?.toString() || b2bUser?.data?.user?.id?.toString();

    return useQuery({
        queryKey: ["b2bOrders", userId],
        queryFn: () => getB2BOrders(userId!, token!),
        enabled: !!userId && !!token,
    });
};
