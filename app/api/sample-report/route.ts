import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { crmFetch } from "@/lib/crm";
import { readVisitor } from "@/lib/visitor";
import { SAMPLE_REPORT } from "@/lib/services";

export const runtime = "nodejs";

// Sample AI Governance Review download on /ai-governance. Emails the reader
// their link, notifies the team, and files the download in the CRM as a lead
// with a follow-up task. The PDF itself stays at a public, non-indexed URL so
// the download works even if email or the CRM is down.

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "We couldn't read that request." }, { status: 400 });
  }
  if (clean(body.website, 200)) return NextResponse.json({ ok: true, url: SAMPLE_REPORT.pdf });

  const email = clean(body.email, 200).toLowerCase();
  const name = clean(body.name, 120);
  const company = clean(body.company, 160);
  const newsletter = body.newsletter === true;
  const page = clean(body.page, 500);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });

  const firstName = name.split(/\s+/)[0] || "";
  const pdfUrl = `https://www.taskerandsteward.com${SAMPLE_REPORT.pdf}`;

  if (newsletter) await subscribeToNewsletter(email, firstName || undefined).catch(() => false);

  const key = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL || "Tasker & Steward <notifications@taskerandsteward.com>";
  const to = process.env.NOTIFY_EMAIL || "gil@taskerandsteward.com";
  if (key) {
    const send = (payload: Record<string, unknown>) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify(payload),
      }).catch(() => null);

    const hello = firstName ? `Hi ${esc(firstName)},` : "Hello,";
    await Promise.all([
      send({
        from,
        to: [email],
        reply_to: "hello@taskerandsteward.com",
        subject: "Your sample AI Governance Review",
        html: `<div style="font-family:Arial,sans-serif;color:#14243A;font-size:15px;line-height:1.6;max-width:560px">
<p>${hello}</p>
<p>Here's the sample AI Governance Review you asked for. It follows a fictional 40-person home services company from the AI tools nobody approved to a 90-day plan and the first draft of their policies.</p>
<p><a href="${pdfUrl}" style="display:inline-block;background:#6E1F24;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Download the sample review (PDF)</a></p>
<p>If you'd like to know where your own business stands, reply to this email or request a review at <a href="https://www.taskerandsteward.com/ai-governance#inquiry" style="color:#6E1F24">taskerandsteward.com/ai-governance</a>.</p>
<p style="font-family:Georgia,serif;font-size:17px;margin-top:24px">Tasker <span style="color:#6E1F24;font-style:italic">&amp;</span> Steward</p>
<p style="font-size:12px;color:#5F6977">You're receiving this because you requested the sample at taskerandsteward.com. Tasker &amp; Steward · 6 Liberty Square, PMB #361, Boston, MA 02109</p>
</div>`,
      }),
      send({
        from,
        to: [to],
        reply_to: email,
        subject: `Sample governance review downloaded: ${company || email}`,
        html: `<div style="font-family:Arial,sans-serif;color:#14243A"><h2 style="font-family:Georgia,serif;font-weight:400">Sample governance review downloaded</h2>
<p><strong>${esc(name || "No name given")}</strong> · ${esc(email)}<br>${esc(company || "No company given")}<br>Newsletter: ${newsletter ? "Yes, subscribed" : "No"}<br>Page: ${esc(page)}</p>
<p style="font-size:12px;color:#4A5566">Reply to this email to follow up with them directly.</p></div>`,
      }),
    ]);
  } else {
    console.error("sample-report: RESEND_API_KEY is not set");
  }

  try {
    const r = await crmFetch("/api/public/contact-form", {
      method: "POST",
      body: JSON.stringify({
        name: name || email,
        email,
        company: company || null,
        phone: null,
        topic: "Sample governance review download",
        message: "Downloaded the Sample AI Governance Review from /ai-governance. Follow up with an offer of a real governance review.",
        newsletter,
        page: page || null,
        visitor: readVisitor(req, page),
      }),
    });
    if (r && !r.ok) console.error("sample-report: CRM error", r.status);
  } catch {
    console.error("sample-report: CRM unreachable");
  }

  return NextResponse.json({ ok: true, url: SAMPLE_REPORT.pdf });
}
