"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useState } from "react";
import InputField from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { useAuthStore } from "@/stores/authStore";
import { useB2BStore } from "@/stores/b2bStore";
import { confirmB2BCode, registerB2B } from "@/services/b2b/b2bService";
import { useRouter } from "next/navigation"; // ⬅️ import qo‘shiladi

export default function B2BAccountPage() {
  const [b2bId, setB2bId] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"initial" | "code">("initial");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const token = useAuthStore((s) => s.token);
  const seller = useAuthStore((s) => s.seller);
  const setB2BUser = useB2BStore((s) => s.setB2BUser);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const data = await registerB2B(b2bId, token!);
      setMessage("B2B ID topildi. Endi kodni kiriting.");
      setStep("code");
      setLoading(false);
    } catch (err: any) {
      setMessage(err.message || "Xatolik yuz berdi");
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const data = await confirmB2BCode(code, seller!.id, token!);
      setB2BUser(data); // zustand storenga yozamiz
      setMessage("B2B akkaunt muvaffaqiyatli ulandi!");
      setLoading(false);
      router.push("/b2b/orders");
    } catch (err: any) {
      setMessage(err.message || "Kod xato bo'lishi mumkin");
      setLoading(false);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="B2B Accountni ulash" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="max-w-md space-y-4">
          {step === "initial" && (
            <>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                B2B ID ni kiriting
              </label>
              <InputField
                value={b2bId}
                onChange={(e) => setB2bId(e.target.value)}
                placeholder="B2B ID"
                required
              />
              <Button onClick={handleRegister} disabled={loading}
                variant="custom"

                className="bg-[#fd521c] text-white hover:bg-[#e64816]"
              >
                {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
              </Button>
            </>
          )}

          {step === "code" && (
            <>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Telefoningizga kelgan kodni kiriting
              </label>
              <InputField
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Tasdiqlash kodi"
                required
              />
              <Button onClick={handleConfirm} disabled={loading}
                variant="custom"

                className="bg-[#fd521c] text-white hover:bg-[#e64816]"

              >
                {loading ? "Tasdiqlanmoqda..." : "Kod yuborish"}
              </Button>
            </>
          )}

          {message && (
            <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
