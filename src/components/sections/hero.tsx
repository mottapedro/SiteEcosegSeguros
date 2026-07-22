import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/seo/config";
import type { HomeContent } from "@/content/types";

export function Hero({ content }: { content: HomeContent["hero"] }) {
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de solicitar um diagnóstico de riscos com a EcoSeg."
  );

  return (
    <section className="border-border/70 bg-secondary/30 border-b">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="text-accent text-xs font-semibold tracking-wide uppercase">
            {content.eyebrow}
          </span>
          <h1 className="text-foreground mt-4 max-w-xl text-4xl leading-tight font-bold sm:text-5xl">
            {content.title}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-lg text-base leading-relaxed">
            {content.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              render={
                <Link href="/contato">
                  {content.primaryCta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              }
            />
            <Button
              size="lg"
              variant="outline"
              render={
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.secondaryCta}
                </a>
              }
            />
          </div>
        </div>

        <div className="border-border bg-card rounded-md border p-8 shadow-sm">
          <dl className="grid grid-cols-2 gap-8">
            <div>
              <dt className="text-muted-foreground text-xs font-medium uppercase">
                Foco
              </dt>
              <dd className="text-foreground mt-2 text-lg font-semibold">
                Blindagem Patrimonial
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs font-medium uppercase">
                Foco
              </dt>
              <dd className="text-foreground mt-2 text-lg font-semibold">
                Responsabilidade Civil
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs font-medium uppercase">
                Abordagem
              </dt>
              <dd className="text-foreground mt-2 text-lg font-semibold">
                Diagnóstico consultivo
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs font-medium uppercase">
                Suporte
              </dt>
              <dd className="text-foreground mt-2 text-lg font-semibold">
                Do contrato ao sinistro
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
