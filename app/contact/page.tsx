import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book your bridal, party or event makeup appointment with Ghazala Qureshi, at home or on-location.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const infoItems = [
    settings.email && { icon: Mail, label: settings.email, href: `mailto:${settings.email}` },
    settings.phone && { icon: Phone, label: settings.phone, href: `tel:${settings.phone}` },
    settings.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`,
    },
    settings.instagram && { icon: InstagramIcon, label: "Instagram", href: settings.instagram },
    settings.serviceArea && { icon: MapPin, label: settings.serviceArea, href: undefined },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href?: string }[];

  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-10">
        <SectionLabel>Get In Touch</SectionLabel>
        <h1 className="font-serif-display text-3xl md:text-4xl mt-2 text-[color:var(--color-text)]">
          Let&apos;s Plan Your Look
        </h1>
        <p className="text-[color:var(--color-muted)] mt-2 max-w-lg mx-auto">
          Fill out the form below with your event details, and I&apos;ll get back to you shortly to confirm
          availability.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          {infoItems.length === 0 && (
            <p className="text-sm text-[color:var(--color-muted)]">
              Contact details coming soon — please use the form to reach out.
            </p>
          )}
          {infoItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-pink-soft)] text-[color:var(--color-rose)]">
                <item.icon size={18} />
              </span>
              {item.href ? (
                <a href={item.href} className="text-sm text-[color:var(--color-text-2)] hover:text-[color:var(--color-rose)]">
                  {item.label}
                </a>
              ) : (
                <span className="text-sm text-[color:var(--color-text-2)]">{item.label}</span>
              )}
            </div>
          ))}
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
