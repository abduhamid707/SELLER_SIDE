"use client";

import React from "react";
import Image from "next/image";
import { useApproveNotification } from "@/hooks/useNotifications";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export const ShopNotificationCard = ({ item }: { item: any }) => {
    const shop = item.params || {};
    const router = useRouter();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const { mutate: approve, isPending } = useApproveNotification();

    const handleApprove = () => {
        approve(item.id, {
            onSuccess: () => {
                clearAuth();
                router.push("/signin");
            },
        });
    };

    const getStatusLabel = (status: number) => {
        switch (status) {
            case 1:
                return { text: "Jarayonda", color: "bg-yellow-100 text-yellow-700" };
            case 2:
                return { text: "Ko‘rib chiqilmoqda", color: "bg-blue-100 text-blue-700" };
            case 3:
                return { text: "Tasdiqlangan", color: "bg-green-100 text-green-700" };
            default:
                return { text: "Nomaʼlum", color: "bg-gray-100 text-gray-700" };
        }
    };

    const statusInfo = getStatusLabel(item.status);

    return (
        <div className="rounded-xl border border-gray-200 bg-[#f9f9f9] p-6 shadow hover:shadow-md transition">
            <div className="flex items-start gap-4">
                {/* Do‘kon rasmi */}
                <div className="w-16 h-16 relative rounded-full overflow-hidden border border-gray-300">
                    <Image
                        src={shop.image || "/images/placeholder.png"}
                        alt={shop.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 space-y-1">
                    <p className="text-base font-semibold text-[#fd521c]">🏪 {shop.name}</p>
                    <p className="text-sm text-gray-700">🌐 URL: {shop.url}</p>
                    <p className="text-sm text-gray-700">🆔 Seller ID: {shop.seller_id}</p>
                    <p className="text-sm text-gray-700">📝 {shop.details_uz}</p>

                    {/* Status badge */}
                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                    >
                        {statusInfo.text}
                    </span>
                </div>
            </div>

            {/* Agar status 3 bo‘lsa - tasdiqlash tugmasi */}
            {item.status === 3 && (
                <div className="flex gap-3 mt-5">
                    <button
                        onClick={handleApprove}
                        disabled={isPending}
                        className="bg-[#fd521c] hover:bg-[#e64816] text-white px-4 py-2 text-sm rounded-md font-medium transition"
                    >
                        {isPending ? "Tasdiqlanmoqda..." : "✅ Tasdiqlash"}
                    </button>
                    <button className="bg-white border border-gray-300 hover:bg-gray-100 text-sm px-4 py-2 rounded-md transition">
                        ❌ Bekor qilish
                    </button>
                </div>
            )}
        </div>
    );
};
