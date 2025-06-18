"use client";

import { useAuthStore } from "@/stores/authStore";
import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import {
    useProductsBySellerId,
    useProductsByShopId,
} from "@/hooks/product/useProduct";
import { useShopsBySellerId } from "@/hooks/useShopsBySellerId";

export default function SkusClient() {
    const { seller } = useAuthStore();
    const sellerId = seller?.id;
    const [selectedShopId, setSelectedShopId] = useState<string>("all");
    const [isModalOpen, setIsModalOpen] = useState(false);



    if (!seller) return null;



    return (
        <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                {/* Header */}
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Mahsulot SKUs
                    </h3>


                </div>

                {/* Mahsulotlar */}

            </div>


        </div>
    );
}
