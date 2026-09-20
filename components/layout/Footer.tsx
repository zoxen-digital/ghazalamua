import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { getSiteSettings } from "@/lib/data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default async function Footer() {
  const settings = await getSiteSettings();

  const socials = [
    { href: settings.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: settings.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: settings.tiktok, icon: TikTokIcon, label: "TikTok" },
    { href: settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}` : "", icon: MessageCircle, label: "WhatsApp" },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-cream-2)]">
      <div className="container-x py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-script text-3xl text-[color:var(--color-rose)]">
            {settings.businessName}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            Makeup Artist
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-[color:var(--color-muted)]">Beauty Services at Home &amp; On-Location</p>
          <nav className="flex flex-wrap justify-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-[color:var(--color-text-2)] hover:text-[color:var(--color-rose)]">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex gap-3">
          {socials.length === 0 && (
            <span className="text-xs text-[color:var(--color-muted)]">Social links coming soon</span>
          )}
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-pink-soft-2)] text-[color:var(--color-rose)] hover:bg-[color:var(--color-blush)] hover:text-white transition-colors"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-[color:var(--color-border)] py-4">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[color:var(--color-muted)]">
          <p>&copy; {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/admin/login" className="hover:text-[color:var(--color-rose)]">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
