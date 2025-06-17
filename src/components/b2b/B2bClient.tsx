"use client";

import { useAuthStore } from "@/stores/authStore";
import React, { useState } from "react";
import { PlusIcon } from "lucide-react";


import SkeletonCard from "../ui/spinner/SkeletonCard";
import { useB2BOrders } from "@/hooks/b2b/useB2B";
import B2BOrderCard from "./B2BOrderCard";

export default function B2bClient() {
    const { seller } = useAuthStore();
    const { data, isLoading, error } = useB2BOrders();
    console.log('data :', data);

    if (!seller) return null;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : data?.data?.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">Buyurtmalar topilmadi.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.data.map((order) => (
                        <B2BOrderCard
                            key={order.id}
                            order={order}
                            onEdit={() => console.log("Edit order", order)}
                        />
                    ))}
                </div>
            )}


        </div>
    );
}
