// components/notifications/notificationCard.tsx
import React from "react";
import { useApproveNotification } from "@/hooks/useNotifications";

export const ProductNotificationCard = ({ item }: { item: any }) => {
  const { mutate: approve } = useApproveNotification();

  const handleApprove = () => approve(item.id);

  const status =
    item.status === 1
      ? "Tasdiqlangan"
      : item.status === -1
      ? "Rad etilgan"
      : "Kutilmoqda";

  const statusColor =
    item.status === 1
      ? "bg-green-100 text-green-700"
      : item.status === -1
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{item.title || "Mahsulot nomi"}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {item.description || "Tavsifi yo‘q"}
          </p>
          <div className={`inline-block px-3 py-1 mt-3 rounded-full text-xs font-medium ${statusColor}`}>
            {status}
          </div>
        </div>
        <img
          src={item.image || "/assets/product-placeholder.png"}
          alt="Rasm"
          className="w-20 h-20 object-cover rounded-lg border"
        />
      </div>

      {item.status === 0 && (
        <div className="flex gap-2 mt-5">
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-[#fd521c] hover:bg-[#e64816] text-white text-sm rounded-md font-medium transition"
          >
            Tasdiqlash
          </button>
          <button
            onClick={() => console.log("Rad etish")}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md font-medium transition"
          >
            Rad etish
          </button>
        </div>
      )}
    </div>
  );
};
