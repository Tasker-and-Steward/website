import type { Metadata } from "next";
import LegalHeader from "../components/LegalHeader";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import RoleReportCta from "../components/RoleReportCta";
import { HUB, HUB_PATH, ROLES, ROLES_UPDATED, ROLES_UPDATED_LABEL } from "@/lib/roles";
import { hubJsonLd } from "@/lib/roles-jsonld";

export const metadata: Metadata = {
  title: { absolute: `${HUB.title} | Tasker & Steward` },
  description: HUB.description,
  alternates: { canonical: HUB_PATH },
  openGraph: { title: `${HUB.title} | Tasker & Steward`, description: HUB.description, url: HUB_PATH, type: "website" },
  twitter: { card: "summary_large_image", title: HUB.title, description: HUB.description },
};

export default function AiOrHireHub() {
  return (
    <>
      <JsonLd data={hubJsonLd()} />
      <LegalHeader />
      <main id="main" className="guide">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li aria-current="page">AI or hire?</li>
          </ol>
        </nav>

        <p className="eyebrow">Role by role</p>
        <h1>{HUB.h1}</h1>
        <p className="guide-answer">{HUB.answer}</p>
        <p className="guide-updated">
          Last updated <time dateTime={ROLES_UPDATED}>{ROLES_UPDATED_LABEL}</time>
        </p>
        <p className="guide-p">{HUB.intro}</p>

        <section aria-labelledby="pick-h">
          <h2 id="pick-h">Pick a role</h2>
          <div className="guide-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Role</th>
                  <th scope="col">Typical yearly pay</th>
                  <th scope="col">What AI handles well</th>
                  <th scope="col">What still needs a person</th>
                </tr>
              </thead>
              <tbody>
                {ROLES.map((r) => (
                  <tr key={r.slug}>
                    <th scope="row">
                      <a href={`${HUB_PATH}/${r.slug}`}>{r.name}</a>
                    </th>
                    <td>{r.pay}</td>
                    <td>{r.aiHandles}</td>
                    <td>{r.needsPerson}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="guide-note">{HUB.payNote}</p>
        </section>

        <section aria-labelledby="cost-h">
          <h2 id="cost-h">{HUB.costHeading}</h2>
          <p className="guide-p">{HUB.cost}</p>
        </section>

        <section aria-labelledby="agent-h">
          <h2 id="agent-h">{HUB.agentHeading}</h2>
          <p className="guide-p">{HUB.agent}</p>
        </section>

        <div className="faq-page-cta">
          <h2>{HUB.ctaHeading}</h2>
          <p>{HUB.ctaBody}</p>
          <RoleReportCta source="ai-or-hire" />
        </div>

        <section className="faq-group" aria-labelledby="faq-h">
          <h2 id="faq-h">Common questions</h2>
          <div className="faq-list">
            {HUB.faqs.map(([q, a]) => (
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

        <section className="guide-sources" aria-labelledby="src-h">
          <h2 id="src-h">Sources</h2>
          <ul>
            {HUB.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
