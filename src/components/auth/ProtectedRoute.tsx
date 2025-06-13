'use client'
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { useProfileRequired } from "@/hooks/useProfileRequired";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const hasHydrated = useHasHydrated();
  const { token } = useAuthStore();
  const router = useRouter();
  const profileComplete = useProfileRequired();

  useEffect(() => {
    if (!hasHydrated) return;

    if (!token) {
      router.replace("/signin");
    } else if (!profileComplete) {
      router.replace("/profile"); // or /complete-profile if that's your route
    }
  }, [token, profileComplete, hasHydrated, router]);
  console.log('profileComplete :', profileComplete);

  if (!hasHydrated || !token || !profileComplete) return null;

  return <>{children}</>;
}
