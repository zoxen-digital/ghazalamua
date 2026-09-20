export type ServiceDTO = {
  id: string;
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
};

export type GalleryItemDTO = {
  id: string;
  title: string;
  type: "image" | "video";
  category: string;
  imageUrl: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

export type ReviewDTO = {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  avatarUrl?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

export type SiteSettingsDTO = {
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
};

export type HomepageContentDTO = {
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
};

export type ContactMessageDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate?: string;
  location?: string;
  message: string;
  status: "new" | "contacted" | "completed" | "archived";
  createdAt: string;
};
