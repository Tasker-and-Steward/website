// After a production build on Vercel, tell IndexNow (Bing, Yandex, Seznam,
// Naver and others) about every URL in the sitemap so new and changed pages
// get crawled quickly. Bing's index feeds ChatGPT search and Copilot.
// Never fails the build: any problem is logged and ignored.
import { readFileSync } from "node:fs";

const KEY = "c083043e907b8f6430e2757b84ad83c2";
const HOST = "www.taskerandsteward.com";

if (process.env.VERCEL_ENV !== "production") {
  console.log("indexnow: skipped (not a production build)");
  process.exit(0);
}

try {
  const xml = readFileSync(".next/server/app/sitemap.xml.body", "utf8");
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (!urlList.length) throw new Error("no URLs found in the sitemap");
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
    signal: AbortSignal.timeout(15000),
  });
  console.log(`indexnow: submitted ${urlList.length} URLs, status ${res.status}`);
} catch (err) {
  console.warn("indexnow: skipped,", err instanceof Error ? err.message : err);
}
