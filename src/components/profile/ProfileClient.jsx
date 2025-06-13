"use client";

import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { useAuthStore } from "@/stores/authStore";
import React from "react";

export default function ProfileClient() {
  const { seller } = useAuthStore();

  if (!seller) return null; // loader bo‘lsa yanada yaxshi

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile {seller.status}
        </h3>
        <div className="space-y-6">
          <UserMetaCard seller={seller} />
          <UserInfoCard seller={seller} />
          <UserAddressCard seller={seller} />
        </div>
      </div>
    </div>
  );
}
