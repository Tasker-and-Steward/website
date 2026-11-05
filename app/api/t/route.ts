import { after } from "next/server";
import { crmFetch } from "@/lib/crm";
import { isUuid, readVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

// Page view beacon from the Tracker component. The visitor id comes from the
// ts_vid cookie, not the body, so a page can only report its own browser. The
// event goes to the CRM after the response, so the page never waits on it.
export async function POST(req: Request) {
  const visitor = readVisitor(req);
  if (!visitor) return new Response(null, { status: 204 });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new Response(null, { status: 400 });
  }
  const path = clean(body.path, 2000);
  if (!path || !path.startsWith("/")) return new Response(null, { status: 400 });
  const sid = clean(body.session_id, 64);

  const event = {
    visitor_id: visitor.id,
    session_id: isUuid(sid) ? sid : visitor.session_id,
    type: "page_view",
    path,
    title: clean(body.title, 300),
    referrer: clean(body.referrer, 2000),
    utm_source: clean(body.utm_source, 100),
    utm_medium: clean(body.utm_medium, 100),
    utm_campaign: clean(body.utm_campaign, 100),
    utm_content: clean(body.utm_content, 100),
    utm_term: clean(body.utm_term, 100),
    token: clean(body.token, 64),
    survey_slug: clean(body.survey_slug, 80),
    survey_token: clean(body.survey_token, 64),
    ip: visitor.ip,
    user_agent: visitor.user_agent,
  };
  after(async () => {
    await crmFetch("/api/public/web-events", { method: "POST", body: JSON.stringify(event) }).catch(() => null);
  });
  return new Response(null, { status: 204 });
}
