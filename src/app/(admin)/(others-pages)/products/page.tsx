import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductClient from "@/components/products/ProductClient";
// import ProductClient from "@/components/products/ProductClient"; // agar mavjud bo‘lsa
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Mahsulotlar ",
  description: "Bu sahifa orqali sellerlar o‘z mahsulotlarini ko‘rishi va boshqarishi mumkin.",
};

export default function ProductPage() {
  return (
    <>
      <ProtectedRoute>
        <PageBreadcrumb pageTitle="Mahsulotlar" />
        <ProductClient />
      </ProtectedRoute>
    </>
  );
}
