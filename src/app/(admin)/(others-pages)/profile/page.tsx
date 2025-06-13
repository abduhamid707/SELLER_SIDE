// app/(dashboard)/profile/page.tsx

import ProfileClient from "@/components/profile/ProfileClient";

export const metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Profile page for TailAdmin Dashboard Template",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
