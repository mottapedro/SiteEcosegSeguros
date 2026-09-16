import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Presentation,
  ShieldCheck,
  Users,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { militaryFamilyProtectionPresentation as presentation } from "@/content/presentations/military-family-protection";
import { buildMetadata } from "@/lib/seo/metadata";
import { isPresentationPublishable } from "@/contracts/presentation";
import { cn } from "@/lib/utils";

const path = "/palestra/protecao-familia-militar";

export const metadata: Metadata = buildMetadata({
  title: "Proteção da família militar",
  description:
    "Página da palestra ECOSEG sobre proteção familiar, contexto militar e atendimento consultivo responsável.",
  path,
  keywords: [
    "proteção familiar",
    "militares",
    "pensionistas",
    "planejamento",
    "ECOSEG",
  ],
  noIndex: !isPresentationPublishable(presentation),
});

const journey = [
  {
    icon: Users,
    title: "Expectativa da família",
    description:
      "Começamos pelo que a família acredita estar protegido e pelo que realmente precisa confirmar.",
  },
  {
    icon: BookOpenCheck,
    title: "Informação governada",
    description:
      "Fontes, versões e ressalvas entram na palestra somente depois do processo de validação.",
  },
  {
    icon: ShieldCheck,
    title: "Próxima decisão",
    description:
      "A conversa coletiva conduz a um atendimento individual, sem recomendação automática.",
  },
];

export default function MilitaryFamilyProtectionLecturePage() {
  return (
    <div className="bg-background">
      <section className="border-border border-b">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.18em] uppercase">
              Palestra ECOSEG · Marco 0
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {presentation.title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-8 sm:text-xl">
              {presentation.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`${path}/apresentacao`}
                className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
              >
                Abrir modo apresentação
                <ArrowRight aria-hidden />
              </Link>
              <Link
                href="#roteiro"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-5"
                )}
              >
                Conhecer o roteiro
              </Link>
            </div>
          </div>

          <aside className="border-border bg-muted/45 border p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <Presentation className="text-primary size-6" aria-hidden />
              <h2 className="text-lg font-semibold">Versão de homologação</h2>
            </div>
            <dl className="mt-6 grid gap-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Público</dt>
                <dd className="mt-1 font-medium">{presentation.audience}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Versão</dt>
                <dd className="mt-1 font-mono font-medium">
                  {presentation.version}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Status editorial</dt>
                <dd className="mt-1 font-mono font-semibold">
                  {presentation.status}
                </dd>
              </div>
            </dl>
            <p className="border-border text-muted-foreground mt-6 border-t pt-5 text-sm leading-6">
              {presentation.disclaimer}
            </p>
          </aside>
        </div>
      </section>

      <section id="roteiro" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-primary text-sm font-semibold tracking-[0.16em] uppercase">
            Jornada da conversa
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Informação antes de produto
          </h2>
          <p className="text-muted-foreground mt-5 text-lg leading-8">
            A experiência foi separada da Home institucional para preservar o
            contexto do evento e permitir que João conduza a narrativa pelo
            próprio website.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {journey.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="border-border bg-card border p-7"
              >
                <Icon className="text-primary size-7" aria-hidden />
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-3 leading-7">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.16em] uppercase opacity-80">
              Primeiro vertical slice
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              A experiência já pode ser ensaiada sem antecipar decisões legais.
            </h2>
            <p className="mt-4 leading-7 opacity-85">
              O conteúdo jurídico e a captação de interessados permanecem
              bloqueados até seus respectivos gates de validação.
            </p>
          </div>
          <Link
            href={`${path}/apresentacao`}
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "h-11 shrink-0 px-5"
            )}
          >
            Iniciar ensaio
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
