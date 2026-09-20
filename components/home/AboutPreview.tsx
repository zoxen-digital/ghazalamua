import Image from "next/image";
import { Heart, Users, Home as HomeIcon, Gem, MapPin } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ScriptText from "@/components/ui/ScriptText";
import type { HomepageContentDTO } from "@/types";

const FEATURES = [
  { icon: Heart, text: "Personalized beauty experience for every client" },
  { icon: Users, text: "Trusted by brides and clients across the city" },
  { icon: HomeIcon, text: "Comfortable at-home studio sessions" },
  { icon: Gem, text: "Premium, skin-friendly makeup products" },
  { icon: MapPin, text: "On-location service wherever you need me" },
];

export default function AboutPreview({ content }: { content: HomepageContentDTO }) {
  return (
    <section className="bg-[color:var(--color-cream-3)]">
      <div className="container-x py-16 md:py-20 grid md:grid-cols-[auto_1fr_auto] gap-10 items-center">
        <div className="flex justify-center md:justify-start">
          <div className="relative h-[220px] w-[220px] md:h-[300px] md:w-[300px] rounded-full overflow-hidden border-4 border-[color:var(--color-pink-soft)] shadow-md">
            <Image
              src="/about.png"
              alt="Portrait of Ghazala Qureshi"
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
        </div>

        <div>
          <SectionLabel>About Me</SectionLabel>
          <h2 className="font-serif-display text-3xl md:text-4xl mt-2 mb-1 text-[color:var(--color-text)]">
            {content.aboutTitle}
          </h2>
          <p className="text-sm font-semibold text-[color:var(--color-gold)] mb-4">{content.aboutSubtitle}</p>
          <p className="text-[color:var(--color-muted)] max-w-md mb-4">{content.aboutDescription}</p>
          <ScriptText>Beauty is Personal</ScriptText>
        </div>

        <ul className="flex flex-col gap-7 border-l-2 border-[color:var(--color-border)] pl-6">
          {FEATURES.map((f) => (
            <li key={f.text} className="flex items-center gap-4 max-w-[240px]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-pink-soft)] text-[color:var(--color-rose)]">
                <f.icon size={18} />
              </span>
              <span className="text-sm text-[color:var(--color-text-2)]">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
