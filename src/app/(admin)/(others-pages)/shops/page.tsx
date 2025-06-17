import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ShopClient from "@/components/shops/ShopClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Do‘konlar | TailAdmin - Next.js Admin Panel",
    description: "Bu sahifa orqali sellerlar o‘z do‘konlarini boshqarishi mumkin.",
};
export default function ShopPage() {
    return (<>
        <PageBreadcrumb pageTitle="Do'konlar" />
        <ShopClient />
    </>);
}

