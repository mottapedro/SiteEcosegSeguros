import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
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
  keywords: ["proteção familiar", "militares", "pensionistas", "planejamento", "ECOSEG"],
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

const eventDetails = [
  "Temas: pecúlio, previdência, pensão militar e seguros.",
  "Local: Clube dos Taifeiros da Aeronáutica.",
  "Data: 21/10/2026.",
  "Condução: João Brito — Diretor Executivo da ECOSEG e equipe.",
] as const;

const audienceText =
  "Militares ativos e veteranos das Forças Armadas, dependentes, pensionistas e pessoas interessadas.";

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
            <dl className="mt-6 grid gap-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Público</dt>
                <dd className="mt-1 font-medium">{audienceText}</dd>
              </div>
            </dl>
            <p className="border-border text-muted-foreground mt-6 border-t pt-5 text-sm leading-6">
              {presentation.disclaimer}
            </p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="event-details-title" className="border-border border-b">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
            Encontro
          </p>
          <h2
            id="event-details-title"
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Informação antes de produto
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eventDetails.map((detail) => (
              <li
                key={detail}
                className="border-border bg-card text-muted-foreground border p-5 text-sm leading-6"
              >
                {detail}
              </li>
            ))}
          </ul>
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
            A experiência foi separada da Home institucional para preservar o contexto do
            evento e permitir que João conduza a narrativa pelo próprio website.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {journey.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="border-border bg-card border p-7">
                <Icon className="text-primary size-7" aria-hidden />
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-3 leading-7">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="capitulos-title"
        className="border-border border-b px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-semibold tracking-[0.16em] uppercase">
              Leitura por capítulos
            </p>
            <h2
              id="capitulos-title"
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Acompanhe o conteúdo no seu ritmo
            </h2>
            <nav aria-label="Capítulos da palestra" className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {presentation.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="border-border text-muted-foreground hover:text-foreground rounded-md border px-3 py-2 text-sm transition-colors"
                    >
                      {section.eyebrow}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-12 grid gap-8">
            {presentation.sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="border-border bg-card scroll-mt-8 border p-7 sm:p-9"
              >
                <p className="text-primary text-sm font-semibold tracking-[0.16em] uppercase">
                  {section.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  {section.title}
                </h3>
                <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7 sm:text-lg">
                  {section.summary}
                </p>
                <ul className="text-muted-foreground mt-6 grid gap-3 leading-7 sm:grid-cols-3">
                  {section.talkingPoints.map((point) => (
                    <li key={point} className="border-primary/40 border-l-2 pl-4">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="mt-3 text-3xl font-bold">
              A experiência já pode ser ensaiada sem antecipar decisões legais.
            </h2>
            <p className="mt-4 leading-7 opacity-85">
              O conteúdo jurídico e a captação de interessados permanecem bloqueados até
              seus respectivos gates de validação.
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
