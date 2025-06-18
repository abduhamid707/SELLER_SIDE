"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { z } from "zod";
import Label from "@/components/form/Label";
import { useCreateSkuProduct } from "@/hooks/skus/useSkus";
import { uploadImage } from "@/utils/uploadImageSku";
import Image from "next/image";

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

export default function SkuCreateModal({
    isOpen,
    onClose,
    product,
    sellerId,
}: {
    isOpen: boolean;
    onClose: () => void;
    product: any;
    sellerId: number;
}) {
    const [formState, setFormState] = useState<any>({
        attribute_color_uz: "",
        attribute_color_ru: "",
        attribute_size: "",
        amount_on_sale: 0,
        cargo_price: 0,
        price: 0,
        discount_price: 0,
        sold_count: 0,
        sku_image_url: "",
        width: 0,
        height: 0,
        length: 0,
        weight: 0,
        min_quantity: 1,
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const { mutate } = useCreateSkuProduct();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev: any) => ({ ...prev, [name]: value }));
        try {
            skuSchema.pick({ [name]: true }).parse({ [name]: value });
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (error: any) {
            if (error?.errors?.[0]?.message) {
                setFormErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
            }
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
                product_id: Number(product.id),
                seller_id: sellerId,
            };

            delete payload.attribute_color_uz;
            delete payload.attribute_color_ru;
            mutate(payload, {
                onSuccess: () => {
                    onClose();
                    setFormState({
                        attribute_color_uz: "",
                        attribute_color_ru: "",
                        attribute_size: "",
                        amount_on_sale: 0,
                        cargo_price: 0,
                        price: 0,
                        discount_price: 0,
                        sold_count: 0,
                        sku_image_url: "",
                        width: 0,
                        height: 0,
                        length: 0,
                        weight: 0,
                        min_quantity: 1,
                    });
                },
            });
        } catch (error: any) {
            const errors: Record<string, string> = {};
            error.errors.forEach((err: any) => {
                errors[err.path[0]] = err.message;
            });
            setFormErrors(errors);
        }
    };


    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = await uploadImage(file)

        if (url) {
            setFormState((prev) => ({ ...prev, sku_image_url: url[0] as string }));
            setFormErrors((prev) => ({ ...prev, sku_image_url: "" }));
        } else {
            setFormErrors((prev) => ({ ...prev, sku_image_url: "Rasm yuklashda xatolik" }));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl m-4">
            <form className="p-6" onSubmit={handleSubmit}>
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    Yangi SKU qo‘shish
                </h4>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <InputBlock label="Rang (uz)" name="attribute_color_uz" value={formState.attribute_color_uz} onChange={handleChange} error={formErrors.attribute_color_uz} />
                    <InputBlock label="Rang (ru)" name="attribute_color_ru" value={formState.attribute_color_ru} onChange={handleChange} error={formErrors.attribute_color_ru} />
                    <InputBlock label="O‘lcham" name="attribute_size" value={formState.attribute_size} onChange={handleChange} error={formErrors.attribute_size} />
                    <InputBlock label="Narxi" name="price" value={formState.price} onChange={handleChange} error={formErrors.price} type="number" />
                    <InputBlock label="Chegirma narxi" name="discount_price" value={formState.discount_price} onChange={handleChange} error={formErrors.discount_price} type="number" />
                    <InputBlock label="Yetkazish narxi" name="cargo_price" value={formState.cargo_price} onChange={handleChange} error={formErrors.cargo_price} type="number" />
                    <InputBlock label="Sotuvda" name="amount_on_sale" value={formState.amount_on_sale} onChange={handleChange} error={formErrors.amount_on_sale} type="number" />
                    <InputBlock label="Minimal soni" name="min_quantity" value={formState.min_quantity} onChange={handleChange} error={formErrors.min_quantity} type="number" />
                    <InputBlock label="Bo‘yi (mm)" name="height" value={formState.height} onChange={handleChange} error={formErrors.height} type="number" />
                    <InputBlock label="Kengligi (mm)" name="width" value={formState.width} onChange={handleChange} error={formErrors.width} type="number" />
                    <InputBlock label="Uzunligi (mm)" name="length" value={formState.length} onChange={handleChange} error={formErrors.length} type="number" />
                    <InputBlock label="Og‘irligi (gr)" name="weight" value={formState.weight} onChange={handleChange} error={formErrors.weight} type="number" />
                    <div className="w-full">
                        <Label>Rasm yuklash</Label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />

                        {/* Rasm preview faqat URL mavjud va bo‘sh bo‘lmagan holatda ko‘rsatiladi */}
                        {typeof formState.sku_image_url === "string" && formState.sku_image_url.trim() !== "" && (
                            <Image
                                src={formState.sku_image_url}
                                alt="Yuklangan rasm"
                                width={96}
                                height={96}
                                className="mt-2 rounded-md object-contain border"
                            />
                        )}


                        {/* Validatsiya xabari */}
                        {formErrors.sku_image_url && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.sku_image_url}</p>
                        )}
                    </div>


                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" type="button" onClick={onClose}>Bekor qilish</Button>
                    <Button type="submit" variant="custom" className="bg-[#fd521c] text-white hover:bg-[#e64816]">
                        Saqlash
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

function InputBlock({
    label,
    name,
    value,
    onChange,
    type = "text",
    error,
}: {
    label: string;
    name: string;
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
                className={`w-full px-4 py-2 text-sm rounded-xl border transition-colors outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                    } dark:bg-gray-800 dark:text-white dark:border-gray-700`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}