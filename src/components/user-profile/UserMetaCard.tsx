"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import { useUpdateEntity } from "@/hooks/useUpdateEntity";
import { SellerForm } from "@/interface/SellerForm";
import { cleanObject } from "@/utils/cleanObject";
import { sellerSchema } from "@/schemas/sellerSchema";

export default function UserMetaCard({ seller }: { seller: any }) {
  const keysToRemove = ["status", "created_at", "last_login_at", "_", "b2b_user_id", "card_holder", "card_number"] as const;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { mutate } = useUpdateEntity<SellerForm>();
  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formState, setFormState] = useState<SellerForm>({
    first_name: seller.first_name || "",
    second_name: seller.second_name || "",
    middle_name: seller.middle_name || "",
    extra_phone: seller.extra_phone || "",
    email: seller.email || "",
    address: seller.address || "",
    passport_serial_no: seller.passport_serial_no || "",
    register_date: seller.register_date || "",
    passport_no: seller.passport_no || "",
    jshshir: seller.jshshir || "",
    birth_date: seller.birth_date || "",
    register_passport_no: seller.register_passport_no || "",
    card_number: "",
    card_holder: "",
  });

const validateField = (name: string, value: string) => {
  try {
    sellerSchema.pick({ [name]: true }).parse({ [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: "" })); // ✅ Xato yo‘q bo‘lsa tozalaymiz
  } catch (error: any) {
    if (error?.errors?.[0]?.message) {
      setFormErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
    }
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormState((prev) => ({ ...prev, [name]: value }));

  validateField(name, value); // ✅ Real-time validatsiya
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) return;

    try {
      const validatedData = sellerSchema.parse(formState);

      // Agar validatsiya o‘tsa, xatoliklarni tozalaymiz
      setFormErrors({});

      const cleanedParams = cleanObject(validatedData, keysToRemove) as SellerForm;
      const cleanedOldParams = cleanObject(seller, keysToRemove) as SellerForm;

      mutate(
        {
          type: "seller",
          id: seller.id,
          params: cleanedParams,
          old_params: cleanedOldParams,
        },
        {
          onSuccess: () => {
            closeModal();
            setStep(1);
          },
        }
      );
    } catch (error: any) {
      if (error?.errors) {
        // Zod xatoliklarini field nomi bo‘yicha joylashtiramiz
        const errors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          errors[err.path[0]] = err.message;
        });
        setFormErrors(errors);
      }
    }
  };



  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

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
              <Button
                variant="custom"
                size="sm"
                onClick={seller.status === 3 ? openModal : undefined}
                disabled={seller.status !== 3}
                className={`border ${seller.status === 3
                  ? "bg-[#fd521c] text-white hover:bg-[#e64816] border-[#fd521c]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                  }`}
              >
                <FiEdit2 /> Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { closeModal(); setStep(1); }} className="max-w-[700px] m-4">
        <form className="p-6" onSubmit={handleSubmit}>
          <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Edit Profile Info</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Step {step} of 3</p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            {step === 1 && (
              <>


                <InputBlock
                  label="First Name"
                  name="first_name"
                  value={formState.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  error={formErrors.first_name}
                />

                <InputBlock
                  label="Second Name"
                  name="second_name"
                  value={formState.second_name}
                  onChange={handleChange}
                  placeholder="Enter your second name"
                  error={formErrors.second_name}
                />

                <InputBlock
                  label="Middle Name"
                  name="middle_name"
                  value={formState.middle_name}
                  onChange={handleChange}
                  placeholder="Enter your middle name"
                  error={formErrors.middle_name}
                />

                <InputBlock
                  label="Extra Phone"
                  name="extra_phone"
                  value={formState.extra_phone}
                  onChange={handleChange}
                  placeholder="Enter additional phone number"
                  error={formErrors.extra_phone}
                />

                <InputBlock
                  label="Email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email address"
                  error={formErrors.email}
                />

                <InputBlock
                  label="Address"
                  name="address"
                  value={formState.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  error={formErrors.address}
                />
              </>
            )}

            {step === 2 && (
              <>

                <InputBlock
                  label="Passport Serial No"
                  name="passport_serial_no"
                  value={formState.passport_serial_no}
                  onChange={handleChange}
                  placeholder="Enter passport serial number"
                  error={formErrors.passport_serial_no}
                />

                <InputBlock
                  label="Register Date"
                  name="register_date"
                  value={formState.register_date}
                  onChange={handleChange}
                  type="date"
                  placeholder="Select register date"
                  error={formErrors.register_date}
                />

                <InputBlock
                  label="Passport No"
                  name="passport_no"
                  value={formState.passport_no}
                  onChange={handleChange}
                  placeholder="Enter passport number"
                  error={formErrors.passport_no}
                />

                <InputBlock
                  label="Birth Date"
                  name="birth_date"
                  value={formState.birth_date}
                  onChange={handleChange}
                  type="date"
                  placeholder="Select birth date"
                  error={formErrors.birth_date}
                />

                <InputBlock
                  label="Register Passport No"
                  name="register_passport_no"
                  value={formState.register_passport_no}
                  onChange={handleChange}
                  placeholder="Enter register passport number"
                  error={formErrors.register_passport_no}
                />

                <InputBlock
                  label="Passport JSHSHIR"
                  name="jshshir"
                  value={formState.jshshir}
                  onChange={handleChange}
                  placeholder="Enter JSHSHIR code"
                  error={formErrors.jshshir}
                />

              </>
            )}

            {step === 3 && (
              <>

                <InputBlock
                  label="Card Number"
                  name="card_number"
                  value={formState.card_number}
                  onChange={handleChange}
                  placeholder="Enter card number"
                  error={formErrors.card_number}
                />

                <InputBlock
                  label="Card Holder"
                  name="card_holder"
                  value={formState.card_holder}
                  onChange={handleChange}
                  placeholder="Enter card holder name"
                  error={formErrors.card_holder}
                />
              </>
            )}
          </div>

          <div className="flex justify-between gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setStep(1);
                closeModal();
              }}
              type="button"
            >
              Close
            </Button>

            <div className="flex gap-3">
              {step > 1 && (
                <Button
                  type="button"
                  variant="custom"
                  onClick={prevStep}
                  className="border border-gray-300 text-gray-700"
                >
                  Previous
                </Button>
              )}

              {step < 3 && (
                <Button
                  type="button"
                  variant="custom"
                  onClick={nextStep}
                  className="bg-[#fd521c] text-white hover:bg-[#e64816]"
                >
                  Next Step
                </Button>
              )}

              {step === 3 && (
                <Button
                  type="submit" // ✅ Formani yakuniy submit qiladi
                  variant="custom"
                  className="bg-[#fd521c] text-white hover:bg-[#e64816]"
                >
                  Save Changes
                </Button>
              )}
            </div>


          </div>

        </form>
      </Modal>
    </>
  );
}

function InputBlock({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = true,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-sm rounded-xl border transition-colors outline-none focus:ring-2 focus:ring-orange-500 
          dark:bg-gray-800 dark:text-white dark:border-gray-700
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}
        `}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}


