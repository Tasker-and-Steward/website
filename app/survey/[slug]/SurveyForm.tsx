"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { COMPANY_SIZES, type Survey, type SurveyPrefill } from "@/lib/crm";

// Same list as the Role Report form.
const INDUSTRIES = ["Home services", "Healthcare", "Legal", "Professional services", "Finance and insurance", "Real estate", "Manufacturing", "Retail", "Hospitality", "Technology", "Nonprofit", "Other"];
type Answer = string | string[];
type Who = { name: string; email: string; company: string; title: string; company_size: string; industry: string };

const BLANK: Who = { name: "", email: "", company: "", title: "", company_size: "", industry: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fromPrefill(p: SurveyPrefill | null): Who {
  if (!p) return BLANK;
  return {
    name: [p.firstName, p.lastName].filter(Boolean).join(" "),
    email: p.email ?? "",
    company: p.company ?? "",
    title: p.title ?? "",
    company_size: p.companySize ?? "",
    industry: "",
  };
}

// Step 0 is "About you": an invited person confirms the details we sent the
// email to ("Is this you?"); anyone else fills them in. Then one question per
// screen, then a last step for the report, drawing and newsletter choices.
export default function SurveyForm({ survey, rulesUrl, prefill = null }: { survey: Survey; rulesUrl: string; prefill?: SurveyPrefill | null }) {
  const qs = survey.questions;
  const last = qs.length + 1;
  const total = qs.length + 2;
  const [step, setStep] = useState(0);
  const [who, setWho] = useState<Who>(() => fromPrefill(prefill));
  const [editing, setEditing] = useState(!prefill?.email);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [problem, setProblem] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const tracking = useRef<Record<string, string>>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const firstField = useRef<HTMLInputElement>(null);

  // The personal link from an email (?t=…&utm_content=step1) counts as a click.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const keys = ["t", "utm_source", "utm_medium", "utm_campaign", "utm_content"];
    tracking.current = Object.fromEntries(keys.map((k) => [k, p.get(k) ?? ""]).filter(([, v]) => v));
    const token = p.get("t");
    if (token && token !== "test") {
      void fetch(`/api/survey/${survey.slug}/visit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, step: p.get("utm_content") }),
        keepalive: true,
      }).catch(() => undefined);
    }
  }, [survey.slug]);

  useEffect(() => {
    if (step > 0) heading.current?.focus();
  }, [step]);

  const q = step >= 1 && step <= qs.length ? qs[step - 1] : null;
  const value = q ? answers[q.id] : undefined;
  const answered = (a: Answer | undefined) => (Array.isArray(a) ? a.length > 0 : Boolean(a && a.trim()));
  const set = (k: keyof Who) => (v: string) => setWho((w) => ({ ...w, [k]: v }));

  function next() {
    if (step === 0) {
      if (!EMAIL.test(who.email.trim())) {
        setEditing(true);
        setProblem("Please enter a valid work email to continue.");
        return;
      }
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "survey_details", { survey: survey.slug, prefilled: Boolean(prefill), edited: editing && Boolean(prefill) });
    }
    if (q && q.required && !answered(value)) {
      setProblem(q.type === "multiple" ? "Choose at least one answer to continue." : "Choose an answer to continue.");
      return;
    }
    setProblem("");
    setStep(step + 1);
  }

  function edit(fresh: boolean) {
    if (fresh) setWho(BLANK);
    setEditing(true);
    setProblem("");
    setTimeout(() => firstField.current?.focus(), 0);
  }

  function toggle(option: string) {
    if (!q) return;
    const current = Array.isArray(value) ? value : [];
    setAnswers({ ...answers, [q.id]: current.includes(option) ? current.filter((x) => x !== option) : [...current, option] });
    setProblem("");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < last) return next();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`/api/survey/${survey.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          name: who.name,
          email: who.email,
          company: who.company,
          title: who.title,
          company_size: who.company_size,
          industry: who.industry,
          wants_report: data.wants_report === "on",
          raffle_entry: data.raffle_entry === "on",
          marketing_consent: data.marketing_consent === "on",
          website: data.website,
          token: tracking.current.t,
          utm_source: tracking.current.utm_source,
          utm_medium: tracking.current.utm_medium,
          utm_campaign: tracking.current.utm_campaign,
          utm_content: tracking.current.utm_content,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; problems?: string[] };
      if (!res.ok) throw new Error([body.error, ...(body.problems ?? [])].filter(Boolean).join(" ") || "Something went wrong.");
      setStatus("sent");
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "survey_complete", { survey: survey.slug, raffle: data.raffle_entry === "on", prefilled: Boolean(prefill), source: tracking.current.utm_content || "direct" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't save your answers. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <section className="survey-card" aria-live="polite">
        <h2>Thank you</h2>
        <p>{survey.thankYou || "Your answers are in. We'll email you the results report when the survey closes."}</p>
        <p>
          <a href="/">Visit Tasker &amp; Steward</a>
        </p>
      </section>
    );
  }

  const confirming = step === 0 && !editing;
  const pct = Math.round((step / total) * 100);
  const label = step === 0 ? "About you" : q ? `Question ${step} of ${qs.length}` : "Last step";
  const primary = confirming ? "Yes, that's me" : step < last ? "Next" : status === "sending" ? "Sending…" : "Submit";
  const industrySelect = (
    <label className="field">
      Industry
      <select name="industry" value={who.industry} onChange={(e) => set("industry")(e.target.value)}>
        <option value="">Choose…</option>
        {INDUSTRIES.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </label>
  );
  const privacy = "Results are reported only in aggregate. Your name and company never appear in the report.";

  return (
    <form className="survey-card" onSubmit={onSubmit} noValidate>
      <div className="survey-progress" role="progressbar" aria-label="Survey progress" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step} aria-valuetext={`Step ${step + 1} of ${total}`}>
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="survey-step">{label}</p>

      {step === 0 && confirming && (
        <fieldset className="survey-q">
          <legend>
            <h2 ref={heading} tabIndex={-1}>
              Is this you?
            </h2>
            <span className="survey-hint">We filled this in from your invitation so you don&apos;t have to type it.</span>
          </legend>
          <dl className="survey-who">
            {who.name && (
              <div>
                <dt>Name</dt>
                <dd>{who.name}</dd>
              </div>
            )}
            <div>
              <dt>Work email</dt>
              <dd>{who.email}</dd>
            </div>
            {who.company && (
              <div>
                <dt>Company</dt>
                <dd>{who.company}</dd>
              </div>
            )}
            {who.title && (
              <div>
                <dt>Role or title</dt>
                <dd>{who.title}</dd>
              </div>
            )}
            {who.company_size && (
              <div>
                <dt>Company size</dt>
                <dd>{who.company_size} employees</dd>
              </div>
            )}
          </dl>
          <div className="row survey-row">{industrySelect}</div>
          <p className="survey-who-actions">
            <button type="button" className="link-btn" onClick={() => edit(false)}>
              Edit details
            </button>
            <span aria-hidden="true"> · </span>
            <button type="button" className="link-btn" onClick={() => edit(true)}>
              Not you? Start with a blank form
            </button>
          </p>
          <p className="survey-privacy">{privacy}</p>
        </fieldset>
      )}

      {step === 0 && !confirming && (
        <fieldset className="survey-q">
          <legend>
            <h2 ref={heading} tabIndex={-1}>
              {prefill ? "Update your details" : "First, a little about you"}
            </h2>
            <span className="survey-hint">So we can send you the results report. Only your work email is required.</span>
          </legend>
          <div className="row survey-row">
            <label className="field">
              Name
              <input ref={firstField} name="name" autoComplete="name" maxLength={120} value={who.name} onChange={(e) => set("name")(e.target.value)} />
            </label>
            <label className="field">
              Work email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={who.email}
                aria-invalid={Boolean(problem) || undefined}
                onChange={(e) => (set("email")(e.target.value), setProblem(""))}
              />
            </label>
          </div>
          <div className="row survey-row">
            <label className="field">
              Company
              <input name="company" autoComplete="organization" maxLength={200} value={who.company} onChange={(e) => set("company")(e.target.value)} />
            </label>
            <label className="field">
              Role or title
              <input name="title" autoComplete="organization-title" maxLength={120} value={who.title} onChange={(e) => set("title")(e.target.value)} />
            </label>
          </div>
          <div className="row survey-row">
            {industrySelect}
            <label className="field">
              Company size
              <select name="company_size" value={who.company_size} onChange={(e) => set("company_size")(e.target.value)}>
                <option value="">Choose…</option>
                {COMPANY_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s} employees
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="survey-privacy">{privacy}</p>
          {problem && (
            <p className="form-error" role="alert">
              {problem}
            </p>
          )}
        </fieldset>
      )}

      {q && (
        <fieldset className="survey-q" key={q.id}>
          <legend>
            <h2 ref={heading} tabIndex={-1}>
              {q.question}
            </h2>
            {q.type === "multiple" && <span className="survey-hint">Select all that apply.</span>}
            {!q.required && <span className="survey-hint">Optional.</span>}
          </legend>
          {q.type === "text" ? (
            <label className="field">
              <span className="sr-only">Your answer</span>
              <textarea value={typeof value === "string" ? value : ""} maxLength={2000} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} />
            </label>
          ) : (
            <div className="survey-options">
              {q.options.map((o) => {
                const checked = q.type === "single" ? value === o : Array.isArray(value) && value.includes(o);
                return (
                  <label key={o} className={`survey-option${checked ? " is-on" : ""}`}>
                    <input
                      type={q.type === "single" ? "radio" : "checkbox"}
                      name={q.id}
                      value={o}
                      checked={checked}
                      onChange={() => (q.type === "single" ? (setAnswers({ ...answers, [q.id]: o }), setProblem("")) : toggle(o))}
                    />
                    <span>{o}</span>
                  </label>
                );
              })}
            </div>
          )}
          {problem && (
            <p className="form-error" role="alert">
              {problem}
            </p>
          )}
        </fieldset>
      )}

      {step === last && (
        <fieldset className="survey-q">
          <legend>
            <h2 ref={heading} tabIndex={-1}>
              Almost done
            </h2>
            <span className="survey-hint">We&apos;ll send the report to {who.email}.</span>
          </legend>
          <label className="consent">
            <input type="checkbox" name="wants_report" defaultChecked />
            <span>Send me the results report.</span>
          </label>
          {survey.raffle.enabled && (
            <label className="consent">
              <input type="checkbox" name="raffle_entry" />
              <span>
                Enter me in the {survey.raffle.prize ?? "gift card"} drawing. No purchase necessary. <a href={rulesUrl}>See the drawing rules</a>.
              </span>
            </label>
          )}
          <label className="consent">
            <input type="checkbox" name="marketing_consent" />
            <span>Also send me the Tasker &amp; Steward monthly email. Unsubscribe any time.</span>
          </label>
          <div className="hp" aria-hidden="true">
            <label>
              Website <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </fieldset>
      )}

      <div className="survey-nav">
        {step > 0 && (
          <button type="button" className="btn survey-back" onClick={() => (setProblem(""), setStep(step - 1))}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-red submit" disabled={status === "sending"}>
          {primary}
        </button>
      </div>
    </form>
  );
}
