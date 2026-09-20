import SectionLabel from "@/components/ui/SectionLabel";
import ReviewCard from "@/components/home/ReviewCard";
import type { ReviewDTO } from "@/types";

export default function ReviewsPreview({
  reviews,
  heading,
}: {
  reviews: ReviewDTO[];
  heading: string;
}) {
  return (
    <section className="bg-[color:var(--color-cream)]">
      <div className="container-x py-16 md:py-20">
        <div className="text-center mb-10">
          <SectionLabel>Reviews</SectionLabel>
          <h2 className="font-serif-display text-3xl md:text-4xl mt-2 text-[color:var(--color-text)]">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
