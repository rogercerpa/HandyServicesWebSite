"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function getAdminUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data: admin } = await supabase
    .from("admins")
    .select("*")
    .eq("email", user.email)
    .single();
  
  if (!admin) return null;
  
  return {
    ...user,
    adminName: admin.name,
    adminId: admin.id,
  };
}

