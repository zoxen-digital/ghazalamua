import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IReview extends Document {
  customerName: string;
  review: string;
  rating: number;
  avatarUrl?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    customerName: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatarUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (models.Review as Model<IReview>) || model<IReview>("Review", ReviewSchema);
