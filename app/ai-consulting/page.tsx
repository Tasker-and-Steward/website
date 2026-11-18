import type { Metadata } from "next";
import LegalHeader from "../components/LegalHeader";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import ServiceInquiryForm from "../components/ServiceInquiryForm";
import { Crumbs, FaqSection, LeadList, Related } from "../components/ServiceBits";
import { CONSULTING, GOVERNANCE, SERVICES_UPDATED, SERVICES_UPDATED_LABEL, consultingJsonLd } from "@/lib/services";

const C = CONSULTING;

export const metadata: Metadata = {
  title: { absolute: `${C.title} | Tasker & Steward` },
  description: C.description,
  alternates: { canonical: C.path },
  keywords: [
    "AI consulting",
    "AI consulting for small business",
    "custom AI solutions",
    "custom AI development",
    "AI command center",
    "AI dashboard",
    "AI adoption",
    "AI training for teams",
  ],
  openGraph: { title: `${C.title} | Tasker & Steward`, description: C.description, url: C.path, type: "website" },
  twitter: { card: "summary_large_image", title: C.title, description: C.description },
};

export default function AiConsulting() {
  return (
    <>
      <JsonLd data={consultingJsonLd()} />
      <LegalHeader />
      <main id="main" className="guide svc">
        <Crumbs name={C.name} />
        <p className="eyebrow">AI consulting &amp; custom builds</p>
        <h1>{C.h1}</h1>
        <p className="guide-answer">{C.answer}</p>
        <p className="guide-updated">
          Last updated <time dateTime={SERVICES_UPDATED}>{SERVICES_UPDATED_LABEL}</time>
        </p>
        <p className="guide-p">{C.intro}</p>
        <a className="btn btn-red svc-jump" href="#inquiry">
          {C.cta.button}
        </a>

        <section aria-labelledby="consulting-h">
          <h2 id="consulting-h">{C.consultingHeading}</h2>
          <p className="guide-p">{C.consultingIntro}</p>
          <LeadList items={C.consulting} />
        </section>

        <section aria-labelledby="builds-h">
          <h2 id="builds-h">{C.buildsHeading}</h2>
          <p className="guide-p">{C.buildsIntro}</p>
          <LeadList items={C.builds} />
          <p className="guide-p">{C.handoff}</p>
        </section>

        <section aria-labelledby="how-h">
          <h2 id="how-h">{C.howHeading}</h2>
          <p className="guide-p">{C.how}</p>
        </section>

        <section id="inquiry" className="svc-cta" aria-labelledby="cta-h">
          <div className="svc-cta-head">
            <h2 id="cta-h">{C.cta.heading}</h2>
            <p>{C.cta.body}</p>
          </div>
          <ServiceInquiryForm kind="consulting" />
        </section>

        <FaqSection faqs={C.faqs} />

        <Related
          links={[
            { href: GOVERNANCE.path, title: GOVERNANCE.name, note: "Policies and controls for all your AI" },
            { href: "/#join", title: "AI agent staffing", note: "Get a free Role Report" },
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
