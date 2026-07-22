import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/servicos/blindagem-patrimonial", label: "Blindagem Patrimonial" },
  { href: "/servicos/responsabilidade-civil", label: "Responsabilidade Civil" },
  { href: "/empresa", label: "Empresa" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  return (
    <header className="border-border/70 bg-background/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-foreground flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <ShieldCheck className="text-accent size-6" aria-hidden />
          EcoSeg
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          size="sm"
          className="hidden sm:inline-flex"
          render={<Link href="/contato">Solicitar diagnóstico</Link>}
        />
      </div>
    </header>
  );
}
