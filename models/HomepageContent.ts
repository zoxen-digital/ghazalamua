import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IHomepageContent extends Document {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  aboutImage: string;
  servicesHeading: string;
  galleryHeading: string;
  reviewsHeading: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaImage: string;
}

const HomepageContentSchema = new Schema<IHomepageContent>(
  {
    heroEyebrow: { type: String, default: "BEAUTY • CONFIDENCE • YOUR MOMENT" },
    heroTitle: { type: String, default: "Elegant Makeup for Your Special Moments" },
    heroDescription: {
      type: String,
      default:
        "Bridal, party & event makeup at home or on-location. Look and feel your most beautiful, wherever you are.",
    },
    heroImage: { type: String, default: "" },
    heroPrimaryButtonText: { type: String, default: "Book Now" },
    heroSecondaryButtonText: { type: String, default: "View Gallery" },
    aboutTitle: { type: String, default: "Hi, I'm Ghazala Qureshi" },
    aboutSubtitle: { type: String, default: "Professional Makeup Artist" },
    aboutDescription: {
      type: String,
      default:
        "I am a passionate professional makeup artist offering personalized beauty services from my home and at your location. Whether it's your wedding, a special event, or a night out, my goal is to help you look and feel your absolute best.",
    },
    aboutImage: { type: String, default: "" },
    servicesHeading: { type: String, default: "Beauty for Every Occasion" },
    galleryHeading: { type: String, default: "Real Clients, Beautiful Moments" },
    reviewsHeading: { type: String, default: "What My Clients Say" },
    ctaHeading: { type: String, default: "Let's Create Your Beautiful Moment" },
    ctaDescription: {
      type: String,
      default: "Ready to look and feel your best? Book your appointment today.",
    },
    ctaImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default (models.HomepageContent as Model<IHomepageContent>) ||
  model<IHomepageContent>("HomepageContent", HomepageContentSchema);
