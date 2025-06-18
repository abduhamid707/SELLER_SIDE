// app/products/skus/[id]/page.tsx

import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SkusClient from "@/components/products/SkuClient/SkuClient";

export const metadata: Metadata = {
  title: "Mahsulot SKUs",
  description: "Bu sahifa orqali mahsulotlar uchun SKUs ro‘yxati ko‘rsatiladi.",
};

export default function SkusPage({ params }: { params: { id: string } }) {
  const productId = params.id;

  return (
    <ProtectedRoute>
      <PageBreadcrumb pageTitle="Mahsulot SKUs" />
      <SkusClient productId={productId} />
    </ProtectedRoute>
  );
}
