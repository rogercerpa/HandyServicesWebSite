import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { eventType, pagePath, serviceId, metadata, sessionId } = body;

    // Validate required fields
    if (!eventType) {
      return NextResponse.json(
        { error: "Event type is required" },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Just return success if not configured
      return NextResponse.json({ success: true });
    }

    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || null;
    const forwardedFor = headersList.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : null;

    const supabase = await createClient();

    const { error } = await supabase
      .from("analytics_events")
      .insert([
        {
          event_type: eventType,
          page_path: pagePath || null,
          service_id: serviceId || null,
          metadata: metadata || {},
          session_id: sessionId || null,
          user_agent: userAgent,
          ip_address: ipAddress,
        },
      ]);

    if (error) {
      console.error("Error inserting analytics event:", error);
      // Don't return error to client for analytics
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error processing analytics event:", err);
    // Don't return error to client for analytics
    return NextResponse.json({ success: true });
  }
}

