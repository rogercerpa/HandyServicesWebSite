import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";

export const metadata = {
  title: "Admin Dashboard | Fix it, papa!",
  description: "Admin dashboard for managing Fix it, papa! website content",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Check if this is the login page
  // We handle this in the pages themselves for the login route
  
  if (!user) {
    return children; // Login page will be shown
  }

  // Check if user is admin
  const { data: admin } = await supabase
    .from("admins")
    .select("*")
    .eq("email", user.email)
    .single();

  if (!admin) {
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader admin={admin} />
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

