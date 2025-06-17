"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProtectedB2BRoute from "@/components/auth/ProtectedB2BRoute";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import { useB2BOrders } from "@/hooks/b2b/useB2BOrders";
import React from "react";
import B2bClient from "@/components/b2b/B2bClient";

export default function B2BOrdersPage() {
 

    return (
        <ProtectedRoute>
            {/* <ProtectedB2BRoute> */}
                <PageBreadcrumb pageTitle="B2B Buyurtmalar" />
                <B2bClient />
            {/* </ProtectedB2BRoute> */}
        </ProtectedRoute>
    );
}
