import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { logFormSubmission } from "@/lib/visitor";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "We couldn't read that request." }, { status: 400 });
  }
  if (clean(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot

  const email = clean(body.email, 200).toLowerCase();
  const firstName = clean(body.first_name, 80);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }
  const ok = await subscribeToNewsletter(email, firstName || undefined);
  if (!ok) return NextResponse.json({ error: "We couldn't sign you up right now. Please try again." }, { status: 502 });
  await logFormSubmission(req, { name: "Newsletter signup", summary: "Signed up for the monthly email", email, page: clean(body.page, 500) || null });
  return NextResponse.json({ ok: true });
}
