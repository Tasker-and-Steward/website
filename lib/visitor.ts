// Website activity tracking (2026-11-05). Each browser gets a first-party
// visitor id (ts_vid) and a 30-minute session id (ts_sid). Page views and form
// submissions go to the CRM, which ties the browser to a person once they
// click a link from a CRM email or newsletter, open their survey link, or fill
// in a form. Browsers that send Global Privacy Control or Do Not Track are not
// tracked (the cookies are never set).

import { crmFetch } from "@/lib/crm";

export const VISITOR_COOKIE = "ts_vid";
export const SESSION_COOKIE = "ts_sid";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const isUuid = (v: string | null | undefined): v is string => typeof v === "string" && UUID.test(v);

function cookie(req: Request, name: string): string | null {
  const raw = req.headers.get("cookie") ?? "";
  for (const part of raw.split(/;\s*/)) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i) === name) return decodeURIComponent(part.slice(i + 1));
  }
  return null;
}

export type Visitor = { id: string; session_id: string | null; path: string | null; ip: string | null; user_agent: string | null };

/** The browser's visitor id and details from a same-site request, or null when it is not tracked. */
export function readVisitor(req: Request, page?: string | null): Visitor | null {
  const id = cookie(req, VISITOR_COOKIE);
  if (!isUuid(id)) return null;
  const sid = cookie(req, SESSION_COOKIE);
  let path: string | null = null;
  if (page) {
    try {
      path = new URL(page, "https://www.taskerandsteward.com").pathname;
    } catch {
      path = null;
    }
  }
  return {
    id,
    session_id: isUuid(sid) ? sid : null,
    path,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    user_agent: req.headers.get("user-agent")?.slice(0, 400) || null,
  };
}

/** Logs a form submission on the visitor's CRM activity feed. Never throws. */
export async function logFormSubmission(req: Request, form: { name: string; summary: string; email: string; page?: string | null }): Promise<void> {
  const v = readVisitor(req, form.page);
  if (!v) return;
  await crmFetch("/api/public/web-events", {
    method: "POST",
    body: JSON.stringify({
      visitor_id: v.id,
      session_id: v.session_id,
      type: "form_submission",
      path: v.path || "/",
      form_name: form.name,
      form_summary: form.summary.slice(0, 1000),
      form_email: form.email,
      ip: v.ip,
      user_agent: v.user_agent,
    }),
  }).catch(() => null);
}
