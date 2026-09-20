import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import { getAdminSession } from "@/lib/auth";
import { deleteStoredUploadByUrl } from "@/lib/uploads.server";

export const runtime = "nodejs";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const existing = await Review.findById(id);
    if (!existing) return NextResponse.json({ success: false, error: "Not found." }, { status: 404 });

    const oldAvatar = existing.avatarUrl;
    Object.assign(existing, body);
    await existing.save();

    if (body.avatarUrl && oldAvatar && oldAvatar !== body.avatarUrl) {
      await deleteStoredUploadByUrl(oldAvatar);
    }

    return NextResponse.json({ success: true, review: existing });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });

  try {
    const { id } = await params;
    await connectDB();
    const existing = await Review.findByIdAndDelete(id);
    if (existing?.avatarUrl) await deleteStoredUploadByUrl(existing.avatarUrl);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
