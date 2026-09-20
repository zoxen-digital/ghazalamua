import { Schema, model, models, type Model, type Document } from "mongoose";
import { MESSAGE_STATUSES, type MessageStatus } from "@/lib/constants";

export { MESSAGE_STATUSES };
export type { MessageStatus };

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate?: string;
  location?: string;
  message: string;
  status: MessageStatus;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: { type: String, required: true },
    preferredDate: { type: String, default: "" },
    location: { type: String, default: "" },
    message: { type: String, required: true },
    status: { type: String, enum: MESSAGE_STATUSES, default: "new" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (models.ContactMessage as Model<IContactMessage>) ||
  model<IContactMessage>("ContactMessage", ContactMessageSchema);
