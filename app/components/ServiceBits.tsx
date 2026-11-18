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
