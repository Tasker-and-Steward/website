import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalHeader from "../../components/LegalHeader";
import SiteFooter from "../../components/SiteFooter";
import JsonLd from "../../components/JsonLd";
import RoleReportCta from "../../components/RoleReportCta";
import { HUB_PATH, ROLES, ROLES_UPDATED, ROLES_UPDATED_LABEL, roleBySlug, type Task } from "@/lib/roles";
import { roleJsonLd } from "@/lib/roles-jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROLES.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role: slug } = await params;
  const role = roleBySlug(slug);
  if (!role) return {};
  const path = `${HUB_PATH}/${role.slug}`;
  return {
    title: role.title,
    description: role.description,
    alternates: { canonical: path },
    openGraph: { title: `${role.title} | Tasker & Steward`, description: role.description, url: path, type: "article" },
    twitter: { card: "summary_large_image", title: role.title, description: role.description },
  };
}

function TaskList({ items, tone }: { items: Task[]; tone: "agent" | "both" | "hire" }) {
  return (
    <ul className={`task-list task-${tone}`}>
      {items.map(([name, detail]) => (
        <li key={name}>
          <strong>{name}.</strong> {detail}
        </li>
      ))}
    </ul>
  );
}

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role: slug } = await params;
  const role = roleBySlug(slug);
  if (!role) notFound();
  const related = role.related.map((s) => roleBySlug(s)).filter((r) => r !== undefined);

  return (
    <>
      <JsonLd data={roleJsonLd(role)} />
      <LegalHeader />
      <main id="main" className="guide">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href={HUB_PATH}>AI or hire?</a>
            </li>
            <li aria-current="page">{role.short}</li>
          </ol>
        </nav>

        <p className="eyebrow">AI or hire?</p>
        <h1>{role.question}</h1>
        <p className="guide-answer">{role.answer}</p>
        <p className="guide-updated">
          Last updated <time dateTime={ROLES_UPDATED}>{ROLES_UPDATED_LABEL}</time>
        </p>

        <section aria-labelledby="ai-h">
          <h2 id="ai-h">What AI handles well today</h2>
          <TaskList items={role.aiWell} tone="agent" />
        </section>

        <section aria-labelledby="both-h">
          <h2 id="both-h">What works best with AI and a person together</h2>
          <TaskList items={role.together} tone="both" />
        </section>

        <section aria-labelledby="hire-h">
          <h2 id="hire-h">What still needs a person</h2>
          <TaskList items={role.person} tone="hire" />
        </section>

        <section aria-labelledby="cost-h">
          <h2 id="cost-h">Cost comparison</h2>
          <div className="guide-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Option</th>
                  <th scope="col">Yearly cost</th>
                  <th scope="col">Monthly cost</th>
                </tr>
              </thead>
              <tbody>
                {role.cost.map(([option, year, month]) => (
                  <tr key={option}>
                    <th scope="row">{option}</th>
                    <td>{year}</td>
                    <td>{month}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="guide-note">{role.costNote}</p>
        </section>

        <section aria-labelledby="ex-h">
          <h2 id="ex-h">Example</h2>
          <p className="example-tag">Illustrative example</p>
          <p className="guide-p">{role.example}</p>
        </section>

        <section aria-labelledby="when-h">
          <h2 id="when-h">When you should still hire</h2>
          <p className="guide-p">{role.whenToHire}</p>
        </section>

        <div className="faq-page-cta">
          <h2>{role.ctaHeading}</h2>
          <p>{role.ctaBody}</p>
          <RoleReportCta source={`ai-or-hire/${role.slug}`} />
        </div>

        <section className="faq-group" aria-labelledby="faq-h">
          <h2 id="faq-h">Common questions</h2>
          <div className="faq-list">
            {role.faqs.map(([q, a]) => (
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

        <section className="guide-related" aria-labelledby="rel-h">
          <h2 id="rel-h">Weighing another role?</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <a href={`${HUB_PATH}/${r.slug}`}>
                  <span>{r.name}</span>
                  <small>See what AI can take on</small>
                </a>
              </li>
            ))}
          </ul>
          <a className="faq-all" href={HUB_PATH}>
            See all roles <span aria-hidden="true">&rarr;</span>
          </a>
        </section>

        <section className="guide-sources" aria-labelledby="src-h">
          <h2 id="src-h">Sources</h2>
          <ul>
            {role.sources.map((s) => (
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
