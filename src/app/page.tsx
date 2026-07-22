import type { Metadata } from "next";
import { getHomeContent } from "@/content/lib/get-content";
import { Hero } from "@/components/sections/hero";
import { Products } from "@/components/sections/products";
import { Differentials } from "@/components/sections/differentials";
import { Partners } from "@/components/sections/partners";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — Blindagem Patrimonial e Responsabilidade Civil`,
  description: siteConfig.description,
  path: "",
});

export default function Home() {
  const content = getHomeContent();

  return (
    <>
      <Hero content={content.hero} />
      <Products content={content.products} />
      <Differentials content={content.differentials} />
      <Partners content={content.partners} />
      <Testimonials content={content.testimonials} />
      <Cta content={content.cta} />
      <Contact />
    </>
  );
}
