"use client";

import React from "react";
import { useApproveNotification } from "@/hooks/useNotifications";

export const SkuNotificationCard = ({ item }: { item: any }) => {
console.log('item :', item);
  const { mutate: approve, isPending } = useApproveNotification();

  const handleApprove = () => {
    approve(item.id, {
      onSuccess: () => {
        console.log("✅ SKU notification approved");
      },
    });
  };

  const status =
    item.status === 3
      ? "Tasdiqlangan"
      : item.status === -3
      ? "Rad etilgan"
      : "Kutilmoqda";

  const statusColor =
    item.status === 3
      ? "bg-green-100 text-green-700"
      : item.status === -3
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow transition hover:shadow-md">
      <div className="space-y-2">
        <p className="text-base font-semibold text-[#fd521c]">
          📦 SKU ID: {item.product_sku_id}
        </p>
        <p className="text-sm text-gray-700">
          🛍️ Mahsulot ID: {item.product_id || "Nomaʼlum"}
        </p>
        <p className="text-sm text-gray-700">
          🆔 Seller ID: {item.seller_id || "Nomaʼlum"}
        </p>

        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      </div>

      {item.status == 3 && (
        <div className="flex gap-3 mt-5">
          <button
            onClick={handleApprove}
            disabled={isPending}
            className="bg-[#fd521c] hover:bg-[#e64816] text-white px-4 py-2 text-sm rounded-md font-medium transition"
          >
            {isPending ? "Yuborilmoqda..." : "✅ Tasdiqlash"}
          </button>

          <button className="bg-white border border-gray-300 hover:bg-gray-100 text-sm px-4 py-2 rounded-md transition">
            ❌ Bekor qilish
          </button>
        </div>
      )}
    </div>
  );
};
