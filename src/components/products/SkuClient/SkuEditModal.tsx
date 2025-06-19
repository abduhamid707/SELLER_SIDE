"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Image from "next/image";
import { z } from "zod";
import { uploadImage } from "@/utils/uploadImageSku";
import { useUpdateEntity } from "@/hooks/useUpdateEntity";

const skuSchema = z.object({
    attribute_color_uz: z.string().min(2, "Rang (uz) majburiy"),
    attribute_color_ru: z.string().min(2, "Rang (ru) majburiy"),
    attribute_size: z.string().min(1, "O'lcham majburiy"),
    amount_on_sale: z.coerce.number().min(0),
    cargo_price: z.coerce.number().min(0),
    price: z.coerce.number().min(1, "Narx majburiy"),
    discount_price: z.coerce.number().min(0).optional(),
    sold_count: z.coerce.number().optional(),
    sku_image_url: z.string().url("Rasm URL noto‘g‘ri."),
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    length: z.coerce.number().optional(),
    weight: z.coerce.number().optional(),
    min_quantity: z.coerce.number().min(1, "Minimal soni 1 dan katta bo'lishi kerak."),
});

export default function SkuEditModal({
    isOpen,
    onClose,
    sku,
    sellerId,
}: {
    isOpen: boolean;
    onClose: () => void;
    sku: any;
    sellerId: number;
}) {
    const initialState = {
        attribute_color_uz: sku.attribute_color?.find((a: string) => a.startsWith("uz_UZ:"))?.split(":")[1] || "",
        attribute_color_ru: sku.attribute_color?.find((a: string) => a.startsWith("ru_RU:"))?.split(":")[1] || "",
        attribute_size: sku.attribute_size || "",
        amount_on_sale: sku.amount_on_sale ?? 0,
        cargo_price: sku.cargo_price ?? 0,
        price: sku.price ?? 0,
        discount_price: sku.discount_price ?? 0,
        sold_count: sku.sold_count ?? 0,
        sku_image_url: sku.sku_image_url ?? "",
        width: sku.width ?? 0,
        height: sku.height ?? 0,
        length: sku.length ?? 0,
        weight: sku.weight ?? 0,
        min_quantity: sku.min_quantity ?? 1,
    };

    const [formState, setFormState] = useState(initialState);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const { mutate } = useUpdateEntity();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));

        try {
            skuSchema.pick({ [name]: true }).parse({ [name]: value });
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (err: any) {
            setFormErrors((prev) => ({ ...prev, [name]: err.errors?.[0]?.message }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = await uploadImage(file);
        if (url) {
            setFormState((prev) => ({ ...prev, sku_image_url: url[0] }));
            setFormErrors((prev) => ({ ...prev, sku_image_url: "" }));
        } else {
            setFormErrors((prev) => ({ ...prev, sku_image_url: "Rasm yuklashda xatolik" }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const validated = skuSchema.parse(formState);
            const payload = {
                ...validated,
                attribute_color: [
                    `uz_UZ:${formState.attribute_color_uz}`,
                    `ru_RU:${formState.attribute_color_ru}`,
                ],
                product_id: sku.product_id,
                seller_id: sellerId,
            };

            delete payload.attribute_color_uz;
            delete payload.attribute_color_ru;

            mutate(
                {
                    type: "product-sku",
                    id: sku.id,
                    params: payload,
                    old_params: sku,
                    seller_id: sellerId,
                },
                {
                    onSuccess: () => {
                        onClose();
                    },
                }
            );
        } catch (error: any) {
            const errors: Record<string, string> = {};
            error.errors.forEach((err: any) => {
                errors[err.path[0]] = err.message;
            });
            setFormErrors(errors);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl m-4">
            <form onSubmit={handleSubmit} className="p-6">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    SKU'ni Tahrirlash
                </h4>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {[
                        { name: "attribute_color_uz", label: "Rang (uz)" },
                        { name: "attribute_color_ru", label: "Rang (ru)" },
                        { name: "attribute_size", label: "O‘lcham" },
                        { name: "price", label: "Narxi", type: "number" },
                        { name: "discount_price", label: "Chegirma narxi", type: "number" },
                        { name: "cargo_price", label: "Yetkazish narxi", type: "number" },
                        { name: "amount_on_sale", label: "Sotuvda", type: "number" },
                        { name: "min_quantity", label: "Minimal soni", type: "number" },
                        { name: "height", label: "Bo‘yi (mm)", type: "number" },
                        { name: "width", label: "Kengligi (mm)", type: "number" },
                        { name: "length", label: "Uzunligi (mm)", type: "number" },
                        { name: "weight", label: "Og‘irligi (gr)", type: "number" },
                    ].map(({ name, label, type = "text" }) => (
                        <InputBlock
                            key={name}
                            name={name}
                            label={label}
                            type={type}
                            value={formState[name]}
                            onChange={handleChange}
                            error={formErrors[name]}
                        />
                    ))}

                    <div className="w-full">
                        <Label>Rasm yuklash</Label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                        {formState.sku_image_url && (
                            <Image
                                src={formState.sku_image_url}
                                alt="Yuklangan rasm"
                                width={96}
                                height={96}
                                className="mt-2 rounded-md border object-contain"
                            />
                        )}
                        {formErrors.sku_image_url && (
                            <p className="text-sm text-red-500 mt-1">{formErrors.sku_image_url}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" type="button" onClick={onClose}>Bekor qilish</Button>
                    <Button type="submit" variant="custom" className="bg-[#fd521c] text-white hover:bg-[#e64816]">Saqlash</Button>
                </div>
            </form>
        </Modal>
    );
}

function InputBlock({
    name,
    label,
    value,
    onChange,
    type = "text",
    error,
}: {
    name: string;
    label: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: React.HTMLInputTypeAttribute;
    error?: string;
}) {
    return (
        <div className="w-full">
            <Label>{label}</Label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 text-sm rounded-xl border transition-colors outline-none focus:ring-2 ${
                    error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                } dark:bg-gray-800 dark:text-white dark:border-gray-700`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
