"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--color-cream)]/90 backdrop-blur border-b border-[color:var(--color-border)]">
      <div className="container-x flex items-center justify-between py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-script text-3xl text-[color:var(--color-rose)]">Ghazala Qureshi</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            Makeup Artist
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[color:var(--color-text-2)] hover:text-[color:var(--color-rose)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blush)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--color-rose)] transition-colors"
          >
            <Calendar size={16} aria-hidden="true" />
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-[color:var(--color-text-2)]"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-cream)]">
          <nav className="flex flex-col px-5 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[color:var(--color-text-2)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-blush)] px-5 py-2.5 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              <Calendar size={16} aria-hidden="true" />
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
