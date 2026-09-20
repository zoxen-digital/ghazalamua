import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import ReviewsPreview from "@/components/home/ReviewsPreview";
import BookingCTA from "@/components/home/BookingCTA";
import { getHomepageContent, getServices, getGalleryItems, getReviews } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, services, gallery, reviews] = await Promise.all([
    getHomepageContent(),
    getServices(),
    getGalleryItems(),
    getReviews(),
  ]);

  return (
    <>
      <Hero content={content} />
      <AboutPreview content={content} />
      <ServicesPreview services={services} heading={content.servicesHeading} />
      <GalleryPreview items={gallery} heading={content.galleryHeading} />
      <ReviewsPreview reviews={reviews} heading={content.reviewsHeading} />
      <BookingCTA content={content} />
    </>
  );
}
