import { getShopsBySeller } from "@/services/shop/shopService";
import { useQuery } from "@tanstack/react-query";
// import { getShopsBySeller } from "@/services/shopService";

export const useShopsBySellerId = (sellerId: string) =>
  useQuery({
    queryKey: ["shops", sellerId],
    queryFn: () => getShopsBySeller(sellerId),
    enabled: !!sellerId, // sellerId bo'lmasa, chaqirmaydi
  });
