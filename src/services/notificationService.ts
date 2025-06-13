// services/notificationService.ts
import BaseUrl from "@/services/axios";
import { useAuthStore } from "@/stores/authStore";

export const getNotifications = async () => {
  const { seller, token } = useAuthStore.getState(); // ✅ Zustand'dan olinadi
  console.log('token :', token);
  console.log('seller :', seller);

  if (!seller || !token) {
    console.warn("⚠️ Seller yoki token mavjud emas.");
    throw new Error("Autentifikatsiya qilinmagan");
  }

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const [approvedRes, declinedRes] = await Promise.all([
      BaseUrl.get(`seller/modiratings/seller/approve/${seller.id}`, tokenHeader),
      BaseUrl.get(`seller/modiratings/seller/decline/${seller.id}`, tokenHeader),
    ]);

    const approved = approvedRes.data.data || [];
    const declined = declinedRes.data.data || [];

    console.log("✅ Approved:", approved);
    console.log("❌ Declined:", declined);

    return [...approved, ...declined];
  } catch (error) {
    console.error("❌ Xatolik bildirishnomalarni olishda:", error);
    throw error;
  }
};

export const approveNotification = async (id: number) => {
  const { token } = useAuthStore.getState();

  if (!token) {
    console.warn("⚠️ Token mavjud emas.");
    throw new Error("Autentifikatsiya qilinmagan");
  }

  try {
// ✅ Faqat 2ta argument: URL va config
const res = await BaseUrl.get(`seller/modiratings/approve/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


    console.log("☑️ Approve response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Xatolik tasdiqlashda:", error);
    throw error;
  }
};
