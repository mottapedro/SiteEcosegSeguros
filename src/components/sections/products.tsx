import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Section } from "./section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { HomeContent } from "@/content/types";

export function Products({ content }: { content: HomeContent["products"] }) {
  return (
    <Section>
      <div className="max-w-2xl">
        <h2 className="text-foreground text-3xl font-bold">Onde atuamos</h2>
        <p className="text-muted-foreground mt-3">
          Duas frentes de proteção que, juntas, cobrem o patrimônio pessoal dos sócios e a
          exposição financeira da operação.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {content.map((product) => (
          <Card key={product.slug} className="shadow-none">
            <CardHeader>
              <div className="text-accent flex items-center gap-2">
                <ShieldCheck className="size-5" aria-hidden />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  {product.tagline}
                </span>
              </div>
              <CardTitle className="mt-2 text-2xl">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6">
                <h3 className="text-foreground text-xs font-semibold tracking-wide uppercase">
                  Riscos mitigados
                </h3>
                <ul className="mt-3 space-y-2">
                  {product.risksMitigated.map((risk) => (
                    <li key={risk} className="text-muted-foreground text-sm">
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.idealFor.map((audience) => (
                  <Badge key={audience} variant="secondary">
                    {audience}
                  </Badge>
                ))}
              </div>

              <p className="border-border text-muted-foreground mt-6 border-t pt-4 text-sm italic">
                {product.example}
              </p>

              <Link
                href={`/servicos/${product.slug}`}
                className="text-primary mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              >
                Entender {product.name}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
