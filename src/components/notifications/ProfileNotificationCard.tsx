"use client";

import React from "react";
import { useApproveNotification } from "@/hooks/useNotifications";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation"; 

export const ProfileNotificationCard = ({ item }: { item: any }) => {
    const profile = item.params || {};
    const { mutate: approve, isPending } = useApproveNotification();

    const router = useRouter();
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const handleApprove = () => {
        approve(item.id, {
            onSuccess: () => {
                clearAuth(); // ✅ token va seller o‘chadi
                console.log("🧹 Auth tozalandi");
                router.push("/signin");
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
        <div className="rounded-xl border border-gray-200 bg-[#f5f5f5] p-6 shadow transition hover:shadow-md">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-1">
                    <p className="text-base font-semibold text-[#fd521c]">
                        👤 Profil: {profile.first_name || "Ism yo‘q"}
                    </p>
                    <p className="text-sm text-gray-700">
                        📱 Telefon: {profile.phone || "Nomaʼlum"}
                    </p>
                    <p className="text-sm text-gray-700">
                        🆔 Seller ID: {item.seller_id}
                    </p>

                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                    >
                        {status}
                    </span>
                </div>

                <div className="w-16 h-16 rounded-full bg-[#fd521c1a] flex items-center justify-center text-[#fd521c] font-bold text-xl">
                    {profile.first_name?.charAt(0) || "?"}
                </div>
            </div>

            {item.status === 3 && (
                <div className="flex gap-3 mt-5">
                    <button
                        onClick={handleApprove}
                        disabled={isPending}
                        className="bg-[#fd521c] hover:bg-[#e64816] text-white px-4 py-2 text-sm rounded-md font-medium transition"
                    >
                        {isPending ? "Tasdiqlanmoqda..." : "✅ Tasdiqlash"}
                    </button>

                    <button
                        className="bg-white border border-gray-300 hover:bg-gray-100 text-sm px-4 py-2 rounded-md transition"
                    >
                        ❌ Bekor qilish
                    </button>
                </div>
            )}
        </div>
    );
};
