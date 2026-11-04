import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { allInsights } from "@/lib/insights";

const UPDATED = new Date("2026-10-29");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allInsights();
  return [
    { url: `${SITE_URL}/`, lastModified: UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/contact`, lastModified: new Date("2026-11-04"), changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: new Date("2026-10-30"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: UPDATED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/sms-terms`, lastModified: UPDATED, changeFrequency: "yearly", priority: 0.2 },
    ...(posts.length ? [{ url: `${SITE_URL}/insights`, lastModified: new Date(`${posts[0].date}T12:00:00Z`), changeFrequency: "monthly" as const, priority: 0.7 }] : []),
    ...posts.map((p) => ({ url: `${SITE_URL}/insights/${p.slug}`, lastModified: new Date(`${p.date}T12:00:00Z`), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
