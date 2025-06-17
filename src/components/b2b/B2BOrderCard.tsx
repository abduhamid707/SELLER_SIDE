'use client';

import { PencilIcon } from "lucide-react";
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
                            {/* <Image
                src={img}
                alt={`Buyurtma rasm ${i + 1}`}
                fill
                className="object-cover"
                    /> */}
                            <img
                                src={img}
                                alt="order image"
                                className="w-full h-60 object-cover rounded-xl"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-3">
                    <a
                        href={order.platform_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-gray-800 dark:text-white/90 line-clamp-2 hover:underline"
                    >
                        {order.name}
                    </a>
                    <span className="inline-block bg-orange-100 text-orange-600 px-2 py-1 text-xs font-medium rounded-lg">
                        ID: {order.id}
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
                        <PencilIcon size={14} className="mr-1" />
                        Tahrirlash
                    </button>
                </div>
            </div>
        </div>
    );
}
