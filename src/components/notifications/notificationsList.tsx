"use client";
import { useNotifications } from "@/hooks/useNotifications";
import { Spinner } from "../ui/spinner/spinner";
import { ProductNotificationCard } from "./notificationCard";

export const NotificationsList = () => {
  const { data, isLoading } = useNotifications();

  if (isLoading) return <Spinner text="Yuklanmoqda..." />;

  return (
    <div className="p-4 space-y-4">
      {data?.length ? (
        data.map((item: any) => (
          <ProductNotificationCard key={item.id} item={item} />
        ))
      ) : (
        <p className="text-gray-500 text-sm">Bildirishnomalar mavjud emas.</p>
      )}
    </div>
  );
};
