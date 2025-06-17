"use client";

import { useAuthStore } from "@/stores/authStore";
import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import ShopCreateModal from "./ShopCreateModal";
import { useShopsBySellerId } from "@/hooks/useShopsBySellerId";
import ShopCard from "./ShopCard";
import { useCreateShop } from "@/hooks/useCreateShop";
import ShopEditModal from "./ShopEditModal";
import SkeletonCard from "../ui/spinner/SkeletonCard";

export default function ShopClient() {
    const { seller } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: shops, isLoading, isError } = useShopsBySellerId(seller?.id);
    const { mutate, isPending, isSuccess, error } = useCreateShop();
    const [activeShop, setActiveShop] = useState<any>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    if (!seller) return null;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Do‘konlarizga xush kelibsiz! {seller.first_name}
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
                >
                    <PlusIcon size={15} /> Yangi do‘kon
                </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, idx) => (
                        <SkeletonCard key={idx} />
                    ))
                    : shops?.map((shop) => (
                        <ShopCard key={shop.id} shop={shop} onEdit={() => {
                            setActiveShop(shop);
                            setIsEditOpen(true);
                        }} />
                    ))
                }
            </div>

            {/* Modal */}
            <ShopCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sellerId={seller.id}
                mutate={mutate}
            />
            {activeShop && (
                <ShopEditModal
                    shop={activeShop}
                    onClose={() => {
                        setActiveShop(null);
                        setIsEditOpen(false);
                    }}
                    isOpen={isEditOpen}
                    sellerId={seller.id}

                />
            )}

        </div>
    );
}
