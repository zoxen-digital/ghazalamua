// Client-safe helpers only. Do NOT import mongoose/mongodb here —
// this file is imported by client components (ImageUploadField, GalleryGrid, etc.)
// Server-only helpers that touch the database live in lib/uploads.server.ts

export const UPLOAD_FOLDER_VALUES = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolderName = (typeof UPLOAD_FOLDER_VALUES)[number];

export const MAX_UPLOAD_SIZE = 8 * 1024 * 1024; // 8MB
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function validateUploadFolder(folder: string): folder is UploadFolderName {
  return (UPLOAD_FOLDER_VALUES as readonly string[]).includes(folder);
}

export function isStoredUploadUrl(url?: string | null): boolean {
  if (!url) return false;
  return url.startsWith("/api/uploads/");
}

export function resolveImageUrl(url?: string | null): string {
  if (!url) return "/images/placeholder-beauty.svg";
  if (url.startsWith("/uploads/")) return "/images/placeholder-beauty.svg";
  return url;
}

export function parseStoredUploadUrl(url: string): { folder: string; filename: string } | null {
  const match = url.match(/^\/api\/uploads\/([^/]+)\/([^/]+)$/);
  if (!match) return null;
  return { folder: match[1], filename: match[2] };
}

export function isSafeFilename(filename: string): boolean {
  return !filename.includes("..") && !filename.includes("/") && !filename.includes("\\");
}
