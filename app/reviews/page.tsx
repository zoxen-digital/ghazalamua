import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import ReviewCard from "@/components/home/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { getReviews } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews",
  description: "See what clients say about their experience with makeup artist Ghazala Qureshi.",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-10">
        <SectionLabel>Reviews</SectionLabel>
        <h1 className="font-serif-display text-3xl md:text-4xl mt-2 text-[color:var(--color-text)]">
          What My Clients Say
        </h1>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center text-[color:var(--color-muted)]">No reviews yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}

      <div className="mt-16 md:mt-20 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <SectionLabel>Share Your Experience</SectionLabel>
          <h2 className="font-serif-display text-2xl md:text-3xl mt-2 text-[color:var(--color-text)]">
            Leave a Review
          </h2>
          <p className="text-sm text-[color:var(--color-muted)] mt-2">
            Worked with me before? I&apos;d love to hear about it — with a photo or without, it&apos;s up to you.
          </p>
        </div>
        <ReviewForm />
      </div>
    </div>
  );
}
