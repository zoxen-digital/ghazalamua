import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import SiteSettings from "@/models/SiteSettings";
import HomepageContent from "@/models/HomepageContent";
import Service from "@/models/Service";
import GalleryItem from "@/models/GalleryItem";
import Review from "@/models/Review";
import { hashPassword } from "@/lib/auth";

export const runtime = "nodejs";

// One-time seed route. Guarded by matching ADMIN_EMAIL/ADMIN_PASSWORD env vars
// sent in the request body, so it cannot be triggered by an anonymous caller
// who doesn't already know the intended admin credentials.
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const expectedEmail = process.env.ADMIN_EMAIL;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedEmail || !expectedPassword) {
      return NextResponse.json(
        { success: false, error: "ADMIN_EMAIL/ADMIN_PASSWORD not configured on the server." },
        { status: 400 }
      );
    }

    if (email !== expectedEmail || password !== expectedPassword) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const existingAdmin = await AdminUser.findOne({ email: expectedEmail.toLowerCase() });
    if (!existingAdmin) {
      const passwordHash = await hashPassword(expectedPassword);
      await AdminUser.create({ email: expectedEmail.toLowerCase(), passwordHash });
    }

    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create({
        businessName: "Ghazala Qureshi",
        subtitle: "Professional Makeup Artist",
      });
    }

    const existingHomepage = await HomepageContent.findOne();
    if (!existingHomepage) {
      await HomepageContent.create({
        heroImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop",
        aboutImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
        ctaImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop",
      });
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
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
    }

    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      const bridalImgs = [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop",
      ];
      const partyImgs = [
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
      ];
      const eventImgs = [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
      ];
      const items = [];
      let sortOrder = 1;
      for (const [category, imgs] of [
        ["Bridal", bridalImgs],
        ["Party", partyImgs],
        ["Events", eventImgs],
      ] as [string, string[]][]) {
        for (const img of imgs) {
          items.push({
            title: `${category} Look`,
            type: "image",
            category,
            imageUrl: img,
            thumbnailUrl: img,
            active: true,
            sortOrder: sortOrder++,
          });
        }
      }
      // A couple more mixed images
      items.push(
        {
          title: "Transformation",
          type: "image",
          category: "Transformations",
          imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
          thumbnailUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
          active: true,
          sortOrder: sortOrder++,
        },
        {
          title: "Hairstyle",
          type: "image",
          category: "Hairstyles",
          imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop",
          thumbnailUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop",
          active: true,
          sortOrder: sortOrder++,
        },
        {
          title: "Behind the Scenes",
          type: "video",
          category: "Videos",
          imageUrl: "",
          videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          thumbnailUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop",
          active: true,
          sortOrder: sortOrder++,
        }
      );
      await GalleryItem.insertMany(items);
    }

    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      await Review.insertMany([
        {
          customerName: "Amina R.",
          review: "Ghazala did my bridal makeup and I felt absolutely stunning all day. It lasted through tears, dancing and photos!",
          rating: 5,
          sortOrder: 1,
        },
        {
          customerName: "Sara K.",
          review: "So professional and easy to talk to. My party makeup was exactly what I wanted — glam but still me.",
          rating: 5,
          sortOrder: 2,
        },
        {
          customerName: "Fatima N.",
          review: "She came to our venue on time and did an amazing job for our whole bridal party. Highly recommend!",
          rating: 5,
          sortOrder: 3,
        },
      ]);
    }

    return NextResponse.json({ success: true, message: "Seed complete." });
  } catch (err) {
    console.error("Seed error", err);
    return NextResponse.json({ success: false, error: "Server error while seeding." }, { status: 500 });
  }
}
