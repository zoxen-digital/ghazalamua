import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { verifyPassword, createSessionToken, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required." }, { status: 400 });
    }

    await connectDB();
    const user = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
    }

    const token = await createSessionToken({ email: user.email });
    await setSessionCookie(token);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin login error", err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
