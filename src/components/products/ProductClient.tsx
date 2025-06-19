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
import SkuCreateModal from "./SkuClient/SkuCreateModal";
import ProductEditModal from "./ProductEditModal";
import { useCategories } from "@/hooks/category/useCategories";
import { useProductTags } from "@/hooks/tag/useProductTags";

export default function ProductClient() {
    const { seller } = useAuthStore();
    const sellerId = seller?.id;
    const [selectedShopId, setSelectedShopId] = useState<string>("all");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [createdProduct, setCreatedProduct] = useState<any>(null);
    const [showSkuModal, setShowSkuModal] = useState(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const { data: shops = [] } = useShopsBySellerId(sellerId.toString());
    const { data: sellerProducts, isLoading: isLoadingSeller } = useProductsBySellerId(sellerId);
    const { data: shopProducts, isLoading: isLoadingShop } = useProductsByShopId(
        selectedShopId !== "all" ? Number(selectedShopId) : undefined
    );

    if (!seller) return null;



    const handleEdit = (product: any) => {
        setSelectedProduct(product);
        setEditModalOpen(true);
    };


    const isLoading = selectedShopId === "all" ? isLoadingSeller : isLoadingShop;
    const currentProducts =
        selectedShopId === "all"
            ? sellerProducts ?? []
            : (shopProducts as any)?.Products ?? [];


    const shopOptions = [
        { label: "Barcha do‘konlar", value: "all" },
        ...(Array.isArray(shops) ? shops : []).map((shop) => ({
            label: shop.name,
            value: shop.id.toString(),
        })),
    ];
    const { categories } = useCategories();
    const { tags: tagOptionsRaw } = useProductTags();
    const tagOptions = tagOptionsRaw.map((tag) => {
        const nameArray = Array.isArray(tag.name) ? tag.name : [];
        const uzName = nameArray.find((n) => n.startsWith("uz_UZ"));
        const label = uzName ? uzName.split(":")[1]?.trim() : tag.code;

        return {
            label: label || tag.code,
            value: tag.code,
        };
    });

    // Format category options
    const categoryOptions = categories.map((cat) => ({
        value: cat.id,
        label: Array.isArray(cat.name) ? cat.name[0]?.split(":")[1] : cat.name,
    }));



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
                            onChange={(val: any) => setSelectedShopId(val)}
                            className="w-[180px]"
                            {...({} as any)}
                        />


                        <Button
                            size="sm"
                            variant="custom"
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
                                    onEdit={handleEdit}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ProductCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductCreated={(product) => {
                    setCreatedProduct(product);      // product ID va boshqa ma'lumotlar
                    setShowSkuModal(true);          // Sku modalni ochish
                }}

            />
            <SkuCreateModal
                isOpen={showSkuModal}
                onClose={() => setShowSkuModal(false)}
                product={createdProduct}
                sellerId={sellerId}
            />
            {selectedProduct && (
                <ProductEditModal
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    product={selectedProduct}
                    sellerId={sellerId}
                    shopOptions={shopOptions}
                    categoryOptions={categoryOptions}
                    tagOptions={tagOptions}
                />
            )}

        </div>
    );
}
