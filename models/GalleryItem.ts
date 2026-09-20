import { Schema, model, models, type Model, type Document } from "mongoose";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/constants";

export { GALLERY_CATEGORIES };
export type { GalleryCategory };

export interface IGalleryItem extends Document {
  title: string;
  type: "image" | "video";
  category: GalleryCategory;
  imageUrl: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    category: { type: String, enum: GALLERY_CATEGORIES, required: true },
    imageUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (models.GalleryItem as Model<IGalleryItem>) ||
  model<IGalleryItem>("GalleryItem", GalleryItemSchema);
