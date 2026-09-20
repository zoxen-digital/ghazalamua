import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default (models.AdminUser as Model<IAdminUser>) || model<IAdminUser>("AdminUser", AdminUserSchema);
