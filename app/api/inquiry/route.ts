import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { crmFetch } from "@/lib/crm";
import { readVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

// Inquiry forms on /ai-governance and /ai-consulting. Emails the team through
// Resend with the sender as reply-to, then files it in the CRM through the
// contact-form endpoint (on their record if known, else a new Lead, with a
// reply task). The topic names the service so these land apart from general
// contact messages and Role Report requests.

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown, max: number) =>
  (Array.isArray(v) ? v : typeof v === "string" && v ? [v] : [])
    .filter((x): x is string => typeof x === "string")
    .map((x) => x.trim().slice(0, 120))
    .filter(Boolean)
    .slice(0, max);
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

const TOPICS = {
  governance: "AI Governance & Security review",
  consulting: "AI Consulting & Custom Build inquiry",
} as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "We couldn't read that request." }, { status: 400 });
  }

  // Bots fill the hidden field. Pretend success so they move on.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const kind = body.kind === "governance" || body.kind === "consulting" ? body.kind : null;
  if (!kind) return NextResponse.json({ error: "Unknown form." }, { status: 400 });

  const m = {
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    company: clean(body.company, 160),
    role: clean(body.role, 120),
    size: clean(body.size, 40),
    phone: clean(body.phone, 30),
    industry: clean(body.industry, 60),
    message: clean(body.message, 4000),
    newsletter: body.newsletter === true,
    page: clean(body.page, 500),
  };

  if (!m.name || !m.email || !m.company || !m.role || !m.size)
    return NextResponse.json({ error: "Please fill in your name, work email, company, role and company size." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email))
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });

  const answers: [string, string][] = [
    ["Role", m.role],
    ["Company size", m.size],
  ];
  if (kind === "governance") {
    const policy = clean(body.policy, 40);
    if (!policy) return NextResponse.json({ error: "Please tell us whether you have a written AI use policy." }, { status: 400 });
    answers.push(
      ["Industry", m.industry || "Not given"],
      ["AI tools in use", list(body.tools, 12).join(", ") || "Not given"],
      ["Written AI use policy", policy],
      ["Answers to", list(body.standards, 8).join(", ") || "Not given"],
    );
  } else {
    const need = clean(body.need, 120);
    if (!need || !m.message)
      return NextResponse.json({ error: "Please tell us what you're looking for and the problem you want solved." }, { status: 400 });
    answers.push(
      ["Looking for", need],
      ["Systems in use", clean(body.systems, 500) || "Not given"],
      ["Timeline", clean(body.timeline, 40) || "Not given"],
      ["Ownership after the build", clean(body.ownership, 80) || "Not given"],
    );
  }

  const topic = TOPICS[kind];
  const label = kind === "governance" ? "What prompted this" : "Problem to solve";
  const message = [...answers.map(([k, v]) => `${k}: ${v}`), "", `${label}:`, m.message || "Not given"].join("\n");

  if (m.newsletter) await subscribeToNewsletter(m.email, m.name.split(/\s+/)[0]).catch(() => false);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("inquiry: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "We couldn't send your request right now." }, { status: 502 });
  }
  const to = process.env.NOTIFY_EMAIL || "gil@taskerandsteward.com";
  const from = process.env.FROM_EMAIL || "Tasker & Steward <notifications@taskerandsteward.com>";
  const rows: [string, string][] = [
    ["Name", m.name],
    ["Email", m.email],
    ["Company", m.company],
    ["Phone", m.phone || "Not given"],
    ...answers,
    ["Newsletter", m.newsletter ? "Yes, subscribed" : "No"],
    ["Page", m.page],
  ];
  const html = `<div style="font-family:Arial,sans-serif;color:#14243A">
<h2 style="font-family:Georgia,serif;font-weight:400">New ${esc(topic)}</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#4A5566;vertical-align:top">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`)
    .join("")}</table>
<h3 style="margin-top:20px">${esc(label)}</h3>
<pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#F4EFE4;padding:12px;border-radius:8px">${esc(m.message || "Not given")}</pre>
<p style="font-size:12px;color:#4A5566">Reply to this email to answer ${esc(m.name)} directly.</p>
</div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ from, to: [to], reply_to: m.email, subject: `${topic}: ${m.company}`, html }),
    });
    if (!r.ok) {
      console.error("inquiry: Resend error", r.status);
      return NextResponse.json({ error: "We couldn't send your request right now." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "We couldn't send your request right now." }, { status: 502 });
  }

  // The team already has the email, so a CRM problem doesn't fail the form.
  try {
    const r = await crmFetch("/api/public/contact-form", {
      method: "POST",
      body: JSON.stringify({
        name: m.name,
        email: m.email,
        company: m.company,
        phone: m.phone || null,
        topic,
        message,
        newsletter: m.newsletter,
        page: m.page || null,
        visitor: readVisitor(req, m.page),
      }),
    });
    if (r && !r.ok) console.error("inquiry: CRM error", r.status);
  } catch {
    console.error("inquiry: CRM unreachable");
  }
  return NextResponse.json({ ok: true });
}
