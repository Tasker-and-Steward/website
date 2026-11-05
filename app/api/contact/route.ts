import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { logFormSubmission } from "@/lib/visitor";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

// The general contact form at /contact. Emails the team through Resend with
// the sender as reply-to, and logs the submission on the CRM activity feed. (Role Report requests have their own route, which
// also files them in the CRM.)
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "We couldn't read that message." }, { status: 400 });
  }

  // Bots fill the hidden field. Pretend success so they move on.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const msg = {
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    company: clean(body.company, 160),
    phone: clean(body.phone, 30),
    topic: clean(body.topic, 60),
    message: clean(body.message, 5000),
    newsletter: body.newsletter === true,
    page: clean(body.page, 500),
  };

  if (!msg.name || !msg.email || !msg.topic || !msg.message)
    return NextResponse.json({ error: "Please fill in your name, email, topic and message." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email))
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });

  // They ticked the newsletter box themselves.
  if (msg.newsletter) await subscribeToNewsletter(msg.email, msg.name.split(/\s+/)[0]).catch(() => false);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("contact: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "We couldn't send your message right now." }, { status: 502 });
  }
  const to = process.env.NOTIFY_EMAIL || "gil@taskerandsteward.com";
  const from = process.env.FROM_EMAIL || "Tasker & Steward <notifications@taskerandsteward.com>";
  const rows: [string, string][] = [
    ["Name", msg.name],
    ["Email", msg.email],
    ["Company", msg.company || "Not given"],
    ["Phone", msg.phone || "Not given"],
    ["Topic", msg.topic],
    ["Newsletter", msg.newsletter ? "Yes, subscribed" : "No"],
    ["Page", msg.page],
  ];
  const html = `<div style="font-family:Arial,sans-serif;color:#14243A">
<h2 style="font-family:Georgia,serif;font-weight:400">New message from the website</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#4A5566;vertical-align:top">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`)
    .join("")}</table>
<h3 style="margin-top:20px">Message</h3>
<pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#F4EFE4;padding:12px;border-radius:8px">${esc(msg.message)}</pre>
<p style="font-size:12px;color:#4A5566">Reply to this email to answer ${esc(msg.name)} directly.</p>
</div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: msg.email,
        subject: `Website message: ${msg.topic}${msg.company ? ` (${msg.company})` : ""}`,
        html,
      }),
    });
    if (!r.ok) {
      console.error("contact: Resend error", r.status);
      return NextResponse.json({ error: "We couldn't send your message right now." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "We couldn't send your message right now." }, { status: 502 });
  }
  // The person's marketing activity feed in the CRM.
  await logFormSubmission(req, {
    name: "Contact form",
    summary: [msg.topic, msg.company, msg.newsletter ? "subscribed to the newsletter" : ""].filter(Boolean).join(" · "),
    email: msg.email,
    page: msg.page,
  });
  return NextResponse.json({ ok: true });
}
