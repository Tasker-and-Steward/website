"use client";

import { useState, type FormEvent } from "react";

const INDUSTRIES = [
  "Home services",
  "Healthcare",
  "Legal",
  "Professional services",
  "Finance and insurance",
  "Real estate",
  "Manufacturing",
  "Retail",
  "Hospitality",
  "Technology",
  "Nonprofit",
  "Other",
];

const SIZES = ["1 to 9", "10 to 49", "50 to 249", "250 or more"];

export const SMS_CONSENT_TEXT =
  "Text me updates about my Role Report request. By checking this box, I agree to receive text messages from Tasker & Steward at the mobile number above. Message frequency varies, up to 2 messages per request. Message and data rates may apply. Reply HELP for help or STOP to opt out. Consent is not a condition of purchase.";

type Status = "idle" | "sending" | "sent" | "error";

export default function RoleReportForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const smsConsent = data.sms_consent === "on";
    const newsletter = data.newsletter === "on";

    if (smsConsent && !data.mobile?.trim()) {
      setError("Add a mobile number, or uncheck the text updates box.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/role-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sms_consent: smsConsent,
          newsletter,
          sms_consent_text: smsConsent ? SMS_CONSENT_TEXT : "",
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "generate_lead", {
        form_name: "role_report",
        industry: data.industry,
        company_size: data.size,
        sms_opt_in: smsConsent,
      });
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? `${err.message} You can also email hello@taskerandsteward.com.`
          : "We couldn't send your request. Please try again, or email hello@taskerandsteward.com."
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div id="join" className="form thanks" role="status" aria-live="polite">
        <h2>Thanks. Your request is in.</h2>
        <p>We'll review the role and email your Role Report within 2 business days. If anything about the posting is unclear, we'll reach out first.</p>
        <p>Have another role in mind? Reload the page to send it too.</p>
      </div>
    );
  }

  return (
    <form id="join" className="form" onSubmit={onSubmit} noValidate={false}>
      <div>
        <h2>Get a free Role Report.</h2>
        <p className="form-intro">
          Send us a job you're hiring for. We'll break it down duty by duty and show you what an agent can carry, what still needs a person, and what each option costs. Free, and yours to keep.
        </p>
      </div>
      <p className="form-note">All fields are required except mobile number.</p>

      <div className="row">
        <label className="field">
          Name
          <input type="text" name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label className="field">
          Work email
          <input type="email" name="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>

      <div className="row">
        <label className="field">
          <span>
            Mobile number <span className="opt">(optional)</span>
          </span>
          <input type="tel" name="mobile" autoComplete="tel" maxLength={30} />
        </label>
        <label className="field">
          Company
          <input type="text" name="company" autoComplete="organization" required maxLength={160} />
        </label>
      </div>

      <div className="row">
        <label className="field">
          Company size
          <select name="size" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Industry
          <select name="industry" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {INDUSTRIES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        Job title you're hiring for
        <input type="text" name="role" required maxLength={160} />
      </label>

      <label className="field">
        Paste the job description or a link to the posting
        <textarea name="posting" rows={3} required maxLength={20000} />
      </label>

      {/* Honeypot for bots. Real people never see or fill this. */}
      <div className="hp" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="consent">
        <input type="checkbox" name="newsletter" />
        <span>Also send me the Tasker &amp; Steward monthly email: AI and hiring news for owners, in plain English. Unsubscribe anytime.</span>
      </label>

      <label className="consent">
        <input type="checkbox" name="sms_consent" />
        <span>
          {SMS_CONSENT_TEXT} See our <a href="/privacy">Privacy Policy</a> and <a href="/sms-terms">SMS Terms</a>.
        </span>
      </label>

      {status === "error" && error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-red submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Get my free Role Report"}
      </button>
      <p className="form-foot">We'll email your report within 2 business days. No obligation, and you can unsubscribe anytime.</p>
    </form>
  );
}
