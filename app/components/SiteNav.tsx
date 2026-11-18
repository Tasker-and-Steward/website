"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/ai-governance", label: "AI Governance" },
  { href: "/ai-consulting", label: "AI Consulting" },
  { href: "/contact", label: "Contact Us" },
];

// The site header: wordmark, main navigation and the Role Report button.
// Collapses into a menu button on small screens.
export default function SiteNav({ bordered = true }: { bordered?: boolean }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`topbar site-nav${bordered ? "" : " no-border"}${open ? " is-open" : ""}`}>
      <div className="nav-brand">
        <a className="wordmark" href="/" aria-label="Tasker and Steward home">
          Tasker <span className="amp">&amp;</span> Steward
        </a>
        <span className="soon">Launching early 2027</span>
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="nav-bars" aria-hidden="true" />
      </button>

      <nav id="site-menu" className="nav-menu" aria-label="Main">
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="toplink" aria-current={path === l.href ? "page" : undefined} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="/#join" className="btn btn-ghost nav-cta" onClick={() => setOpen(false)}>
          Get a free Role Report
        </a>
      </nav>
    </header>
  );
}
