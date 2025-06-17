"use client";

import { useAuthStore } from "@/stores/authStore";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import { PlusIcon } from "lucide-react";
import {
    useProductsBySellerId,
    useProductsByShopId,
} from "@/hooks/product/useProduct";
import ProductCreateModal from "./ProductCreateModal";
import { useShopsBySellerId } from "@/hooks/useShopsBySellerId";
import { ProductCard } from "./ProductCard";
import SkeletonCard from "../ui/spinner/SkeletonCard";

export default function ProductClient() {
    const { seller } = useAuthStore();
    const sellerId = seller?.id;
    const [selectedShopId, setSelectedShopId] = useState<string>("all");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: shops=[] } = useShopsBySellerId(sellerId);
    const { data: sellerProducts, isLoading: isLoadingSeller } = useProductsBySellerId(sellerId);
    const { data: shopProducts, isLoading: isLoadingShop } = useProductsByShopId(
        selectedShopId !== "all" ? Number(selectedShopId) : undefined
    );

    if (!seller) return null;

    const isLoading = selectedShopId === "all" ? isLoadingSeller : isLoadingShop;
    const currentProducts =
        selectedShopId === "all"
            ? sellerProducts ?? []
            : shopProducts?.Products ?? [];

    console.log('currentProducts :', currentProducts);
    const shopOptions = [
        { label: "Barcha do‘konlar", value: "all" },
        ...shops.map((shop) => ({
            label: shop.name,
            value: shop.id.toString(),
        })),
    ];

    return (
        <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                {/* Header */}
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Mahsulotlar
                    </h3>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {/* Select */}
                        <Select
                            options={shopOptions}
                            value="all" 
                            onChange={(val) => setSelectedShopId(val)}
                            className="w-[180px]"
                        />

                        <Button
                            size="sm"
                            variant="custome"
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#fd521c] hover:bg-[#e64816] rounded-lg"
                        >
                            <PlusIcon size={16} className="shrink-0" />
                            <span className="whitespace-nowrap">Yangi mahsulot</span>
                        </Button>
                    </div>
                </div>

                {/* Mahsulotlar */}
                <div>
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : currentProducts.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Mahsulotlar topilmadi.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onEdit={() => console.log("Edit product", product)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ProductCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                shop={shops}
            />
        </div>
    );
}
