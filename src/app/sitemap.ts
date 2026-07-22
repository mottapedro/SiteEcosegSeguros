import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";

const ROUTES = [
  "",
  "/empresa",
  "/servicos",
  "/servicos/blindagem-patrimonial",
  "/servicos/responsabilidade-civil",
  "/contato",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
