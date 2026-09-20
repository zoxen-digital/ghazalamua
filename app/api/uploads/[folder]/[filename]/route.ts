import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { validateUploadFolder, isSafeFilename } from "@/lib/uploads";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await params;

  if (!validateUploadFolder(folder) || !isSafeFilename(filename)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    await connectDB();
    const doc = await StoredUpload.findOne({ folder, filename }).lean();
    if (!doc) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const raw = doc.data as unknown;
    let buffer: Buffer;
    if (Buffer.isBuffer(raw)) {
      buffer = raw;
    } else if (raw && typeof raw === "object" && "buffer" in raw) {
      // MongoDB driver returns Buffer-typed fields as a BSON Binary wrapper when using .lean()
      buffer = Buffer.from((raw as { buffer: Uint8Array }).buffer);
    } else {
      buffer = Buffer.from(raw as ArrayBuffer);
    }

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": doc.mimeType,
        "Content-Length": String(buffer.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Serve upload error", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
