"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, Loader2, Image as ImageIcon } from "lucide-react";
import { resolveImageUrl } from "@/lib/uploads";
import type { GalleryItemDTO } from "@/types";

export default function GalleryThumb({ item, onSelect }: { item: GalleryItemDTO; onSelect: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative aspect-square overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-cream-3)] text-left"
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-[color:var(--color-rose)]" />
        </div>
      )}
      <Image
        src={resolveImageUrl(item.thumbnailUrl || item.imageUrl)}
        alt={item.title}
        fill
        className={`object-cover transition-all duration-300 group-hover:scale-110 ${loaded ? "opacity-100" : "opacity-0"}`}
        sizes="(max-width: 768px) 50vw, 25vw"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      {item.type === "video" && loaded && (
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
  );
}
