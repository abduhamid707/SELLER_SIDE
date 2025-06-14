"use client";

import React from "react";

export default function UserInfoCard({ seller }: { seller: any }) {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
        Personal Information
      </h4>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-24">
        <Info label="First Name" value={seller.first_name} />
        <Info label="Second Name" value={seller.second_name} />
        <Info label="Middle Name" value={seller.middle_name} />
        <Info label="Phone" value={seller.phone} />
        <Info label="Extra Phone" value={seller.extra_phone} />
        <Info label="Email" value={seller.email} />
        <Info label="Address" value={seller.address} />
        <Info label="JSHSHIR" value={seller.jshshir} />
        <Info label="Passport Serial No" value={seller.passport_serial_no} />
        <Info label="Register Date" value={seller.register_date} />
        <Info label="Passport No" value={seller.passport_no} />
        <Info label="Birth Date" value={seller.birth_date} />
        <Info label="Register Passport No" value={seller.register_passport_no} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}:</p>
      <p className="text-sm font-medium text-gray-800 dark:text-white">
        {value !== null && value !== undefined && value !== "" ? value : "-"}
      </p>
    </div>
  );
}
