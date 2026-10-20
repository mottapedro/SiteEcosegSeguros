import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";

const ROUTES = [
  "",
  "/palestra/protecao-familia-militar",
  "/palestra/protecao-familia-militar/solucoes",
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
