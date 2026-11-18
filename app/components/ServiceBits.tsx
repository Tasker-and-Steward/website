import { ServiceIcon } from "./ServiceIcons";
import type { Callout } from "@/lib/services";
import type { ListItem } from "@/lib/services";

export function Crumbs({ name }: { name: string }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="/">Home</a>
        </li>
        <li aria-current="page">{name}</li>
      </ol>
    </nav>
  );
}

export function LeadList({ items }: { items: ListItem[] }) {
  return (
    <ul className="svc-list">
      {items.map(([lead, text]) => (
        <li key={lead}>
          <strong>{lead}</strong> {text}
        </li>
      ))}
    </ul>
  );
}

export function FaqSection({ faqs }: { faqs: ListItem[] }) {
  return (
    <section className="faq-group" aria-labelledby="faq-h">
      <h2 id="faq-h">Common questions</h2>
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details className="faq" key={q} open>
            <summary>
              {q}
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Related({ links }: { links: { href: string; title: string; note: string }[] }) {
  return (
    <section className="guide-related" aria-labelledby="related-h">
      <h2 id="related-h">Related services</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>
              {l.title}
              <small>{l.note}</small>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServiceCallout({ c }: { c: Callout }) {
  return (
    <div className="svc-callout">
      <div className="svc-callout-top">
        <ServiceIcon name={c.icon} stroke="#F4EFE4" size={52} />
        <p>
          <b>{c.lead}</b> {c.rest}
        </p>
      </div>
      <ul className="svc-callout-grid">
        {c.tiles.map((t) => (
          <li className="svc-callout-tile" key={t.title}>
            <ServiceIcon name={t.icon} stroke="#14243A" />
            <strong>{t.title}</strong>
            <span>{t.sub}</span>
          </li>
        ))}
      </ul>
      <ol className="svc-callout-ways">
        {c.ways.map(([b, rest], i) => (
          <li key={b}>
            <i aria-hidden="true">{i + 1}</i>
            <span>
              <b>{b}</b> {rest}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
