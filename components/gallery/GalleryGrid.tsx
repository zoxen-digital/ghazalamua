"use client";

import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import FilterPills from "@/components/gallery/FilterPills";
import Lightbox from "@/components/gallery/Lightbox";
import GalleryThumb from "@/components/gallery/GalleryThumb";
import type { GalleryItemDTO } from "@/types";

export default function GalleryGrid({
  items,
  limit,
  showFilters = true,
}: {
  items: GalleryItemDTO[];
  limit?: number;
  showFilters?: boolean;
}) {
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<GalleryItemDTO | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);
  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      {showFilters && (
        <div className="mb-8">
          <FilterPills categories={categories} active={active} onChange={setActive} />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayed.map((item) => (
          <GalleryThumb key={item.id} item={item} onSelect={() => setSelected(item)} />
        ))}

        {limit && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-[color:var(--color-pink-soft)] p-4 text-center aspect-square">
            <Heart size={22} className="text-[color:var(--color-rose)]" />
            <p className="text-sm font-medium text-[color:var(--color-text-2)]">
              More Beautiful Moments Ahead
            </p>
          </div>
        )}
      </div>

      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
