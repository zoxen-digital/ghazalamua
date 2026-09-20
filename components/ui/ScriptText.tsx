import clsx from "clsx";

export default function ScriptText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "font-script text-3xl md:text-4xl text-[color:var(--color-rose)] leading-none",
        className
      )}
    >
      {children}
    </span>
  );
}
