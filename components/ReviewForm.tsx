"use client";

import { useState, useRef, type FormEvent } from "react";
import { Star, Camera, X } from "lucide-react";
import clsx from "clsx";

export default function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [imageName, setImageName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("rating", String(rating));

    try {
      const res = await fetch("/api/reviews/submit", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
      setRating(5);
      setImageName("");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[color:var(--color-border)] bg-white p-8 text-center">
        <h3 className="font-serif-display text-2xl mb-2 text-[color:var(--color-text)]">Thank you!</h3>
        <p className="text-[color:var(--color-muted)]">
          Your review has been submitted and will appear here once it&apos;s approved.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-[color:var(--color-border)] bg-white p-6 md:p-8"
    >
      {/* Honeypot field */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="customerName" className="text-sm font-medium text-[color:var(--color-text-2)]">
            Your Name
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            required
            maxLength={80}
            className="rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm focus:border-[color:var(--color-rose)] outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[color:var(--color-text-2)]">Your Rating</span>
          <div className="flex items-center gap-1 py-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5"
              >
                <Star
                  size={22}
                  className={clsx(
                    (hoverRating || rating) >= n
                      ? "fill-[color:var(--color-gold)] text-[color:var(--color-gold)]"
                      : "text-[color:var(--color-border)]"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="review" className="text-sm font-medium text-[color:var(--color-text-2)]">
          Your Review
        </label>
        <textarea
          id="review"
          name="review"
          required
          rows={4}
          maxLength={1000}
          placeholder="Share your experience..."
          className="rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm focus:border-[color:var(--color-rose)] outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-[color:var(--color-text-2)]">Photo (optional)</span>
        <div className="flex items-center gap-3">
          <label
            htmlFor="image"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-muted)] hover:border-[color:var(--color-rose)] hover:text-[color:var(--color-rose)] transition-colors"
          >
            <Camera size={16} />
            {imageName ? "Change Photo" : "Add Photo"}
          </label>
          <input
            id="image"
            name="image"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => setImageName(e.target.files?.[0]?.name || "")}
          />
          {imageName && (
            <span className="inline-flex items-center gap-1 text-xs text-[color:var(--color-muted)]">
              {imageName}
              <button
                type="button"
                aria-label="Remove photo"
                onClick={() => {
                  setImageName("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <X size={14} />
              </button>
            </span>
          )}
        </div>
        <p className="text-xs text-[color:var(--color-muted)]">You can submit your review with or without a photo.</p>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--color-blush)] px-6 py-3 text-sm font-semibold text-white hover:bg-[color:var(--color-rose)] transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
