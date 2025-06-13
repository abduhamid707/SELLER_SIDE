// hooks/useNotifications.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  approveNotification,
} from "@/services/notificationService";

export const useNotifications = () =>
  useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

export const useApproveNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => approveNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
