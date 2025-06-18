import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SkusClient from "@/components/products/SkuClient/SkuClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Mahsulot SKUs",
    description: "Bu sahifa orqali mahsulotlar uchun SKUs ro‘yxati ko‘rsatiladi.",
};

export default function SkusPage() {
    return (
        <ProtectedRoute>
            <PageBreadcrumb pageTitle="Mahsulot SKUs" />
            <SkusClient /> {/* Yoki agar mavjud bo‘lsa <SkuClient /> */}
        </ProtectedRoute>
    );
}
