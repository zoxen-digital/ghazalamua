import Image from "next/image";
import { resolveImageUrl } from "@/lib/uploads";
import type { ServiceDTO } from "@/types";

export default function ServiceCard({ service, image }: { service: ServiceDTO; image?: string }) {
  return (
    <div className="group bg-white rounded-xl border border-[color:var(--color-border)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image ?? resolveImageUrl(service.imageUrl)}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif-display text-lg font-bold text-[color:var(--color-text)] mb-1">
          {service.title}
        </h3>
        <p className="text-sm text-[color:var(--color-muted)] line-clamp-2">
          {service.shortDescription || service.description}
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-rose)]">
          {service.price ? `From $${service.price}` : "Contact for Pricing"}
        </p>
      </div>
    </div>
  );
}
