import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  tone?: "default" | "muted";
}

export function Section({
  children,
  className,
  innerClassName,
  id,
  tone = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn(tone === "muted" && "bg-secondary/40", className)}>
      <div className={cn("mx-auto max-w-7xl px-6 py-20 sm:py-24", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
