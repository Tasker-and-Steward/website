import type { Metadata } from "next";
import LegalHeader from "../components/LegalHeader";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import { FAQ_GROUPS, FAQS, SITE_URL, faqPageJsonLd, faqsFor, organizationJsonLd } from "@/lib/site";

const TITLE = "Frequently asked questions";
const DESCRIPTION =
  "Answers about Role Reports, how an AI staffing agency works, what it costs, the 90-day trial, your data, and what the Steward on our team does.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: { title: `${TITLE} | Tasker & Steward`, description: DESCRIPTION, url: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationJsonLd(),
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/faq#webpage`,
      url: `${SITE_URL}/faq`,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en-US",
    },
    faqPageJsonLd(FAQS, `${SITE_URL}/faq#faq`),
  ],
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalHeader />
      <main id="main" className="faq-page">
        <p className="eyebrow">Questions</p>
        <h1>Frequently asked questions</h1>
        <p className="lead">
          How Role Reports work, what an agent costs, what happens during the trial, and who answers when you call. Don&apos;t see your question? Email{" "}
          <a href="mailto:hello@taskerandsteward.com">hello@taskerandsteward.com</a>.
        </p>

        {FAQ_GROUPS.map((group) => (
          <section className="faq-group" key={group.title} aria-label={group.title}>
            <h2>{group.title}</h2>
            <div className="faq-list">
              {faqsFor(group.questions).map(([q, a]) => (
                <details className="faq" key={q}>
                  <summary>
                    {q}
                    <span className="faq-icon" aria-hidden="true" />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="faq-page-cta">
          <h2>See it for your own role.</h2>
          <p>Send us a job you&apos;re hiring for and get a free Role Report: what an agent can carry, what still needs a person, and what each option costs.</p>
          <a className="btn btn-red" href="/#join">
            Get a free Role Report
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
