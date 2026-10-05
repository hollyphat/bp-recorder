import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <DashboardClient
      userId={data.user.id}
      userEmail={data.user.email ?? ""}
      userAvatar={data.user.user_metadata?.avatar_url ?? null}
    />
  );
}
