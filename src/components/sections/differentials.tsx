import { Compass, HandHeart, Network, ShieldCheck } from "lucide-react";
import { Section } from "./section";
import type { HomeContent } from "@/content/types";

const ICONS = [Compass, HandHeart, Network, ShieldCheck];

export function Differentials({ content }: { content: HomeContent["differentials"] }) {
  return (
    <Section tone="muted">
      <div className="max-w-2xl">
        <h2 className="text-foreground text-3xl font-bold">Como trabalhamos</h2>
        <p className="text-muted-foreground mt-3">
          Consultoria antes de contrato — orientamos, depois recomendamos.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {content.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <div key={item.title}>
              <Icon className="text-accent size-6" aria-hidden />
              <h3 className="text-foreground mt-4 text-base font-semibold">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
