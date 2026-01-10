import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user is admin before allowing redirect
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: admin } = await supabase
          .from("admins")
          .select("id")
          .eq("email", user.email)
          .single();

        if (admin) {
          const forwardedHost = request.headers.get("x-forwarded-host");
          const isLocalEnv = process.env.NODE_ENV === "development";
          
          if (isLocalEnv) {
            return NextResponse.redirect(`${origin}${next}`);
          } else if (forwardedHost) {
            return NextResponse.redirect(`https://${forwardedHost}${next}`);
          } else {
            return NextResponse.redirect(`${origin}${next}`);
          }
        }
      }

      // Not an admin, sign out and redirect with error
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}

