import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "filled" | "outline";
  className?: string;
  icon?: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button({ children, variant = "filled", className, icon, href, onClick, type }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200";
  const styles =
    variant === "filled"
      ? "bg-[color:var(--color-blush)] text-white hover:bg-[color:var(--color-rose)] shadow-sm hover:shadow-md"
      : "border border-[color:var(--color-blush)] text-[color:var(--color-rose)] hover:bg-[color:var(--color-pink-soft-2)]";

  const classes = clsx(base, styles, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type || "button"} onClick={onClick} className={classes}>
      {icon}
      {children}
    </button>
  );
}
