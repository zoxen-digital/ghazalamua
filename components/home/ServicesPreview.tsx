import SectionLabel from "@/components/ui/SectionLabel";
import ScriptText from "@/components/ui/ScriptText";
import ServiceCard from "@/components/services/ServiceCard";
import type { ServiceDTO } from "@/types";

export default function ServicesPreview({
  services,
  heading,
}: {
  services: ServiceDTO[];
  heading: string;
}) {
  return (
    <section className="bg-[color:var(--color-cream)]">
      <div className="container-x py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 text-center md:text-left">
          <div>
            <SectionLabel>My Services</SectionLabel>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-2 text-[color:var(--color-text)]">
              {heading}
            </h2>
          </div>
          <ScriptText className="hidden md:block">Look Good Feel Amazing</ScriptText>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} image={`/ser${(i % 4) + 1}.png`} />
          ))}
        </div>
      </div>
    </section>
  );
}
