import { Schema, model, models, type Model, type Document } from "mongoose";

export interface ISiteSettings extends Document {
  businessName: string;
  subtitle: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  addressText: string;
  serviceArea: string;
  logoUrl: string;
  faviconUrl: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: "Ghazala Qureshi" },
    subtitle: { type: String, default: "Professional Makeup Artist" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    addressText: { type: String, default: "" },
    serviceArea: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    faviconUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default (models.SiteSettings as Model<ISiteSettings>) ||
  model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
