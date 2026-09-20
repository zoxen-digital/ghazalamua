import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HomepageContent from "@/models/HomepageContent";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const content = await HomepageContent.findOne().lean();
    return NextResponse.json({ success: true, content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  try {
    const body = await req.json();
    await connectDB();
    const content = await HomepageContent.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    return NextResponse.json({ success: true, content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
