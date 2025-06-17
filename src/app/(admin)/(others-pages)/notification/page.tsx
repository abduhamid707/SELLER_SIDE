// app/(admin)/(others-pages)/notification/page.tsx
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { NotificationsList } from "@/components/notifications/notificationsList";

export const metadata: Metadata = {
  title: "Next.js Notification | TailAdmin - Next.js Dashboard Template",
  description: "This is Notification page for TailAdmin Dashboard Template",
};

export default function NotificationPage() {
  return (
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Notifications" />
        <NotificationsList />
      </div>
  );
}
