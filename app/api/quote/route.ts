import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
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
          service_id: null, // We use service_name instead of UUID reference
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

    // Send email notification to admin
    if (resend && process.env.ADMIN_EMAIL) {
      try {
        const formattedPrice = estimatedPrice 
          ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(estimatedPrice)
          : 'Not calculated';

        const answersHtml = Object.entries(answers || {})
          .map(([key, value]) => `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : value}</li>`)
          .join('');

        await resend.emails.send({
          from: 'Fix it, papa! <notifications@resend.dev>',
          to: process.env.ADMIN_EMAIL,
          subject: `New Quote Request: ${serviceName || 'General Inquiry'}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #00D4FF; border-bottom: 2px solid #00D4FF; padding-bottom: 10px;">
                New Quote Request
              </h1>
              
              <h2 style="color: #333;">Customer Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">
                    <a href="mailto:${contactEmail}">${contactEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">
                    ${contactPhone ? `<a href="tel:${contactPhone}">${contactPhone}</a>` : 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Address:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactAddress || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Preferred Date:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${preferredDate || 'Not specified'}</td>
                </tr>
              </table>

              <h2 style="color: #333; margin-top: 24px;">Service Details</h2>
              <p><strong>Service:</strong> ${serviceName || 'General Inquiry'}</p>
              <p><strong>Estimated Price:</strong> <span style="color: #00D4FF; font-size: 1.2em;">${formattedPrice}</span></p>
              
              ${answersHtml ? `
                <h3 style="color: #666;">Project Details</h3>
                <ul style="background: #f9f9f9; padding: 16px 32px; border-radius: 8px;">
                  ${answersHtml}
                </ul>
              ` : ''}

              ${notes ? `
                <h3 style="color: #666;">Additional Notes</h3>
                <p style="background: #f9f9f9; padding: 16px; border-radius: 8px;">${notes}</p>
              ` : ''}

              <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
              <p style="color: #888; font-size: 12px;">
                This quote request was submitted through your website. 
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/quotes">
                  View all quotes in the admin panel
                </a>
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("Error sending email notification:", emailError);
      }
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

