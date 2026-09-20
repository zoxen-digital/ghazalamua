import Image from "next/image";
import { Calendar, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import type { HomepageContentDTO } from "@/types";

export default function BookingCTA({ content }: { content: HomepageContentDTO }) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/home1.png"
        alt="Be you but more beautiful"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="container-x relative py-14 md:py-16 grid md:grid-cols-3 gap-8 items-center">
        <h2 className="font-serif-display text-3xl md:text-4xl text-white">
          {content.ctaHeading}
        </h2>

        <div>
          <p className="text-white/90 mb-6">{content.ctaDescription}</p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" icon={<Calendar size={16} />}>
              Book Now
            </Button>
            <Button href="/contact" variant="outline" className="bg-white/70" icon={<Mail size={16} />}>
              Contact Me
            </Button>
          </div>
        </div>

        <div />
      </div>
    </section>
  );
}
