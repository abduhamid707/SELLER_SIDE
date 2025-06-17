'use client'

import { useHasHydrated } from "@/hooks/useHasHydrated";
import { useRouter } from "next/navigation";
import { useB2BStore } from "@/stores/b2bStore";
import { useEffect } from "react";

export default function ProtectedB2BRoute({ children }: { children: React.ReactNode }) {
  const hasHydrated = useHasHydrated();
  const b2bUser = useB2BStore((s) => s.b2bUser);
  const router = useRouter();

  const userExists = b2bUser?.data?.user?.id;

  useEffect(() => {
    if (!hasHydrated) return;

    if (!userExists) {
      router.replace("/b2b/account");
    }
  }, [userExists, hasHydrated, router]);

  if (!hasHydrated || !userExists) return null;

  return <>{children}</>;
}
