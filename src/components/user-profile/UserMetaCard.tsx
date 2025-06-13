"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Image from "next/image";
import { useUpdateSeller } from "@/hooks/useUpdateSeller";
import { useAuthStore } from "@/stores/authStore";
import { FiEdit2 } from "react-icons/fi";
export default function UserMetaCard({ seller }: { seller: any }) {
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate } = useUpdateSeller();
  const { setSeller } = useAuthStore();

  const [form, setForm] = useState({
    first_name: seller?.first_name || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { id: seller.id, data: { first_name: form.first_name.trim() } },
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
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image width={80} height={80} src="/images/user/owner.jpg" alt="user" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {seller.first_name}
              </h4>
              <div className="text-sm text-center text-gray-500 xl:text-left dark:text-gray-400">
                {seller.phone || "No Phone"}
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end bg-none">
              <Button variant="custom" size="sm" onClick={openModal} className="bg-[#fd521c] text-white hover:bg-[#e64816] border border-[#fd521c]"
              > <FiEdit2 /> Edit</Button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <form className="flex flex-col" onSubmit={handleSave}>
            <h4 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Profile Info
            </h4>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>First Name</Label>
                <Input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 justify-end">
              <Button variant="outline" onClick={closeModal} type="button">
                Close
              </Button>
              <Button type="submit" variant="custom" className="bg-[#fd521c] text-white hover:bg-[#e64816] border border-[#fd521c]">Save Changes</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
