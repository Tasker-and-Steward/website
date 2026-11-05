"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function NewsletterSignup({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("done");
      form.reset();
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "sign_up", { method: "newsletter" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className={`nl-done ${tone}`} role="status">
        You're on the list. The next issue lands in your inbox early next month.
      </p>
    );
  }

  return (
    <form className={`nl-form ${tone}`} onSubmit={onSubmit}>
      <label className="nl-field">
        <span className="sr-only">First name</span>
        <input type="text" name="first_name" placeholder="First name" autoComplete="given-name" maxLength={80} />
      </label>
      <label className="nl-field nl-email">
        <span className="sr-only">Work email</span>
        <input type="email" name="email" placeholder="Work email" autoComplete="email" required maxLength={200} />
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" className="btn btn-red" disabled={status === "sending"}>
        {status === "sending" ? "Signing up…" : "Subscribe"}
      </button>
      {status === "error" && error && (
        <p className="nl-error" role="alert">
          {error}
        </p>
      )}
      <p className="nl-note">One short, practical email a month. Unsubscribe anytime.</p>
    </form>
  );
}
