import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import type { GalleryItemDTO } from "@/types";

export default function GalleryPreview({
  items,
  heading,
}: {
  items: GalleryItemDTO[];
  heading: string;
}) {
  return (
    <section className="bg-[color:var(--color-cream-3)]">
      <div className="container-x py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <SectionLabel>Gallery</SectionLabel>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-2 text-[color:var(--color-text)]">
              {heading}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--color-rose)] hover:underline"
          >
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>

        <GalleryGrid items={items} limit={11} showFilters />
      </div>
    </section>
  );
}
