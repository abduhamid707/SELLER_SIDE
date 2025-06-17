import { useQuery } from "@tanstack/react-query";
import { getB2BOrders } from "@/services/b2b/b2bService";
import { useB2BStore } from "@/stores/b2bStore";

export const useB2BOrders = () => {
  const b2bUser = useB2BStore((s) => s.b2bUser);
  console.log('b2bUser :', b2bUser);
const token = b2bUser?.data.access_token;
console.log('token :', token);
const userId = b2bUser?.data.user?.id;
console.log('userId :', userId);
  return useQuery({
    queryKey: ["b2bOrders", userId],
    queryFn: () => getB2BOrders(userId!, token!),
    enabled: !!userId && !!token,
  });
};
 