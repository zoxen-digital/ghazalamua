import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
    return NextResponse.json({ success: true, services });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.description) {
      return NextResponse.json({ success: false, error: "Title and description are required." }, { status: 400 });
    }
    const slug = (body.slug || body.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    await connectDB();
    const service = await Service.create({ ...body, slug });
    return NextResponse.json({ success: true, service });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
