"use client";
import { useNotifications } from "@/hooks/useNotifications";
import { Spinner } from "../ui/spinner/spinner";
import { ProductNotificationCard } from "./notificationCard";
import { ShopNotificationCard } from "./ShopNotificationCard";
import { ProfileNotificationCard } from "./ProfileNotificationCard";
import { SkuNotificationCard } from "./SkuNotificationCard";
// import { ProductNotificationCard } from "./productNotificationCard";
// import { Spinner } from "@/components/ui/spinner";
// import { ProfileNotificationCard } from "./profileNotificationCard";
// import { ShopNotificationCard } from "./shopNotificationCard";

export const NotificationsList = () => {
  const { data, isLoading } = useNotifications();
  console.log('data :', data);

  if (isLoading) return <Spinner text="Yuklanmoqda..." />;

  return (
    <div className="p-4 space-y-4">
{data?.length ? (
  data.map((item: any) => {
    if (item.product_sku_id) {
      return <SkuNotificationCard key={item.id} item={item} />;
    } else if (item.product_id) {
      return <ProductNotificationCard key={item.id} item={item} />;
    } else if (item.shop_id) {
      return <ShopNotificationCard key={item.id} item={item} />;
    } else if (item.seller_id && item.params?.first_name) {
      return <ProfileNotificationCard key={item.id} item={item} />;
    } else {
      return (
        <div key={item.id} className="text-gray-500 text-sm">
          Nomaʼlum turdagi bildirishnoma.
        </div>
      );
    }
  })
) : (
  <p className="text-gray-500 text-sm">Bildirishnomalar mavjud emas.</p>
)}

    </div>
  );
};
