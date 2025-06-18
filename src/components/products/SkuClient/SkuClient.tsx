"use client";

import { useAuthStore } from "@/stores/authStore";
import React, { useState } from "react";
import { useSkusByProductId } from "@/hooks/skus/useSkus";
import Image from "next/image";
import { PencilIcon, TrashIcon, EyeIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";
export default function SkusClient({ productId }) {
    const { seller } = useAuthStore();
    const { data, isLoading } = useSkusByProductId(productId);
    const skus = data?.data ?? [];

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleEdit = (sku: any) => {
        console.log("Edit:", sku);
        // TODO: Open edit modal with sku data
    };

    const handleDelete = (sku: any) => {
        console.log("Delete:", sku);
        // TODO: Confirm and delete logic
    };

    if (!seller) return null;

    return (
        <div className="p-5 lg:p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0f172a]">
            {/* <div className="mb-5 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Mahsulot SKUs
                </h3>
            </div> */}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y   text-sm">
                    <thead className=" dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        <tr>
                            {["Rasm", "SKU ID", "Rang", "O‘lcham", "Narx", "Chegirma", "Miqdor", "Yaratilgan", "Harakatlar"].map(
                                (heading) => (
                                    <th
                                        key={heading}
                                        className="px-4 py-3 text-left font-semibold tracking-wide"
                                    >
                                        {heading}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody className=" dark:bg-transparent divide-y divide-gray-100 dark:divide-gray-700">
                        {skus.map((sku) => (
                            <tr
                                key={sku.id}
                                className="hover:bg-gray-50 dark:hover:bg-white/[0.05] transition  dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                            >
                                <td className="px-4 py-2">
                                    <div
                                        onClick={() => setPreviewImage(sku.sku_image_url)}
                                        className="w-12 h-12 relative cursor-pointer group"
                                    >
                                        <Image
                                            src={sku.sku_image_url}
                                            alt="SKU rasm"
                                            fill
                                            className="rounded-md object-cover border border-gray-300 dark:border-gray-700"
                                        />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 rounded-md flex items-center justify-center transition">
                                            <EyeIcon className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2">{sku.sku_id}</td>
                                <td className="px-4 py-2">
                                    {sku.attribute_color?.find((c: string) =>
                                        c.startsWith("uz_UZ:")
                                    )?.split(":")[1] || "–"}
                                </td>
                                <td className="px-4 py-2">{sku.attribute_size || "–"}</td>
                                <td className="px-4 py-2">
                                    {sku.price?.toLocaleString()} so‘m
                                </td>
                                <td className="px-4 py-2">
                                    {sku.discount_price?.toLocaleString() || 0} so‘m
                                </td>
                                <td className="px-4 py-2">{sku.amount_on_sale} dona</td>
                                <td className="px-4 py-2">
                                    {new Date(sku.created_at).toLocaleDateString("uz-UZ")}
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(sku)}
                                            className="p-1 rounded hover:bg-orange-100 dark:hover:bg-orange-800/30"
                                        >
                                            <PencilIcon className="w-4 h-4 text-orange-500" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(sku)}
                                            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-800/30"
                                        >
                                            <TrashIcon className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {skus.length === 0 && !isLoading && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                        Hech qanday SKU mavjud emas.
                    </div>
                )}
            </div>

            {/* Rasm kattalashtirish modal */}
            {previewImage && (
                <Modal isOpen={!!previewImage} onClose={() => setPreviewImage(null)}>
                    <div className="p-4 flex justify-center items-center">
                        <Image
                            src={previewImage}
                            alt="Full image"
                            width={500}
                            height={500}
                            className="rounded-xl border border-gray-300 dark:border-gray-700 object-contain"
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}
