import { Section } from "./section";
import type { HomeContent } from "@/content/types";

export function Partners({ content }: { content: HomeContent["partners"] }) {
  return (
    <Section innerClassName="py-14 sm:py-16">
      <p className="text-muted-foreground text-center text-xs font-semibold tracking-wide uppercase">
        Comparamos condições entre as principais seguradoras do mercado
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {content.map((partner) => (
          <span
            key={partner.name}
            className="text-muted-foreground/80 text-sm font-semibold"
          >
            {partner.name}
          </span>
        ))}
      </div>
    </Section>
  );
}
