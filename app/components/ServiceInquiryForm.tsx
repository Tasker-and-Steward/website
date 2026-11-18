"use client";

import { useState, type FormEvent } from "react";
import {
  COMPANY_SIZES,
  CONSULTING,
  CONSULTING_NEEDS,
  CONSULTING_OWNERSHIP,
  CONSULTING_TIMELINES,
  GOVERNANCE,
  GOVERNANCE_POLICY,
  GOVERNANCE_STANDARDS,
  GOVERNANCE_TOOLS,
  INDUSTRIES,
  type ServiceInquiryKind,
} from "@/lib/services";

type Status = "idle" | "sending" | "sent" | "error";

function Choices({
  legend,
  name,
  options,
  type,
  required,
  hint,
}: {
  legend: string;
  name: string;
  options: string[];
  type: "checkbox" | "radio";
  required?: boolean;
  hint?: string;
}) {
  return (
    <fieldset className="choices">
      <legend>
        {legend} {!required && <span className="opt">(optional)</span>}
        {hint && <span className="choices-hint">{hint}</span>}
      </legend>
      <div className="choices-grid">
        {options.map((o, i) => (
          <label key={o} className="choice">
            <input type={type} name={name} value={o} required={required && type === "radio" && i === 0 ? true : undefined} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ServiceInquiryForm({ kind }: { kind: ServiceInquiryKind }) {
  const copy = kind === "governance" ? GOVERNANCE.cta : CONSULTING.cta;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string | string[] | boolean> = {};
    for (const [k, v] of fd.entries()) {
      if (typeof v !== "string") continue;
      const prev = data[k];
      if (prev === undefined) data[k] = v;
      else data[k] = Array.isArray(prev) ? [...prev, v] : [prev as string, v];
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          kind,
          newsletter: data.newsletter === "on",
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "generate_lead", { form_name: `${kind}_inquiry`, company_size: data.size });
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
      <div className="form thanks" role="status" aria-live="polite">
        <h2>{copy.thanksHeading}</h2>
        <p>{copy.thanks}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <p className="form-note">Fields marked optional can be left blank.</p>

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
          Company
          <input type="text" name="company" autoComplete="organization" required maxLength={160} />
        </label>
        <label className="field">
          Your role
          <input type="text" name="role" autoComplete="organization-title" required maxLength={120} />
        </label>
      </div>

      <div className="row">
        <label className="field">
          Company size
          <select name="size" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {COMPANY_SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        {kind === "governance" ? (
          <label className="field">
            <span>
              Industry <span className="opt">(optional)</span>
            </span>
            <select name="industry" defaultValue="">
              <option value="">Choose one</option>
              {INDUSTRIES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        ) : (
          <label className="field">
            <span>
              Phone <span className="opt">(optional)</span>
            </span>
            <input type="tel" name="phone" autoComplete="tel" maxLength={30} />
          </label>
        )}
      </div>

      {kind === "governance" ? (
        <>
          <Choices legend="Which AI tools does your team use today?" name="tools" options={GOVERNANCE_TOOLS} type="checkbox" hint="Select all that apply." />
          <Choices legend="Do you have a written AI use policy?" name="policy" options={GOVERNANCE_POLICY} type="radio" required />
          <Choices legend="Do you answer to any of these?" name="standards" options={GOVERNANCE_STANDARDS} type="checkbox" hint="Select all that apply." />
          <label className="field">
            <span>
              What prompted you to look into this? <span className="opt">(optional)</span>
            </span>
            <textarea name="message" rows={4} maxLength={5000} />
          </label>
        </>
      ) : (
        <>
          <Choices legend="What are you looking for?" name="need" options={CONSULTING_NEEDS} type="radio" required />
          <label className="field">
            What's the problem you want solved?
            <textarea name="message" rows={4} required maxLength={5000} />
          </label>
          <label className="field">
            <span>
              Which systems does your team use today? <span className="opt">(optional)</span>
            </span>
            <input type="text" name="systems" maxLength={500} placeholder="CRM, field service software, accounting, spreadsheets" />
          </label>
          <div className="row">
            <label className="field">
              <span>
                When do you want this in place? <span className="opt">(optional)</span>
              </span>
              <select name="timeline" defaultValue="">
                <option value="">Choose one</option>
                {CONSULTING_TIMELINES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <Choices legend="Who will own it once it's built?" name="ownership" options={CONSULTING_OWNERSHIP} type="radio" />
        </>
      )}

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

      {status === "error" && error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-red submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : copy.button}
      </button>
      <p className="form-foot">
        We&apos;ll reply within one business day. Prefer to talk? <a href="mailto:hello@taskerandsteward.com">hello@taskerandsteward.com</a> ·{" "}
        <a href="tel:+16172376870">(617) 237-6870</a>
      </p>
      <p className="form-foot">
        We use your details only to reply to you. See our <a href="/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
}
