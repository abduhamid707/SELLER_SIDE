"use client";

import { PencilIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useState } from "react";
import SkuCreateModal from "./SkuClient/SkuCreateModal";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";

export function ProductCard({ product, onEdit }: any) {
  const [isSkuModalOpen, setIsSkuModalOpen] = useState(false);
  const { seller } = useAuthStore();
  const sellerId = seller?.id;
  return (
    <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Swiper Image Carousel */}
      {/* Swiper Image Carousel */}
      {/* Image + Title Link */}
      <Link href={`/product/skus/${product.id}`}>
        <div className=" cursor-pointer">
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full h-60 sm:h-64 rounded-t-2xl overflow-hidden"
          >
            {product.images?.map((img: string, i: number) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`Product image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Tahrirlash tugmasi alohida qoladi */}

        </div>
      </Link>
      <button

        onClick={(e) => {
          e.stopPropagation(); // ✅ Link ichidagi bubblingni to‘xtatish
          onEdit?.(product);
        }}
        className="absolute top-0 right-0 z-10 p-3 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center transition"
      >
        <PencilIcon size={18} className="mr-1" />
      </button>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-3">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 line-clamp-2">
            {product.name_uz}
          </h4>
          <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 text-xs font-semibold rounded-lg">
            <span className="opacity-80">ID:</span> {product.id}
          </span>

        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.details_uz}
        </p>

        <div className="flex justify-between flex-wrap text-sm text-gray-500 dark:text-gray-400">
          <div>
            Narxi:{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {product.price} so'm
            </span>
          </div>
          <div>
            Soni:{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              {product.count}
            </span>
          </div>
        </div>

        {/* Sotilgan / Qolgan */}
        <div className="text-xs text-gray-500 dark:text-gray-400 pt-2">
          Sotilgan: {product.sold_count} | Qolgan: {product.left_count}
        </div>

        {/* SKU qo‘shish */}
        <div className="pt-2">
          <button
            onClick={() => setIsSkuModalOpen(true)}
            className="w-full flex justify-center items-center px-3 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
          >
            <PlusIcon size={14} className="mr-1" />
            SKU qo‘shish
          </button>
        </div>




      </div>

      <SkuCreateModal
        isOpen={isSkuModalOpen}
        onClose={() => setIsSkuModalOpen(false)}
        product={product}
        sellerId={sellerId}
      />
    </div>
  );
}
