import Link from "next/link";
import { EcoSegLogo } from "@/components/brand/EcoSegLogo";
import { siteConfig } from "@/lib/seo/config";

const FOOTER_COLUMNS = [
  {
    title: "Palestra",
    links: [
      { href: "/palestra/protecao-familia-militar", label: "Palestra Militar" },
      { href: "/#metodologia", label: "Metodologia Consultiva" },
      { href: "/#diagnostico", label: "Diagnóstico Consultivo" },
    ],
  },
  {
    title: "EcoSeg",
    links: [
      { href: "/contato", label: "Contato" },
      {
        href: "/palestra/protecao-familia-militar/solucoes",
        label: "Produtos & Soluções",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-border/70 bg-secondary/40 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          {/* Logo Oficial EcoSeg - Símbolo Arquitetural de Compreensão */}
          <Link href="/" className="inline-block transition-opacity hover:opacity-90">
            <EcoSegLogo
              size={36}
              finish="brass"
              tagline="PLANEJAMENTO & PROTEÇÃO PATRIMONIAL"
            />
          </Link>

          <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
            {siteConfig.description}
          </p>

          <div className="mt-6">
            <h4 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Contato
            </h4>
            <p className="text-muted-foreground mt-1 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-foreground transition-colors"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-foreground text-sm font-semibold">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-border/70 border-t px-6 py-6">
        <div className="text-muted-foreground mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>ADR-B-001 Compreensão</span>
            <span>·</span>
            <span>DES-006 Anti-Clichê</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
