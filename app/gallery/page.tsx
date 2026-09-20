import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getGalleryItems } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse real client transformations, bridal looks, party glam and behind-the-scenes videos.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-10">
        <SectionLabel>Gallery</SectionLabel>
        <h1 className="font-serif-display text-3xl md:text-4xl mt-2 text-[color:var(--color-text)]">
          Real Clients, Beautiful Moments
        </h1>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-[color:var(--color-muted)]">Gallery coming soon. Please check back!</p>
      ) : (
        <GalleryGrid items={items} />
      )}
    </div>
  );
}
