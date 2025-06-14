import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Do‘konlar | TailAdmin - Next.js Admin Panel",
  description: "Bu sahifa orqali sellerlar o‘z do‘konlarini boshqarishi mumkin.",
};
export default function page() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Do'konlar" />
            <h1>Do'konlar</h1>
        </div>
    );
}
