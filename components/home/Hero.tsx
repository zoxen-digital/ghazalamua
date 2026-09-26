import LoadingImage from "@/components/ui/LoadingImage";
import { Calendar, Image as ImageIcon, Heart, Home as HomeIcon, MapPin, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import type { HomepageContentDTO } from "@/types";

const BENEFITS = [
  { icon: Heart, label: "Personalized Service" },
  { icon: HomeIcon, label: "At Home Makeup" },
  { icon: MapPin, label: "On-Location Service" },
  { icon: Sparkles, label: "Professional & Trusted" },
];

export default function Hero({ content }: { content: HomepageContentDTO }) {
  const [firstLine, ...rest] = content.heroTitle.split(" for ");
  const hasBreak = rest.length > 0;

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[660px] flex items-center">
      <LoadingImage
        src="/newheromobile.png"
        alt="Bridal makeup portrait by Ghazala Qureshi"
        fill
        priority
        quality={100}
        className="object-cover md:hidden"
        sizes="100vw"
      />
      <LoadingImage
        src="/newhero1.png"
        alt="Bridal makeup portrait by Ghazala Qureshi"
        fill
        priority
        quality={100}
        className="object-cover hidden md:block"
        sizes="100vw"
      />
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[55%]"
        style={{
          background:
            "linear-gradient(to right, color-mix(in srgb, var(--color-cream) 38%, transparent) 0%, transparent 100%)",
        }}
      />
      <div className="relative w-full py-10 md:py-14 pl-6 md:pl-16 lg:pl-24 pr-6 md:pr-10 grid md:grid-cols-[68%_32%] gap-6 items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-rose)] mb-4">
            {content.heroEyebrow}
          </p>
          <h1 className="font-serif-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-[color:var(--color-text)] mb-6 md:whitespace-nowrap">
            {hasBreak ? (
              <>
                {firstLine} for
                <br />
                {rest.join(" for ")}
              </>
            ) : (
              content.heroTitle
            )}
          </h1>
          <p className="text-base md:text-lg text-[color:var(--color-muted)] max-w-lg mb-8">
            {content.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Button href="/contact" icon={<Calendar size={16} />}>
              {content.heroPrimaryButtonText}
            </Button>
            <Button href="/gallery" variant="outline" icon={<ImageIcon size={16} />}>
              {content.heroSecondaryButtonText}
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-pink-soft)] text-[color:var(--color-rose)] shrink-0">
                  <b.icon size={16} />
                </span>
                <span className="text-xs font-medium text-[color:var(--color-text-2)]">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div />
      </div>
    </section>
  );
}
