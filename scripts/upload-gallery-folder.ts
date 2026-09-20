/**
 * One-time helper: uploads every image in ./gallery (project root) into MongoDB
 * (StoredUpload, folder="gallery") and creates a matching GalleryItem for each.
 *
 * After running this, the local ./gallery folder can be safely deleted —
 * the images live in MongoDB from that point on, served via /api/uploads/gallery/<filename>.
 *
 * Usage:
 *   set -a && source .env && set +a && npx tsx scripts/upload-gallery-folder.ts
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import mongoose from "mongoose";
import StoredUpload from "../models/StoredUpload";
import GalleryItem from "../models/GalleryItem";

const SOURCE_DIR = path.join(process.cwd(), "gallery");

const IMAGE_EXT_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

const VIDEO_EXT_MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
};

const MAX_VIDEO_SIZE = 15 * 1024 * 1024; // stay under MongoDB's 16MB document limit

function titleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim() || "Gallery Photo";
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Folder not found: ${SOURCE_DIR}\nCreate a "gallery" folder in the project root and add images to it first.`);
  }

  const allFiles = fs.readdirSync(SOURCE_DIR).sort();
  const files = allFiles.filter(
    (f) => IMAGE_EXT_MIME[path.extname(f).toLowerCase()] || VIDEO_EXT_MIME[path.extname(f).toLowerCase()]
  );

  if (files.length === 0) {
    console.log("No supported images/videos found in ./gallery (jpg, jpeg, png, webp, gif, mp4, mov, webm).");
    return;
  }

  await mongoose.connect(uri);
  console.log(`Connected to MongoDB. Found ${files.length} file(s) to upload.`);

  const existingCount = await GalleryItem.countDocuments();
  let sortOrder = existingCount;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const isVideo = !!VIDEO_EXT_MIME[ext];
    const mimeType = isVideo ? VIDEO_EXT_MIME[ext] : IMAGE_EXT_MIME[ext];
    const filePath = path.join(SOURCE_DIR, file);
    const buffer = fs.readFileSync(filePath);

    if (isVideo && buffer.length > MAX_VIDEO_SIZE) {
      console.warn(`Skipping ${file}: video is larger than 15MB, not safe to store in MongoDB.`);
      continue;
    }

    const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;

    await StoredUpload.create({
      folder: "gallery",
      filename,
      mimeType,
      size: buffer.length,
      data: buffer,
    });

    const url = `/api/uploads/gallery/${filename}`;

    await GalleryItem.create({
      title: titleFromFilename(file),
      type: isVideo ? "video" : "image",
      category: isVideo ? "Videos" : "Other",
      imageUrl: isVideo ? "" : url,
      videoUrl: isVideo ? url : "",
      thumbnailUrl: "",
      description: "",
      featured: false,
      active: true,
      sortOrder: sortOrder++,
    });

    console.log(`Uploaded: ${file} -> ${url}`);
  }

  console.log(`Done. You can now delete the ./gallery folder.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
