import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import Review from "@/models/Review";
import { ALLOWED_MIME_TYPES, MAX_UPLOAD_SIZE } from "@/lib/uploads";

export const runtime = "nodejs";

const EXT_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

// Public endpoint: anyone can submit a review (with or without a photo).
// Submissions are stored inactive until an admin approves them in /admin/reviews.
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const customerName = formData.get("customerName");
    const review = formData.get("review");
    const ratingRaw = formData.get("rating");
    const image = formData.get("image");
    const honeypot = formData.get("company");

    // Honeypot: bots fill hidden fields, humans don't.
    if (typeof honeypot === "string" && honeypot.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (typeof customerName !== "string" || !customerName.trim()) {
      return NextResponse.json({ success: false, error: "Please enter your name." }, { status: 400 });
    }
    if (typeof review !== "string" || !review.trim()) {
      return NextResponse.json({ success: false, error: "Please enter your review." }, { status: 400 });
    }

    const rating = Math.min(5, Math.max(1, Number(ratingRaw) || 5));

    await connectDB();

    let avatarUrl = "";
    if (image instanceof File && image.size > 0) {
      if (!ALLOWED_MIME_TYPES.includes(image.type)) {
        return NextResponse.json({ success: false, error: "Unsupported image type." }, { status: 400 });
      }
      if (image.size > MAX_UPLOAD_SIZE) {
        return NextResponse.json({ success: false, error: "Image is too large (max 8MB)." }, { status: 400 });
      }
      const ext = EXT_MAP[image.type] || "bin";
      const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
      const buffer = Buffer.from(await image.arrayBuffer());
      await StoredUpload.create({ folder: "misc", filename, mimeType: image.type, size: image.size, data: buffer });
      avatarUrl = `/api/uploads/misc/${filename}`;
    }

    await Review.create({
      customerName: customerName.trim().slice(0, 80),
      review: review.trim().slice(0, 1000),
      rating,
      avatarUrl,
      featured: false,
      active: false, // requires admin approval before it appears publicly
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Review submit error", err);
    return NextResponse.json({ success: false, error: "Server error. Please try again." }, { status: 500 });
  }
}
