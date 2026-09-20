export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-rose)]">
      {children}
    </p>
  );
}
