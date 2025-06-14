import { useAuthStore } from "@/stores/authStore";

export const useProfileRequired = () => {
  const { seller } = useAuthStore();

  if (!seller) return false;

  const requiredFields = [
    seller.passport_serial_no,
  ];

  const isProfileComplete = requiredFields.every(Boolean);

  return seller.status === 3 && isProfileComplete;
};
