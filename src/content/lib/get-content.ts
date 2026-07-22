import { homeContent } from "../pages/home";
import type { HomeContent } from "../types";

/**
 * Single read path for institutional content. Backed by typed TS modules
 * today; swap the implementation for MDX or a headless CMS later without
 * touching call sites.
 */
export function getHomeContent(): HomeContent {
  return homeContent;
}
