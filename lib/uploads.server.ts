import "server-only";
import { connectDB } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { isStoredUploadUrl, parseStoredUploadUrl, validateUploadFolder } from "@/lib/uploads";

export async function deleteStoredUploadByUrl(url?: string | null): Promise<void> {
  if (!isStoredUploadUrl(url)) return;
  const parsed = parseStoredUploadUrl(url as string);
  if (!parsed) return;
  if (!validateUploadFolder(parsed.folder)) return;
  try {
    await connectDB();
    await StoredUpload.deleteOne({ folder: parsed.folder, filename: parsed.filename });
  } catch (err) {
    console.error("Failed to delete stored upload", err);
  }
}
