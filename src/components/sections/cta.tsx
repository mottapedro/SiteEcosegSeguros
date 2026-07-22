import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HomeContent } from "@/content/types";

export function Cta({ content }: { content: HomeContent["cta"] }) {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
        <div>
          <h2 className="text-primary-foreground max-w-lg text-2xl font-bold sm:text-3xl">
            {content.title}
          </h2>
          <p className="text-primary-foreground/80 mt-3 max-w-lg text-sm">
            {content.description}
          </p>
        </div>
        <Button
          size="lg"
          variant="secondary"
          className="shrink-0"
          render={
            <Link href="/contato">
              {content.action}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
      </div>
    </section>
  );
}
