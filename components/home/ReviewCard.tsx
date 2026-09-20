import Image from "next/image";
import { Star } from "lucide-react";
import { resolveImageUrl } from "@/lib/uploads";
import type { ReviewDTO } from "@/types";

export default function ReviewCard({ review }: { review: ReviewDTO }) {
  return (
    <div className="bg-white rounded-xl border border-[color:var(--color-border)] shadow-sm p-6 flex flex-col gap-4">
      <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < review.rating ? "fill-[color:var(--color-gold)] text-[color:var(--color-gold)]" : "text-[color:var(--color-border)]"}
          />
        ))}
      </div>
      <p className="italic text-sm text-[color:var(--color-text-2)]">&ldquo;{review.review}&rdquo;</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-[color:var(--color-pink-soft)]">
          {review.avatarUrl && (
            <Image src={resolveImageUrl(review.avatarUrl)} alt={review.customerName} fill className="object-cover" sizes="40px" />
          )}
        </div>
        <span className="text-sm font-semibold text-[color:var(--color-text)]">— {review.customerName}</span>
      </div>
    </div>
  );
}
