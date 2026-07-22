import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/seo/config";

const FOOTER_COLUMNS = [
  {
    title: "Serviços",
    links: [
      { href: "/servicos/blindagem-patrimonial", label: "Blindagem Patrimonial" },
      { href: "/servicos/responsabilidade-civil", label: "Responsabilidade Civil" },
      { href: "/servicos", label: "Consultoria em Riscos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/empresa", label: "Sobre a EcoSeg" },
      { href: "/blog", label: "Blog" },
      { href: "/contato", label: "Contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-border/70 bg-secondary/40 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="text-foreground flex items-center gap-2 text-lg font-bold tracking-tight">
            <ShieldCheck className="text-accent size-6" aria-hidden />
            EcoSeg
          </div>
          <p className="text-muted-foreground mt-3 max-w-sm text-sm">
            {siteConfig.description}
          </p>
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

        <div>
          <h3 className="text-foreground text-sm font-semibold">Contato</h3>
          <ul className="text-muted-foreground mt-4 space-y-3 text-sm">
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-border/70 border-t px-6 py-6">
        <p className="text-muted-foreground mx-auto max-w-7xl text-xs">
          © {new Date().getFullYear()} {siteConfig.legalName}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
