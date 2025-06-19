"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { productEditSchema, productSchema } from "@/schemas/sellerSchema";
import { useUpdateEntity } from "@/hooks/useUpdateEntity";
import { ImageUploader } from "@/utils/ImageUploader";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { useSubCategories } from "@/hooks/category/useCategories";

interface Product {
    id: number;
    name_uz: string;
    name_ru: string;
    price: number;
    count: number;
    details_uz: string;
    details_ru?: string;
    guaranty_time: number;
    discounted_price: number;
    category_id: number;
    shop_id: number;
    tags: string[];
    images: string[];
    seller_id: number;
}

export default function ProductEditModal({
    product,
    isOpen,
    onClose,
    sellerId,
    shopOptions,
    categoryOptions,
    tagOptions,
}: {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    sellerId: number;
    shopOptions: { label: string; value: string }[];
    categoryOptions: { label: string; value: string }[];
    tagOptions: { label: string; value: string }[];
}) {
    const [step, setStep] = useState(1);
    const [images, setImages] = useState<string[]>(product.images || []);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const [formState, setFormState] = useState({
        productNameUz: product.name_uz || "",
        productNameRu: product.name_ru || "",
        productPrice: String(product.price),
        productCount: String(product.count),
        productDescUz: product.details_uz || "",
        productDescRu: product.details_ru || "",
        productTerm: String(product.guaranty_time),
        productDiscounted: String(product.discounted_price),
        // productCategory: String(product.category_id),
        // productSubCategory: "",
        // productShopId: String(product.shop_id),
        productTags: product.tags || [],

    });

    const { mutate } = useUpdateEntity();
    const { subCategories } = useSubCategories(formState.productCategory);

    console.log('subCategories :', subCategories);
    console.log('formState.productShopId :', formState.productShopId);

    const validateField = (name: string, value: any) => {
        try {
            productEditSchema.pick({ [name]: true }).parse({ [name]: value });
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (error: any) {
            const msg = error?.errors?.[0]?.message;
            if (msg) setFormErrors((prev) => ({ ...prev, [name]: msg }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (step !== 2) return;
        console.log(1);

        const raw = {
            ...formState,
            images,
            productTags: formState.productTags,
        };

        const parsed = productEditSchema.safeParse(raw);
        if (!parsed.success) {
            const errors: Record<string, string> = {};
            parsed.error.errors.forEach((err) => {
                errors[err.path[0]] = err.message;
            });
            setFormErrors(errors);
            return;
        }

        const payload = {
            name_uz: formState.productNameUz,
            name_ru: formState.productNameRu,
            price: Number(formState.productPrice),
            count: Number(formState.productCount),
            details_uz: formState.productDescUz,
            details_ru: formState.productDescRu,
            guaranty_time: Number(formState.productTerm),
            discounted_price: Number(formState.productDiscounted),
            category_id: Number(formState.productCategory),
            shop_id: Number(formState.productShopId),
            tags: formState.productTags,
            images,
            seller_id: sellerId,
        };

        console.log('payload :', payload);
        mutate(
            {
                type: "product",
                id: product.id,
                params: payload,
                old_params: product,
                seller_id: sellerId,
            },
            {
                onSuccess: () => {
                    onClose();
                    setStep(1);
                },
            }
        );
    };

    const subCategoryOptions = Array.isArray(subCategories)
        ? subCategories.map((sub) => ({
            value: sub.id,
            label: Array.isArray(sub.name) ? sub.name[0]?.split(":")[1] : sub.name,
        }))
        : [];


    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <form onSubmit={handleSubmit} className="p-6">
                <h4 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Mahsulotni Tahrirlash</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Step {step} of 2</p>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    {step === 1 && (
                        <>
                            <InputBlock label="Mahsulot nomi (UZ)" name="productNameUz" value={formState.productNameUz} onChange={handleChange} error={formErrors.productNameUz} />
                            <InputBlock label="Mahsulot nomi (RU)" name="productNameRu" value={formState.productNameRu} onChange={handleChange} error={formErrors.productNameRu} />
                            <InputBlock label="Narxi" name="productPrice" type="number" value={formState.productPrice} onChange={handleChange} error={formErrors.productPrice} />
                            <InputBlock label="Soni" name="productCount" type="number" value={formState.productCount} onChange={handleChange} error={formErrors.productCount} />
                            <InputBlock label="Chegirma" name="productDiscounted" type="number" value={formState.productDiscounted} onChange={handleChange} error={formErrors.productDiscounted} />
                            <InputBlock label="Kafolat muddati (oy)" name="productTerm" type="number" value={formState.productTerm} onChange={handleChange} error={formErrors.productTerm} />

                            <div className="col-span-2">
                                <Label>Rasmlar</Label>
                                <ImageUploader
                                    initialUrls={images}
                                    onSuccess={(urls) => setImages(urls)}
                                />
                                {formErrors.images && <p className="text-sm text-red-500 mt-1">{formErrors.images}</p>}
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="col-span-2">
                                <Label>Ta'rif (UZ)</Label>
                                <TextArea
                                    value={formState.productDescUz}
                                    onChange={(val) => setFormState({ ...formState, productDescUz: val })}
                                    error={formErrors.productDescUz}
                                />
                            </div>

                            <div className="col-span-2">
                                <Label>Ta'rif (RU)</Label>
                                <TextArea
                                    value={formState.productDescRu}
                                    onChange={(val) => setFormState({ ...formState, productDescRu: val })}
                                    error={formErrors.productDescRu}
                                />
                            </div>

                            {/* <div className="col-span-1">
                                <Label>Do‘kon</Label>
                                <Select
                                    options={shopOptions}
                                    value={shopOptions.find(opt => opt.value === formState.productShopId)}
                                    onChange={(selectedOption) => {
                                        setFormState({ ...formState, productShopId: selectedOption?.value || "" });
                                    }}
                                    error={formErrors.productShopId}
                                />
                            </div> */}

                            {/* <div className="col-span-1">
                                <Label>Kategoriya</Label>
                                <Select
                                    options={categoryOptions}
                                    value={categoryOptions.find(opt => opt.value === formState.productCategory)}
                                    onChange={(selectedOption) => {
                                        setFormState({
                                            ...formState,
                                            productCategory: selectedOption?.value || "",
                                            productSubCategory: "", // ❗subCategory reset qilinadi
                                        });
                                    }}
                                    error={formErrors.productCategory}
                                />


                            </div> */}


{/* 
                            <div className="col-span-1">
                                <Label>Subkategoriya</Label>
                                <Select
                                    options={subCategoryOptions}
                                    value={subCategoryOptions.find(opt => opt.value === formState.productSubCategory)}
                                    onChange={(selectedOption) => {
                                        setFormState({ ...formState, productSubCategory: selectedOption?.value || "" });
                                    }}
                                    disabled={subCategoryOptions.length === 0}
                                    error={formErrors.productSubCategory}
                                />


                            </div> */}



                            <div className="col-span-2">
                                <Label>Teglar</Label>
                                <Select
                                    isMulti
                                    options={tagOptions}
                                    value={tagOptions.filter(tag => formState.productTags.includes(tag.value))}
                                    onChange={(selectedOptions) => {
                                        const selected = Array.isArray(selectedOptions)
                                            ? selectedOptions.map((opt) => opt.value)
                                            : [];
                                        setFormState({ ...formState, productTags: selected });
                                    }}
                                    error={formErrors.productTags}
                                />


                            </div>
                        </>
                    )}
                </div>

                <div className="flex justify-between gap-3 mt-6">
                    <Button variant="outline" type="button" onClick={onClose}>Yopish</Button>
                    <div className="flex gap-3">
                        {step > 1 && <Button type="button" onClick={() => setStep(step - 1)} variant="custom" className="bg-[#fd521c] text-white hover:bg-[#e64816]">Oldingi</Button>}
                        {step < 2 && <Button type="button" onClick={() => setStep(step + 1)} variant="custom" className="bg-[#fd521c] text-white hover:bg-[#e64816]">Keyingi</Button>}
                        {step === 2 && <Button type="submit" variant="custom" className="bg-[#fd521c] text-white hover:bg-[#e64816]">Saqlash</Button>}
                    </div>
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
    required = true,
    placeholder,
    error,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    placeholder?: string;
    error?: string;
}) {
    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`w-full px-4 py-2 text-sm rounded-xl border transition-colors outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                    } dark:bg-gray-800 dark:text-white dark:border-gray-700`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}