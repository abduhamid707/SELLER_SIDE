'use client';

import { PencilIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Spec {
    label: string;
    value: string;
}

interface B2BOrderCardProps {
    order: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        amount: number;
        platform_url: string;
        sku_info: {
            sku_img: string;
            imgs?: string[];
            specs: Spec[];
            shop_name: string;
        };
    };
    onEdit?: (order: any) => void;
}

export default function B2BOrderCard({ order, onEdit }: B2BOrderCardProps) {
    const images = order.sku_info.imgs?.length ? order.sku_info.imgs : [order.sku_info.sku_img];

    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            {/* Swiper Image Carousel */}
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="w-full h-60 sm:h-64"
            >
                {images.map((img, i) => (
                    <SwiperSlide key={i}>
                        <div className="relative w-full h-full">
                            <Image
                                src={img}
                                alt={`Buyurtma rasm ${i + 1}`}
                                fill
                                className="object-cover"
                            />

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 line-clamp-2 hover:underline">
                        {order.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 text-xs font-semibold rounded-lg">
                        <span className="opacity-80">ID:</span> {order.id}
                    </span>

                </div>

                <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {order.sku_info.specs.map((spec, idx) => (
                        <span key={idx} className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                            {spec.label}: {spec.value}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between flex-wrap text-sm text-gray-500 dark:text-gray-400">
                    <div>
                        Narxi:{" "}
                        <span className="font-semibold text-gray-800 dark:text-white">
                            {order.price.toLocaleString()} so'm
                        </span>
                    </div>
                    <div>
                        Soni:{" "}
                        <span className="font-semibold text-gray-800 dark:text-white">
                            {order.quantity}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        Umumiy: {order.amount.toLocaleString()} so'm
                    </span>
                    <button
                        onClick={() => onEdit?.(order)}
                        className="flex items-center px-3 py-1.5 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
                    >
                        <PlusCircle size={14} className="mr-1" />
                        Bozorga chiqarish
                    </button>
                </div>
            </div>
        </div>
    );
}
