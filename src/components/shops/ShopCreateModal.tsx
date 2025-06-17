"use client";

import { Modal } from "@/components/ui/modal";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { useCreateShop } from "@/hooks/useCreateShop";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    sellerId: number;
}

export interface CreateShopPayload {
    seller_id: number;
    name: string;
    url: string;
    details_uz: string;
    details_ru?: string;    
    image: string;
}

export default function ShopCreateModal({
    isOpen,
    onClose,
    sellerId,
}: Props) {
    const [shopName, setShopName] = useState("");
    const [shopNameUrl, setShopNameUrl] = useState("");
    const [shopDescUz, setShopDescUz] = useState("");
    const [shopDescRu, setShopDescRu] = useState("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const { mutate, isPending } = useCreateShop();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: CreateShopPayload = {
            seller_id: sellerId,
            name: shopName,
            url: shopNameUrl,
            details_uz: shopDescUz,
            details_ru: shopDescRu,
            image: imageUrl,
        };

        mutate(payload, {
            onSuccess: () => {
                onClose();
                setShopName("");
                setShopNameUrl("");
                setShopDescUz("");
                setShopDescRu("");
                setImageUrl("");
            },
            onError: (error) => {
                console.error("Do‘kon yaratishda xatolik:", error);
                alert("Xatolik yuz berdi");
            },
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6 lg:p-8">
            <form onSubmit={handleSubmit}>
                <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white/90">
                    Yangi do‘kon yaratish
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <Label>Do‘kon nomi</Label>
                        <Input
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label>Do‘kon URL (shopNameUrl)</Label>
                        <Input
                            value={shopNameUrl}
                            onChange={(e) => setShopNameUrl(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label>Tavsif (UZ)</Label>
                        <TextArea value={shopDescUz} onChange={setShopDescUz} required />
                    </div>

                    <div>
                        <Label>Tavsif (RU)</Label>
                        <TextArea value={shopDescRu} onChange={setShopDescRu} />
                    </div>

                    <div className="md:col-span-2">
                        <Label>Do‘kon rasmi</Label>
                        <ImageUpload value={imageUrl} onChange={setImageUrl} />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Bekor qilish
                    </Button>
                    <Button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        disabled={isPending}
                    >
                        {isPending ? "Yuklanmoqda..." : "Yaratish"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
