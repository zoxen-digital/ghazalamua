export const GALLERY_CATEGORIES = [
  "Bridal",
  "Party",
  "Events",
  "Transformations",
  "Hairstyles",
  "Videos",
  "Other",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const MESSAGE_STATUSES = ["new", "contacted", "completed", "archived"] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];
