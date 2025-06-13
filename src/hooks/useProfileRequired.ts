import { useAuthStore } from "@/stores/authStore";

export const useProfileRequired = () => {
  const { seller } = useAuthStore();

  if (!seller) return false;

  const requiredFields = [
    seller.first_name,
    seller.address,
    seller.passport_no,
    seller.email,
  ];

  return requiredFields.every(Boolean); // barchasi bor bo‘lsa true
};
