"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// First-party page view tracking for the CRM (2026-11-05). Sets the visitor
// id (13 months) and session id (30 minutes, renewed on every page), then
// beacons each page view to /api/t. A CRM email link's ?ts= token is sent once
// and then removed from the address bar, so it is not bookmarked or shared.
// Browsers with Global Privacy Control or Do Not Track on are skipped.

const VISITOR = "ts_vid";
const SESSION = "ts_sid";
const YEAR_PLUS = 60 * 60 * 24 * 395;
const HALF_HOUR = 60 * 30;

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function optedOut(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || navigator.doNotTrack === "1" || nav.webdriver === true;
}

export default function Tracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (optedOut() || typeof crypto?.randomUUID !== "function") return;
    // Removing ?ts= below changes the search params; that is not a new page.
    const params = new URLSearchParams(search.toString());
    params.delete("ts");
    const key = `${pathname}?${params.toString()}`;
    if (last.current === key) return;
    const firstView = last.current === null;
    last.current = key;

    let vid = getCookie(VISITOR);
    if (!vid) vid = crypto.randomUUID();
    setCookie(VISITOR, vid, YEAR_PLUS);
    let sid = getCookie(SESSION);
    if (!sid) sid = crypto.randomUUID();
    setCookie(SESSION, sid, HALF_HOUR);

    const surveyMatch = /^\/survey\/([a-z0-9-]+)\/?$/.exec(pathname);
    const token = search.get("ts");
    const event = {
      path: pathname,
      title: document.title,
      // The referring site only matters on the first page of a visit.
      referrer: firstView ? document.referrer || null : null,
      session_id: sid,
      utm_source: search.get("utm_source"),
      utm_medium: search.get("utm_medium"),
      utm_campaign: search.get("utm_campaign"),
      utm_content: search.get("utm_content"),
      utm_term: search.get("utm_term"),
      token,
      survey_slug: surveyMatch ? surveyMatch[1] : null,
      survey_token: surveyMatch ? search.get("t") : null,
    };
    // Let the page set its title first. (No cleanup: the ?ts= removal below
    // re-runs this effect, and the view must still be sent.)
    window.setTimeout(() => {
      const payload = JSON.stringify({ ...event, title: document.title });
      if (!navigator.sendBeacon?.("/api/t", new Blob([payload], { type: "text/plain" }))) {
        fetch("/api/t", { method: "POST", body: payload, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
      }
    }, 300);

    if (token) {
      const url = new URL(window.location.href);
      url.searchParams.delete("ts");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }
  }, [pathname, search]);

  return null;
}
