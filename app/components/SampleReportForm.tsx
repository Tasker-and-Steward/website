"use client";

import { useState, type FormEvent } from "react";
import { SAMPLE_REPORT } from "@/lib/services";

type Status = "idle" | "sending" | "sent" | "error";

export default function SampleReportForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [url, setUrl] = useState(SAMPLE_REPORT.pdf);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/sample-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"),
          website: fd.get("website"),
          newsletter: fd.get("newsletter") === "on",
          page: window.location.href,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      if (body.url) setUrl(body.url);
      setStatus("sent");
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "generate_lead", { form_name: "governance_sample_report" });
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "We couldn't send that. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="sample-done" role="status" aria-live="polite">
        <p className="sample-done-h">Your sample is ready.</p>
        <p>We&apos;ve also emailed you a copy of the link.</p>
        <a className="btn btn-red" href={url} target="_blank" rel="noopener" download>
          Download the PDF
        </a>
      </div>
    );
  }

  return (
    <form className="sample-form" onSubmit={onSubmit}>
      <div className="row">
        <label className="field">
          Work email
          <input type="email" name="email" autoComplete="email" required maxLength={200} />
        </label>
        <label className="field">
          <span>
            First name <span className="opt">(optional)</span>
          </span>
          <input type="text" name="name" autoComplete="given-name" maxLength={120} />
        </label>
      </div>
      <label className="field">
        <span>
          Company <span className="opt">(optional)</span>
        </span>
        <input type="text" name="company" autoComplete="organization" maxLength={160} />
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="newsletter" />
        <span>Also send me the Tasker &amp; Steward monthly email. Unsubscribe anytime.</span>
      </label>
      {status === "error" && error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-red submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Get the Sample Review"}
      </button>
      <p className="form-foot">
        We use your email to send the sample and occasional follow-up. See our <a href="/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
}
