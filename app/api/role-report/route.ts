import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { readVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  mobile?: string;
  company?: string;
  size?: string;
  industry?: string;
  role?: string;
  posting?: string;
  sms_consent?: boolean;
  sms_consent_text?: string;
  newsletter?: boolean;
  website?: string; // honeypot
  page?: string;
};

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "We couldn't read that request." }, { status: 400 });
  }

  // Bots fill the hidden field. Pretend success so they move on.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    mobile: clean(body.mobile, 30),
    company: clean(body.company, 160),
    size: clean(body.size, 40),
    industry: clean(body.industry, 60),
    role: clean(body.role, 160),
    posting: clean(body.posting, 20000),
    sms_consent: body.sms_consent === true,
    sms_consent_text: body.sms_consent === true ? clean(body.sms_consent_text, 1000) : "",
    sms_consent_at: body.sms_consent === true ? new Date().toISOString() : null,
    sms_consent_source: body.sms_consent === true ? "Website Role Report form" : null,
    newsletter_opt_in: body.newsletter === true,
    source: "Website Form",
    page: clean(body.page, 500),
    submitted_at: new Date().toISOString(),
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    user_agent: clean(req.headers.get("user-agent"), 300),
  };
  // This browser's visitor id, so the CRM ties its earlier visits to the person.
  const visitor = readVisitor(req, clean(body.page, 500));

  const missing = (["name", "email", "company", "size", "industry", "role", "posting"] as const).filter((k) => !lead[k]);
  if (missing.length) return NextResponse.json({ error: "Please fill in every required field." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  if (lead.sms_consent && !lead.mobile)
    return NextResponse.json({ error: "Add a mobile number, or uncheck the text updates box." }, { status: 400 });

  const results: string[] = [];

  // 0) Newsletter opt-in, only when they ticked the box themselves.
  if (lead.newsletter_opt_in) {
    const firstName = lead.name.split(/\s+/)[0];
    results.push((await subscribeToNewsletter(lead.email, firstName)) ? "newsletter" : "newsletter_error");
  }

  // 1) Forward to the CRM when it is live.
  const crmUrl = process.env.CRM_LEAD_WEBHOOK_URL;
  if (crmUrl) {
    try {
      const r = await fetch(crmUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CRM_LEAD_WEBHOOK_SECRET ?? ""}`,
        },
        body: JSON.stringify({ ...lead, visitor }),
      });
      results.push(r.ok ? "crm" : `crm_error_${r.status}`);
    } catch {
      results.push("crm_error");
    }
  }

  // 2) Email the team. This is an internal notification, not marketing email.
  // If the CRM refused or missed the request, the email says so loudly, so
  // nothing is lost silently.
  const crmFailed = Boolean(crmUrl) && !results.includes("crm");
  if (crmFailed) console.error("role-report: CRM did not file the request", results.join(","));
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const to = process.env.NOTIFY_EMAIL || "gil@taskerandsteward.com";
    const from = process.env.FROM_EMAIL || "Tasker & Steward <notifications@taskerandsteward.com>";
    const rows: [string, string][] = [
      ["Name", lead.name],
      ["Email", lead.email],
      ["Mobile", lead.mobile || "Not given"],
      ["Company", lead.company],
      ["Company size", lead.size],
      ["Industry", lead.industry],
      ["Role", lead.role],
      ["Text updates", lead.sms_consent ? `Yes, agreed ${lead.sms_consent_at}` : "No"],
      ["Newsletter", lead.newsletter_opt_in ? "Yes, subscribed" : "No"],
      ["Page", lead.page || ""],
    ];
    const html = `<div style="font-family:Arial,sans-serif;color:#14243A">
${crmFailed ? `<p style="background:#F6E1E1;color:#7A1D22;padding:12px;border-radius:8px;font-weight:bold">This request was NOT filed in the CRM (${esc(results.filter((r) => r.startsWith("crm")).join(", "))}). Add it by hand or forward this email to Claude.</p>` : ""}
<h2 style="font-family:Georgia,serif;font-weight:400">New Role Report request</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="color:#4A5566;vertical-align:top">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`)
      .join("")}</table>
<h3 style="margin-top:20px">Job description or link</h3>
<pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#F4EFE4;padding:12px;border-radius:8px">${esc(lead.posting)}</pre>
${lead.sms_consent ? `<p style="font-size:12px;color:#4A5566">Consent text shown: ${esc(lead.sms_consent_text)}</p>` : ""}
</div>`;
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: lead.email,
          subject: `${crmFailed ? "[NOT IN CRM] " : ""}Role Report request: ${lead.role} at ${lead.company}`,
          html,
        }),
      });
      results.push(r.ok ? "email" : `email_error_${r.status}`);
    } catch {
      results.push("email_error");
    }
  }

  const delivered = results.some((r) => r === "crm" || r === "email");
  if (!delivered) {
    console.error("role-report: not delivered", results.join(",") || "no destinations configured");
    return NextResponse.json({ error: "We couldn't send your request right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
