import { Quote } from "lucide-react";
import { Section } from "./section";
import type { HomeContent } from "@/content/types";

export function Testimonials({ content }: { content: HomeContent["testimonials"] }) {
  return (
    <Section>
      <div className="max-w-2xl">
        <h2 className="text-foreground text-3xl font-bold">
          Quem já se protegeu com a EcoSeg
        </h2>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {content.map((testimonial) => (
          <figure
            key={testimonial.author}
            className="border-border bg-card rounded-md border p-8"
          >
            <Quote className="text-accent size-6" aria-hidden />
            <blockquote className="text-foreground mt-4 text-base leading-relaxed">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="text-muted-foreground mt-6 text-sm">
              <span className="text-foreground font-semibold">{testimonial.author}</span>
              {" — "}
              {testimonial.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
