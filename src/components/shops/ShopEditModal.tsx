"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { cleanObject } from "@/utils/cleanObject";
import { useUpdateEntity } from "@/hooks/useUpdateEntity";
import { FiEdit2 } from "react-icons/fi";
import { shopSchema } from "@/schemas/sellerSchema";
import { ImageUpload } from "./ImageUpload";

interface Shop {
    id: number;
    name: string;
    url: string;
    details_uz: string;
    details_ru?: string;
    image: string;
    seller_id: number;
    balance_id?: number | null;
    status: number;
    created_at: string;
}

export default function ShopEditModal({
    shop,
    isOpen,
    onClose,
    sellerId
}: {
    shop: Shop;
    isOpen: boolean;
    onClose: () => void;
    sellerId: number;
}) {
    const [step, setStep] = useState(1);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [imageUrl, setImageUrl] = useState(shop.image || "");


    const [formState, setFormState] = useState({
        name: shop.name || "",
        url: shop.url || "",
        image: shop.image || "",
        details_uz: shop.details_uz || "",
        details_ru: shop.details_ru || "",
    });

    const { mutate } = useUpdateEntity();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));

        try {
            shopSchema.pick({ [name]: true }).parse({ [name]: value });
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (error: any) {
            const msg = error?.errors?.[0]?.message;
            if (msg) setFormErrors((prev) => ({ ...prev, [name]: msg }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(1);

        if (step !== 2) return;

        try {
            const validatedData = shopSchema.parse(formState);
            console.log('validatedData :', validatedData);


            console.log('shop :', shop);


            mutate(
                {
                    type: "shops",
                    id: shop.id,
                    params: validatedData,
                    old_params: shop,
                    seller_id: sellerId
                },
                {
                    onSuccess: () => {
                        onClose(false);
                        setStep(1);
                    },
                }
            );
        } catch (error: any) {
            // console.log('error :', error);
            // const errors: Record<string, string> = {};
            // error.errors.forEach((err: any) => {
            //     errors[err.path[0]] = err.message;
            // });
            // setFormErrors(errors);
        }
    };
    const handleImageUpload = (url: string) => {
        setImageUrl(url);
        setFormState((prev) => ({ ...prev, image: url }));
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                disabled={shop.status !== 3}
                className={`mt-2 ${shop.status !== 3 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#fd521c] text-white hover:bg-[#e64816]"}`}
                startIcon={<FiEdit2 />}
            >
                Tahrirlash
            </Button>

            <Modal isOpen={isOpen} onClose={() => { onClose(false); setStep(1); }} className="max-w-[700px] m-4">
                <form onSubmit={handleSubmit} className="p-6">
                    <h4 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Do‘konni Tahrirlash</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Step {step} of 2</p>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        {step === 1 && (
                            <>
                                <InputBlock name="name" label="Do‘kon nomi" value={formState.name} onChange={handleChange} error={formErrors.name} />
                                <InputBlock name="url" label="Do‘kon URL" value={formState.url} onChange={handleChange} error={formErrors.url} />
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                                        Do‘kon rasmi
                                    </label>
                                    <ImageUpload
                                        value={imageUrl}
                                        onChange={handleImageUpload}
                                    />
                                </div>

                            </>
                        )}

                        {step === 2 && (
                            <>
                                <TextAreaBlock name="details_uz" label="Tavsif (UZ)" value={formState.details_uz} onChange={handleChange} error={formErrors.details_uz} />
                                <TextAreaBlock name="details_ru" label="Tavsif (RU)" value={formState.details_ru} onChange={handleChange} error={formErrors.details_ru} />
                            </>
                        )}
                    </div>

                    <div className="flex justify-between gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => onClose(false)}>Yopish</Button>

                        <div className="flex gap-3">
                            {step > 1 && <Button type="button" onClick={() => setStep(step - 1)} className="bg-[#fd521c] text-white hover:bg-[#e64816]" variant="custom">Oldingi</Button>}
                            {step < 2 && <Button type="button" variant="custom" onClick={() => setStep(step + 1)} className="bg-[#fd521c] text-white hover:bg-[#e64816]">Keyingi</Button>}
                            {step === 2 && <Button type="submit" variant="custom" className="bg-[#fd521c] text-white hover:bg-[#e64816]">Saqlash</Button>}
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}

function InputBlock({ label, name, value, onChange, error }: any) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{label}</label>
            <input
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className={`w-full rounded-lg border px-4 py-2 text-sm dark:bg-gray-800 dark:text-white ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}

function TextAreaBlock({ label, name, value, onChange, error }: any) {
    return (
        <div className="col-span-2">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{label}</label>
            <textarea
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                rows={3}
                className={`w-full rounded-lg border px-4 py-2 text-sm dark:bg-gray-800 dark:text-white ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}
