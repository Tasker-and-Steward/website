"use client";

import { useState, type FormEvent } from "react";

const TOPICS = ["A general question", "Working with us", "Partnerships and referrals", "Press or speaking", "Something else"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          newsletter: data.newsletter === "on",
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "generate_lead", { form_name: "contact", topic: data.topic });
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? `${err.message} You can also email hello@taskerandsteward.com.`
          : "We couldn't send your message. Please try again, or email hello@taskerandsteward.com."
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form thanks" role="status" aria-live="polite">
        <h2>Thanks. Your message is in.</h2>
        <p>A real person on our team reads every message, and we'll get back to you soon.</p>
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
          Email
          <input type="email" name="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>

      <div className="row">
        <label className="field">
          <span>
            Company <span className="opt">(optional)</span>
          </span>
          <input type="text" name="company" autoComplete="organization" maxLength={160} />
        </label>
        <label className="field">
          <span>
            Phone <span className="opt">(optional)</span>
          </span>
          <input type="tel" name="phone" autoComplete="tel" maxLength={30} />
        </label>
      </div>

      <label className="field">
        What's this about?
        <select name="topic" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="field">
        Your message
        <textarea name="message" rows={5} required maxLength={5000} />
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

      {status === "error" && error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-red submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="form-foot">
        We use your details only to reply to you. See our <a href="/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
}
