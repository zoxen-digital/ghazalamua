import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  price?: number;
  duration?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    price: { type: Number },
    duration: { type: String },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (models.Service as Model<IService>) || model<IService>("Service", ServiceSchema);
