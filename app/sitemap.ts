import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";
import { legacyBreastGalleryItems } from "./data/legacyBreastGallery";
import { getLocalNaverPostIndex } from "./checklist/naver";

export const dynamic = "force-static";

type Entry = Omit<MetadataRoute.Sitemap[number], "url"> & { url: string };

const ROUTES: Entry[] = [
  { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/before-after`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/doctors`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/checklist`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/implant-guide`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/breast-augmentation`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/breast-revision`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/breast-reconstruction`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/implant-removal`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/nipple-reduction`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/areola-lift`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/reduction-lift`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/safety-care`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/nam-style`, changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const rootLogNo = process.env.NAVER_LOG_NO ?? "223849151079";
  const localNaverPosts = await getLocalNaverPostIndex();

  const beforeAfterCases: Entry[] = legacyBreastGalleryItems.map((item) => ({
    url: `${SITE_URL}/before-after/${item.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const checklistPosts: Entry[] = localNaverPosts
    .filter((post) => post.logNo !== rootLogNo)
    .map((post) => ({
      url: `${SITE_URL}/checklist/${post.logNo}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: post.fetchedAt ? new Date(post.fetchedAt) : lastModified,
    }));

  return [...ROUTES.map((entry) => ({ ...entry, lastModified })), ...beforeAfterCases.map((entry) => ({ ...entry, lastModified })), ...checklistPosts];
}
