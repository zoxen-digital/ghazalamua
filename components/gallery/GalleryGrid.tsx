"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PlayCircle, Heart, ImageIcon } from "lucide-react";
import FilterPills from "@/components/gallery/FilterPills";
import Lightbox from "@/components/gallery/Lightbox";
import { resolveImageUrl } from "@/lib/uploads";
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
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-[color:var(--color-border)] text-left"
          >
            <Image
              src={resolveImageUrl(item.thumbnailUrl || item.imageUrl)}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {item.type === "video" && (
              <>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <PlayCircle size={40} className="text-white drop-shadow" />
                </div>
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                  0:06
                </span>
                <span className="absolute bottom-2 right-2 text-white">
                  <ImageIcon size={14} />
                </span>
              </>
            )}
          </button>
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
