"use client";

import clsx from "clsx";

export default function FilterPills({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={clsx(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            active === cat
              ? "bg-[color:var(--color-blush)] text-white"
              : "border border-[color:var(--color-blush)] text-[color:var(--color-rose)] hover:bg-[color:var(--color-pink-soft-2)]"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
