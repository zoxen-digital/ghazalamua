import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import GalleryItem from "@/models/GalleryItem";
import Review from "@/models/Review";
import SiteSettings from "@/models/SiteSettings";
import HomepageContent from "@/models/HomepageContent";
import type {
  ServiceDTO,
  GalleryItemDTO,
  ReviewDTO,
  SiteSettingsDTO,
  HomepageContentDTO,
} from "@/types";

export async function getServices(): Promise<ServiceDTO[]> {
  try {
    await connectDB();
    const docs = await Service.find({ active: true }).sort({ sortOrder: 1, createdAt: 1 }).lean();
    return docs.map((d) => ({
      id: String(d._id),
      title: d.title,
      slug: d.slug,
      description: d.description,
      shortDescription: d.shortDescription || "",
      imageUrl: d.imageUrl || "",
      price: d.price,
      duration: d.duration,
      featured: !!d.featured,
      active: !!d.active,
      sortOrder: d.sortOrder || 0,
    }));
  } catch (err) {
    console.error("getServices failed", err);
    return [];
  }
}

export async function getGalleryItems(): Promise<GalleryItemDTO[]> {
  try {
    await connectDB();
    const docs = await GalleryItem.find({ active: true }).sort({ sortOrder: 1, createdAt: 1 }).lean();
    return docs.map((d) => ({
      id: String(d._id),
      title: d.title,
      type: d.type,
      category: d.category,
      imageUrl: d.imageUrl || "",
      videoUrl: d.videoUrl,
      thumbnailUrl: d.thumbnailUrl,
      description: d.description,
      featured: !!d.featured,
      active: !!d.active,
      sortOrder: d.sortOrder || 0,
    }));
  } catch (err) {
    console.error("getGalleryItems failed", err);
    return [];
  }
}

export async function getReviews(): Promise<ReviewDTO[]> {
  try {
    await connectDB();
    const docs = await Review.find({ active: true }).sort({ sortOrder: 1, createdAt: 1 }).lean();
    return docs.map((d) => ({
      id: String(d._id),
      customerName: d.customerName,
      review: d.review,
      rating: d.rating || 5,
      avatarUrl: d.avatarUrl,
      featured: !!d.featured,
      active: !!d.active,
      sortOrder: d.sortOrder || 0,
    }));
  } catch (err) {
    console.error("getReviews failed", err);
    return [];
  }
}

const DEFAULT_SETTINGS: SiteSettingsDTO = {
  businessName: "Ghazala Qureshi",
  subtitle: "Professional Makeup Artist",
  email: "",
  phone: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
  tiktok: "",
  addressText: "",
  serviceArea: "",
  logoUrl: "",
  faviconUrl: "",
};

export async function getSiteSettings(): Promise<SiteSettingsDTO> {
  try {
    await connectDB();
    const doc = await SiteSettings.findOne().lean();
    if (!doc) return DEFAULT_SETTINGS;
    return {
      businessName: doc.businessName || DEFAULT_SETTINGS.businessName,
      subtitle: doc.subtitle || DEFAULT_SETTINGS.subtitle,
      email: doc.email || "",
      phone: doc.phone || "",
      whatsapp: doc.whatsapp || "",
      instagram: doc.instagram || "",
      facebook: doc.facebook || "",
      tiktok: doc.tiktok || "",
      addressText: doc.addressText || "",
      serviceArea: doc.serviceArea || "",
      logoUrl: doc.logoUrl || "",
      faviconUrl: doc.faviconUrl || "",
    };
  } catch (err) {
    console.error("getSiteSettings failed", err);
    return DEFAULT_SETTINGS;
  }
}

const DEFAULT_HOMEPAGE: HomepageContentDTO = {
  heroEyebrow: "BEAUTY • CONFIDENCE • YOUR MOMENT",
  heroTitle: "Elegant Makeup for Your Special Moments",
  heroDescription:
    "Bridal, party & event makeup at home or on-location. Look and feel your most beautiful, wherever you are.",
  heroImage:
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop",
  heroPrimaryButtonText: "Book Now",
  heroSecondaryButtonText: "View Gallery",
  aboutTitle: "Hi, I'm Ghazala Qureshi",
  aboutSubtitle: "Professional Makeup Artist",
  aboutDescription:
    "I am a passionate professional makeup artist offering personalized beauty services from my home and at your location. Whether it's your wedding, a special event, or a night out, my goal is to help you look and feel your absolute best.",
  aboutImage:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
  servicesHeading: "Beauty for Every Occasion",
  galleryHeading: "Real Clients, Beautiful Moments",
  reviewsHeading: "What My Clients Say",
  ctaHeading: "Let's Create Your Beautiful Moment",
  ctaDescription: "Ready to look and feel your best? Book your appointment today.",
  ctaImage:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop",
};

export async function getHomepageContent(): Promise<HomepageContentDTO> {
  try {
    await connectDB();
    const doc = await HomepageContent.findOne().lean();
    if (!doc) return DEFAULT_HOMEPAGE;
    return {
      heroEyebrow: doc.heroEyebrow || DEFAULT_HOMEPAGE.heroEyebrow,
      heroTitle: doc.heroTitle || DEFAULT_HOMEPAGE.heroTitle,
      heroDescription: doc.heroDescription || DEFAULT_HOMEPAGE.heroDescription,
      heroImage: doc.heroImage || DEFAULT_HOMEPAGE.heroImage,
      heroPrimaryButtonText: doc.heroPrimaryButtonText || DEFAULT_HOMEPAGE.heroPrimaryButtonText,
      heroSecondaryButtonText: doc.heroSecondaryButtonText || DEFAULT_HOMEPAGE.heroSecondaryButtonText,
      aboutTitle: doc.aboutTitle || DEFAULT_HOMEPAGE.aboutTitle,
      aboutSubtitle: doc.aboutSubtitle || DEFAULT_HOMEPAGE.aboutSubtitle,
      aboutDescription: doc.aboutDescription || DEFAULT_HOMEPAGE.aboutDescription,
      aboutImage: doc.aboutImage || DEFAULT_HOMEPAGE.aboutImage,
      servicesHeading: doc.servicesHeading || DEFAULT_HOMEPAGE.servicesHeading,
      galleryHeading: doc.galleryHeading || DEFAULT_HOMEPAGE.galleryHeading,
      reviewsHeading: doc.reviewsHeading || DEFAULT_HOMEPAGE.reviewsHeading,
      ctaHeading: doc.ctaHeading || DEFAULT_HOMEPAGE.ctaHeading,
      ctaDescription: doc.ctaDescription || DEFAULT_HOMEPAGE.ctaDescription,
      ctaImage: doc.ctaImage || DEFAULT_HOMEPAGE.ctaImage,
    };
  } catch (err) {
    console.error("getHomepageContent failed", err);
    return DEFAULT_HOMEPAGE;
  }
}
