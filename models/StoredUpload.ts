import { Schema, model, models, type Model, type Document } from "mongoose";
import { UPLOAD_FOLDERS, type UploadFolder } from "@/lib/constants";

export { UPLOAD_FOLDERS };
export type { UploadFolder };

export interface IStoredUpload extends Document {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const StoredUploadSchema = new Schema<IStoredUpload>(
  {
    folder: { type: String, enum: UPLOAD_FOLDERS, required: true },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export default (models.StoredUpload as Model<IStoredUpload>) ||
  model<IStoredUpload>("StoredUpload", StoredUploadSchema);
