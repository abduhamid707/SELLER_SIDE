"use client";

import React from "react";
import Image from "next/image";
import { PencilIcon } from "lucide-react";

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

interface Props {
  shop: Shop;
  onEdit?: (shop: Shop) => void; // optional: edit tugmasi uchun
}

export default function ShopCard({ shop, onEdit }: Props) {
  const isDisabled = shop.status === 1;
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 relative">
            <Image
              src={shop.image || "/images/placeholder.png"}
              alt={shop.name}
              fill
              className="rounded-full object-cover border border-gray-300 dark:border-gray-700"
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {shop.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {shop.id} | URL: <span className="underline">{shop.url}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEdit?.(shop)}
          disabled={isDisabled}
          className={`mt-4 sm:mt-0 inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg transition
            ${isDisabled
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
        >
          <PencilIcon size={16} className="mr-1" />
          Tahrirlash
        </button>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 text-sm">
        <div>
          <span className="block text-gray-500 dark:text-gray-400 mb-1">Do‘kon tavsifi (UZ):</span>
          <span className="font-semibold text-gray-800 dark:text-white">
            {shop.details_uz}
          </span>
        </div>

        {shop.details_ru && (
          <div className="mt-3">
            <span className="block text-gray-500 dark:text-gray-400 mb-1">Do‘kon tavsifi (RU):</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              {shop.details_ru}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
