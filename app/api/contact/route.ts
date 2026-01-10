import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Just return success if not configured (for development)
      console.log("Contact submission (Supabase not configured):", body);
      return NextResponse.json({ success: true, message: "Message received" });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          service: service || null,
          message,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting contact submission:", error);
      return NextResponse.json(
        { error: "Failed to submit message" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message submitted successfully",
      id: data.id,
    });
  } catch (err) {
    console.error("Error processing contact form:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

