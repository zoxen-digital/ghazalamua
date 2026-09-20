import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { validateContactForm } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check — reject silently
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const { valid, errors } = validateContactForm(body);
    if (!valid) {
      return NextResponse.json({ success: false, error: errors.join(" ") }, { status: 400 });
    }

    await connectDB();
    await ContactMessage.create({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      eventType: body.eventType.trim(),
      preferredDate: body.preferredDate || "",
      location: body.location || "",
      message: body.message.trim(),
      status: "new",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error", err);
    return NextResponse.json({ success: false, error: "Server error. Please try again later." }, { status: 500 });
  }
}
