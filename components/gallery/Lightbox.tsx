"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { resolveImageUrl } from "@/lib/uploads";
import type { GalleryItemDTO } from "@/types";

export default function Lightbox({ item, onClose }: { item: GalleryItemDTO; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-[color:var(--color-blush-3)]"
        >
          <X size={28} />
        </button>
        {item.type === "video" ? (
          <video
            src={item.videoUrl}
            controls
            autoPlay
            className="w-full max-h-[80vh] rounded-lg bg-black"
          />
        ) : (
          <div className="relative w-full h-[70vh]">
            <Image
              src={resolveImageUrl(item.imageUrl)}
              alt={item.title}
              fill
              className="object-contain rounded-lg"
              sizes="100vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}
