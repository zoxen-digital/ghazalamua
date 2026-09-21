import type { Metadata } from "next";
import { Heart, Users, Home as HomeIcon, Gem, MapPin, Calendar } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ScriptText from "@/components/ui/ScriptText";
import Button from "@/components/ui/Button";
import LoadingImage from "@/components/ui/LoadingImage";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getHomepageContent, getGalleryItems } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Ghazala Qureshi, independent professional makeup artist offering at-home and on-location services.",
};

const FEATURES = [
  { icon: Heart, text: "Personalized beauty experience for every client" },
  { icon: Users, text: "Trusted by brides and clients across the city" },
  { icon: HomeIcon, text: "Comfortable at-home studio sessions" },
  { icon: Gem, text: "Premium, skin-friendly makeup products" },
  { icon: MapPin, text: "On-location service wherever you need me" },
];

export default async function AboutPage() {
  const [content, gallery] = await Promise.all([getHomepageContent(), getGalleryItems()]);

  return (
    <div>
      <section className="bg-[color:var(--color-cream-3)]">
        <div className="container-x py-16 md:py-20 grid md:grid-cols-[minmax(0,22rem)_1fr] gap-10 md:gap-14 items-center">
          <div className="relative aspect-[4/5] w-full max-w-sm mx-auto md:mx-0 rounded-3xl overflow-hidden shadow-lg">
            <LoadingImage
              src="/aboutpage.png"
              alt="Portrait of Ghazala Qureshi"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 24rem"
            />
          </div>
          <div>
            <SectionLabel>About Me</SectionLabel>
            <h1 className="font-serif-display text-3xl md:text-4xl mt-2 mb-1 text-[color:var(--color-text)]">
              {content.aboutTitle}
            </h1>
            <p className="text-sm font-semibold text-[color:var(--color-gold)] mb-4">{content.aboutSubtitle}</p>
            <p className="text-[color:var(--color-muted)] mb-4">{content.aboutDescription}</p>
            <p className="text-[color:var(--color-muted)] mb-6">
              I believe makeup is deeply personal — a way to enhance your natural beauty and help you feel
              confident in your own skin. As an independent artist, I take the time to understand your
              vision, skin type, and the occasion so every look is tailored just for you.
            </p>
            <ScriptText className="mb-6 block">Beauty is Personal</ScriptText>
            <Button href="/contact" icon={<Calendar size={16} />}>Book a Consultation</Button>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-cream)]">
        <div className="container-x py-16 md:py-20 grid md:grid-cols-2 gap-10">
          <ul className="flex flex-col gap-5">
            {FEATURES.map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-pink-soft)] text-[color:var(--color-rose)]">
                  <f.icon size={18} />
                </span>
                <span className="text-sm text-[color:var(--color-text-2)]">{f.text}</span>
              </li>
            ))}
          </ul>
          <div>
            <h2 className="font-serif-display text-2xl mb-4 text-[color:var(--color-text)]">
              At Home &amp; On-Location
            </h2>
            <p className="text-[color:var(--color-muted)] mb-4">
              Prefer to relax in a familiar, comfortable setting? I offer sessions from my own home studio.
              Need me to come to you instead — for a wedding morning, a hotel suite, or an event venue?
              I travel with my full kit so you can get ready wherever you are.
            </p>
            <p className="text-[color:var(--color-muted)]">
              Every appointment includes a consultation to understand your style, skin tone, and the look
              you want to achieve, ensuring a flawless finish that lasts all day.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-cream-3)]">
        <div className="container-x py-16 md:py-20">
          <div className="text-center mb-10">
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-2 text-[color:var(--color-text)]">
              A Glimpse of My Work
            </h2>
          </div>
          <GalleryGrid items={gallery} limit={7} showFilters={false} />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <LoadingImage src="/home1.png" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-x relative py-14 text-center">
          <h2 className="font-serif-display text-3xl mb-4 text-white">
            Ready to Look and Feel Your Best?
          </h2>
          <Button href="/contact" icon={<Calendar size={16} />}>Book Now</Button>
        </div>
      </section>
    </div>
  );
}
