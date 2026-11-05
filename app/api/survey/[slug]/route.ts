import { NextResponse } from "next/server";
import { crmFetch } from "@/lib/crm";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { readVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Survey submissions: checked and stored by the CRM (which matches the person,
// stops their outreach, and emails the confirmation). This route adds the
// visitor's IP and browser for the CRM's fraud checks.
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "We couldn't read that response." }, { status: 400 });
  }
  // Bots fill the hidden field. Pretend success so they move on.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const email = clean(body.email, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });

  const visitor = readVisitor(req);
  const payload = {
    token: clean(body.token, 64) || null,
    answers: typeof body.answers === "object" && body.answers ? body.answers : {},
    name: clean(body.name, 120) || null,
    email,
    company: clean(body.company, 200) || null,
    title: clean(body.title, 120) || null,
    company_size: clean(body.company_size, 40) || null,
    industry: clean(body.industry, 60) || null,
    wants_report: body.wants_report !== false,
    raffle_entry: body.raffle_entry === true,
    marketing_consent: body.marketing_consent === true,
    utm_source: clean(body.utm_source, 100) || null,
    utm_medium: clean(body.utm_medium, 100) || null,
    utm_campaign: clean(body.utm_campaign, 100) || null,
    utm_content: clean(body.utm_content, 100) || null,
    ip_address: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    user_agent: clean(req.headers.get("user-agent"), 400) || null,
    // This browser's visitor id, so the CRM ties its earlier visits to the person.
    visitor_id: visitor?.id ?? null,
    session_id: visitor?.session_id ?? null,
    page_path: `/survey/${slug}`,
  };

  const res = await crmFetch(`/api/public/surveys/${encodeURIComponent(slug)}/responses`, { method: "POST", body: JSON.stringify(payload) });
  if (!res) return NextResponse.json({ error: "The survey is not available right now. Please try again later." }, { status: 503 });
  const out = (await res.json().catch(() => ({}))) as { error?: string; problems?: string[] };
  if (!res.ok) return NextResponse.json({ error: out.error || "We couldn't save your answers. Please try again.", problems: out.problems }, { status: res.status });

  // They ticked the marketing box themselves: add them to the newsletter too.
  if (payload.marketing_consent) await subscribeToNewsletter(email, payload.name?.split(/\s+/)[0]).catch(() => false);
  return NextResponse.json({ ok: true });
}
