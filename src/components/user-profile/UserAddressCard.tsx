"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useAuthStore } from "@/stores/authStore";
import { FiEdit2 } from "react-icons/fi";
import { useUpdateEntity } from "@/hooks/useUpdateEntity";

export default function UserPassportInfoCard({ seller }: { seller: any }) {
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate } = useUpdateEntity();
  const { setSeller } = useAuthStore();

  const [form, setForm] = useState({
    passport_serial_no: seller?.passport_serial_no || "",
    passport_no: seller?.passport_no || "",
    jshshir: seller?.jshshir || "",
    register_date: seller?.register_date || "",
    // register_passport_no: seller?.register_passport_no || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
        const { id, phone, forbid_login, _, status, b2b_user_id, created_at, last_login_at, ...rest } = seller;

    // mutate(
    //   { id, data: { ...rest, ...form } },
    //   {
    //     onSuccess: ({ data }) => {
    //       setSeller(data);
    //       closeModal();
    //     },
    //   }
    // );
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Passport Information
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-24">
              <Info label="Passport Serial No" value={seller.passport_serial_no} />
              <Info label="Passport No" value={seller.passport_no} />
              <Info label="JSHSHIR" value={seller.jshshir} />
              <Info label="Register Date" value={seller.register_date} />
              {/* <Info label="Registered Passport No" value={seller.register_passport_no} /> */}
            </div>
          </div>

     <Button
  variant="custom"
  size="sm"
  onClick={seller.status === 3 ? openModal : undefined}
  disabled={seller.status !== 3}
  className={`border ${
    seller.status === 3
      ? "bg-[#fd521c] text-white hover:bg-[#e64816] border-[#fd521c]"
      : "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
  }`}
>
  <FiEdit2 /> Edit
</Button>

        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <form className="p-6" onSubmit={handleSave}>
          <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Edit Passport Info
          </h4>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <InputBlock label="Passport Serial No" name="passport_serial_no" value={form.passport_serial_no} onChange={handleChange} />
            <InputBlock label="Passport No" name="passport_no" value={form.passport_no} onChange={handleChange} />
            <InputBlock label="JSHSHIR" name="jshshir" value={form.jshshir} onChange={handleChange} />
            <InputBlock label="Register Date" name="register_date" value={form.register_date} onChange={handleChange} type="date" />
            {/* <InputBlock label="Registered Passport No" name="register_passport_no" value={form.register_passport_no} onChange={handleChange} /> */}
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={closeModal} type="button">Close</Button>
            <Button type="submit" variant="custom" className="bg-[#fd521c] text-white border-[#fd521c] hover:bg-[#e64816]">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}:</p>
      <p className="text-sm font-medium text-gray-800 dark:text-white">{value || "-"}</p>
    </div>
  );
}

function InputBlock({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input name={name} value={value} onChange={onChange} type={type} required={required} />
    </div>
  );
}
