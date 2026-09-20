/**
 * Standalone seed script (alternative to POST /api/admin/seed).
 * Usage: npx tsx scripts/seed.ts
 * Requires MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD in your environment (.env.local).
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser";
import SiteSettings from "../models/SiteSettings";
import HomepageContent from "../models/HomepageContent";
import Service from "../models/Service";
import GalleryItem from "../models/GalleryItem";
import Review from "../models/Review";

async function main() {
  const uri = process.env.MONGODB_URI;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!uri) throw new Error("MONGODB_URI is required");
  if (!adminEmail || !adminPassword) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const existingAdmin = await AdminUser.findOne({ email: adminEmail.toLowerCase() });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await AdminUser.create({ email: adminEmail.toLowerCase(), passwordHash });
    console.log("Created admin user");
  }

  if (!(await SiteSettings.findOne())) {
    await SiteSettings.create({ businessName: "Ghazala Qureshi", subtitle: "Professional Makeup Artist" });
    console.log("Created site settings");
  }

  if (!(await HomepageContent.findOne())) {
    await HomepageContent.create({
      heroImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop",
      aboutImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
      ctaImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop",
    });
    console.log("Created homepage content");
  }

  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany([
      {
        title: "Bridal Makeup",
        slug: "bridal-makeup",
        description: "Flawless, elegant and long-lasting makeup for your special day.",
        shortDescription: "Flawless, elegant and long-lasting makeup for your special day.",
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        sortOrder: 1,
      },
      {
        title: "Party Makeup",
        slug: "party-makeup",
        description: "Beautiful glamorous looks for parties, celebrations and special evenings.",
        shortDescription: "Beautiful glamorous looks for parties, celebrations and special evenings.",
        imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
        sortOrder: 2,
      },
      {
        title: "Event Glam",
        slug: "event-glam",
        description: "Elegant makeup for birthdays, formal events and special occasions.",
        shortDescription: "Elegant makeup for birthdays, formal events and special occasions.",
        imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
        sortOrder: 3,
      },
      {
        title: "Home & On-Location",
        slug: "home-on-location",
        description: "Professional makeup services available at my location or yours.",
        shortDescription: "Professional makeup services available at my location or yours.",
        imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
        sortOrder: 4,
      },
    ]);
    console.log("Created services");
  }

  if ((await GalleryItem.countDocuments()) === 0) {
    await GalleryItem.insertMany([
      { title: "Bridal Look", type: "image", category: "Bridal", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop", thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop", sortOrder: 1 },
      { title: "Bridal Look", type: "image", category: "Bridal", imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop", thumbnailUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop", sortOrder: 2 },
      { title: "Party Look", type: "image", category: "Party", imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop", thumbnailUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop", sortOrder: 3 },
      { title: "Party Look", type: "image", category: "Party", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop", thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop", sortOrder: 4 },
      { title: "Event Look", type: "image", category: "Events", imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop", thumbnailUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop", sortOrder: 5 },
      { title: "Event Look", type: "image", category: "Events", imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop", thumbnailUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop", sortOrder: 6 },
      { title: "Transformation", type: "image", category: "Transformations", imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop", thumbnailUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop", sortOrder: 7 },
      { title: "Hairstyle", type: "image", category: "Hairstyles", imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop", thumbnailUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop", sortOrder: 8 },
      { title: "Behind the Scenes", type: "video", category: "Videos", imageUrl: "", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", thumbnailUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop", sortOrder: 9 },
    ]);
    console.log("Created gallery items");
  }

  if ((await Review.countDocuments()) === 0) {
    await Review.insertMany([
      { customerName: "Amina R.", review: "Ghazala did my bridal makeup and I felt absolutely stunning all day. It lasted through tears, dancing and photos!", rating: 5, sortOrder: 1 },
      { customerName: "Sara K.", review: "So professional and easy to talk to. My party makeup was exactly what I wanted — glam but still me.", rating: 5, sortOrder: 2 },
      { customerName: "Fatima N.", review: "She came to our venue on time and did an amazing job for our whole bridal party. Highly recommend!", rating: 5, sortOrder: 3 },
    ]);
    console.log("Created reviews");
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
