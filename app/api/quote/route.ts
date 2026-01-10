import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      serviceId,
      serviceName,
      answers,
      estimatedPrice,
      contactName,
      contactEmail,
      contactPhone,
      contactAddress,
      preferredDate,
      notes,
    } = body;

    // Validate required fields
    if (!contactName || !contactEmail) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Just return success if not configured (for development)
      console.log("Quote submission (Supabase not configured):", body);
      return NextResponse.json({ success: true, message: "Quote request received" });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("quote_submissions")
      .insert([
        {
          service_id: serviceId || null,
          service_name: serviceName || null,
          answers: answers || {},
          estimated_price: estimatedPrice || null,
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: contactPhone || null,
          contact_address: contactAddress || null,
          preferred_date: preferredDate || null,
          notes: notes || null,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting quote submission:", error);
      return NextResponse.json(
        { error: "Failed to submit quote request" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully",
      id: data.id,
    });
  } catch (err) {
    console.error("Error processing quote request:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

