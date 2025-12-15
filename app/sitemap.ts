import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export const dynamic = "force-static";

type Entry = Omit<MetadataRoute.Sitemap[number], "url"> & { url: string };

const ROUTES: Entry[] = [
  { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/before-after`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/doctors`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/implant-guide`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/breast-revision`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/implant-removal`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/nipple-reduction`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/areola-lift`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/reduction-lift`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/safety-care`, changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((entry) => ({ ...entry, lastModified }));
}
