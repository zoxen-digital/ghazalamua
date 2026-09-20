import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceCard from "@/components/services/ServiceCard";
import { getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description: "Bridal, party, event and on-location makeup services by independent makeup artist Ghazala Qureshi.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-10">
        <SectionLabel>My Services</SectionLabel>
        <h1 className="font-serif-display text-3xl md:text-4xl mt-2 text-[color:var(--color-text)]">
          Beauty for Every Occasion
        </h1>
      </div>

      {services.length === 0 ? (
        <p className="text-center text-[color:var(--color-muted)]">Services coming soon. Please check back!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} image={`/ser${(i % 4) + 1}.png`} />
          ))}
        </div>
      )}
    </div>
  );
}
