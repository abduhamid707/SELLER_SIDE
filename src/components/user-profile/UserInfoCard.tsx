"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useUpdateSeller } from "@/hooks/useUpdateSeller";
import { useAuthStore } from "@/stores/authStore";
import { FiEdit2 } from "react-icons/fi";

export default function UserInfoCard({ seller }: { seller: any }) {
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate } = useUpdateSeller();
  const { setSeller } = useAuthStore();

  const [form, setForm] = useState({
    first_name: seller.first_name || "",
    second_name: seller.second_name || "",
    middle_name: seller.middle_name || "",
    birth_date: seller.birth_date || "",
      email: seller.email || "",
  extra_phone: seller.extra_phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { id: seller.id, data: { ...form } },
      {
        onSuccess: ({ data }) => {
          setSeller(data);
          closeModal();
        },
      }
    );
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-24">
              <Info label="First Name" value={seller.first_name} />
              <Info label="Second Name" value={seller.second_name} />
              <Info label="Middle Name" value={seller.middle_name} />
              <Info label="Birth Date" value={seller.birth_date} />
              <Info label="Email" value={seller.email} />
              <Info label="Extra Phone" value={seller.extra_phone} />
            </div>
          </div>

          <Button
            onClick={openModal}
            size="sm"
            variant="custom"
            className="bg-[#fd521c] text-white border-[#fd521c] hover:bg-[#e64816]"
          >
            <FiEdit2 /> Edit
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <form className="p-6" onSubmit={handleSave}>
          <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Edit Personal Info</h4>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <InputBlock label="First Name" name="first_name" value={form.first_name} onChange={handleChange} required />
            <InputBlock label="Second Name" name="second_name" value={form.second_name} onChange={handleChange} />
            <InputBlock label="Middle Name" name="middle_name" value={form.middle_name} onChange={handleChange} />
            <InputBlock label="Birth Date" name="birth_date" value={form.birth_date} onChange={handleChange} type="date" />
            <InputBlock label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
<InputBlock label="Extra Phone" name="extra_phone" value={form.extra_phone} onChange={handleChange} />

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
