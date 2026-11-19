import type { Metadata } from "next";
import LegalHeader from "../components/LegalHeader";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import ServiceInquiryForm from "../components/ServiceInquiryForm";
import SampleReportForm from "../components/SampleReportForm";
import { Crumbs, FaqSection, LeadList, Related, ServiceCallout } from "../components/ServiceBits";
import { CONSULTING, GOVERNANCE, SAMPLE_REPORT, SERVICES_UPDATED, SERVICES_UPDATED_LABEL, governanceJsonLd } from "@/lib/services";

const G = GOVERNANCE;

export const metadata: Metadata = {
  title: { absolute: `${G.title} | Tasker & Steward` },
  description: G.description,
  alternates: { canonical: G.path },
  keywords: [
    "AI governance",
    "AI governance for small business",
    "AI use policy",
    "AI security",
    "AI acceptable use policy",
    "AI vendor review",
    "AI data handling policy",
    "AI risk management",
  ],
  openGraph: { title: `${G.title} | Tasker & Steward`, description: G.description, url: G.path, type: "website" },
  twitter: { card: "summary_large_image", title: G.title, description: G.description },
};

export default function AiGovernance() {
  return (
    <>
      <JsonLd data={governanceJsonLd()} />
      <LegalHeader />
      <main id="main" className="guide svc">
        <Crumbs name={G.name} />
        <p className="eyebrow">AI governance &amp; security</p>
        <h1>{G.h1}</h1>
        <ServiceCallout c={G.callout} />
        <p className="guide-updated">
          Last updated <time dateTime={SERVICES_UPDATED}>{SERVICES_UPDATED_LABEL}</time>
        </p>
        {G.hook.map((p) => (
          <p className="guide-p" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
        <div className="svc-jump-row">
          <a className="btn btn-red" href="#inquiry">
            {G.cta.button}
          </a>
          <a className="svc-sample-link" href="#sample">
            Or see a sample review <span aria-hidden="true">&darr;</span>
          </a>
        </div>

        <section aria-labelledby="ways-h">
          <h2 id="ways-h">{G.twoWaysHeading}</h2>
          <div className="svc-cards">
            {G.twoWays.map(([lead, text]) => (
              <div className="svc-card" key={lead}>
                <h3>{lead}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="includes-h">
          <h2 id="includes-h">{G.includesHeading}</h2>
          <LeadList items={G.includes} />
        </section>

        <section id="sample" className="sample-cta" aria-labelledby="sample-h">
          <img className="sample-cover" src={SAMPLE_REPORT.cover} width={240} height={310} alt="Cover of the Sample AI Governance Review for Harbor Point Home Services, a fictional company" loading="lazy" />
          <div className="sample-body">
            <p className="eyebrow">{SAMPLE_REPORT.eyebrow}</p>
            <h2 id="sample-h">{SAMPLE_REPORT.heading}</h2>
            <p>{SAMPLE_REPORT.body}</p>
            <ul className="sample-points">
              {SAMPLE_REPORT.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <SampleReportForm />
          </div>
        </section>

        <section aria-labelledby="fit-h">
          <h2 id="fit-h">{G.fitHeading}</h2>
          <p className="guide-p">{G.fit}</p>
        </section>

        <section aria-labelledby="oversight-h">
          <h2 id="oversight-h">{G.oversightHeading}</h2>
          <p className="guide-p">{G.oversight}</p>
        </section>

        <section aria-labelledby="how-h">
          <h2 id="how-h">{G.howHeading}</h2>
          <p className="guide-p">{G.how}</p>
        </section>

        <section id="inquiry" className="svc-cta" aria-labelledby="cta-h">
          <div className="svc-cta-head">
            <h2 id="cta-h">{G.cta.heading}</h2>
            <p>{G.cta.body}</p>
          </div>
          <ServiceInquiryForm kind="governance" />
        </section>

        <FaqSection faqs={G.faqs} />

        <Related
          links={[
            { href: CONSULTING.path, title: CONSULTING.name, note: "Advice, rollout and tools you own" },
            { href: "/#join", title: "AI agent staffing", note: "Get a free Role Report" },
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
