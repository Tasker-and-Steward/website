export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.taskerandsteward.com").replace(/\/$/, "");
export const SITE_NAME = "Tasker & Steward";
export const LEGAL_NAME = "Tasker & Steward LLC";
export const TAGLINE = "AI staffing with human accountability";
export const EMAIL = "hello@taskerandsteward.com";
export const PHONE = "+1-617-237-6870";

export const HOME_TITLE = "AI Staffing Agency for Small Businesses | Tasker & Steward";
export const HOME_DESCRIPTION =
  "Get a free Role Report. We break down the job you're hiring for, show which duties an AI agent can handle, then place and manage that agent for you.";

export const FAQS: [string, string][] = [
  ["What is a Role Report?", "A free, written breakdown of a job you're hiring for. We go through the duties one by one, mark which ones an AI agent can handle and which still need a person, suggest a more focused role for the person you hire, and show what each option costs. It's yours to keep whether or not you work with us."],
  ["What is an AI staffing agency?", "It works like a staffing agency, except the placement is an AI agent. Tasker & Steward builds an agent for specific work in your business, such as answering calls, scheduling or following up on leads, places it with you, and assigns a Steward, a real person on our team who manages it and answers for its results."],
  ["What kinds of roles fit?", "Roles with a real share of repeatable work: front desk and intake, scheduling and dispatch, customer service, lead follow-up, data entry and billing support. Your Role Report will tell you honestly if a role isn't a good fit."],
  ["Do I have to be hiring?", "No. Send us any role you have today, or describe the work that keeps slipping through the cracks, and we'll break it down the same way."],
  ["What does it cost?", "Each AI agent has a one-time setup fee and a monthly rate based on the role it covers and how much work it handles. Your Role Report shows the cost for your role before you commit to anything."],
  ["How long does onboarding take?", "Onboarding takes about three weeks from kickoff to go-live. That includes connecting your systems, practice runs and a supervised first week before the agent works on its own."],
  ["Will this replace my staff?", "It's not designed to. Agents take on after-hours and repetitive work, so the people you have, and the next person you hire, can focus on the parts that need a person."],
  ["What does the Steward do?", "Your Steward is a real person on our team who manages your agent. They review its work every week, write performance reviews at 30, 60 and 90 days, make changes as your business changes, and answer when you call. They manage the agent, not your employees."],
  ["What if the agent doesn't work out?", "We retrain it or replace it at no cost. Every placement starts with a 90-day trial, and it only becomes a 12-month term if you decide to keep the agent."],
  ["What happens to our data?", "Your agent only gets access to the systems its job requires, and that access is logged. You'll get a written summary of what it collects, where it's stored and who on our team can see it."],
  ["What happens if we cancel?", "You can cancel the service after the 90-day trial or at the end of your 12-month term. Your business data is always yours, and we'll give you a full export of it when the service ends. The agent itself, and the work we put into building it, stays with us."],
  ["Who's behind Tasker & Steward?", "We've spent 25 years building systems for businesses. Now we build custom AI solutions for the everyday challenges that slow them down, and we put a real person in charge of every agent we place."],
];

// Shown on the home page. The full list lives at /faq.
export const HOME_FAQ_QUESTIONS = [
  "What is a Role Report?",
  "What is an AI staffing agency?",
  "What kinds of roles fit?",
  "What does it cost?",
  "Will this replace my staff?",
  "What if the agent doesn't work out?",
];

export const FAQ_GROUPS: { title: string; questions: string[] }[] = [
  {
    title: "How it works",
    questions: [
      "What is a Role Report?",
      "What is an AI staffing agency?",
      "What kinds of roles fit?",
      "Do I have to be hiring?",
      "How long does onboarding take?",
      "What does the Steward do?",
    ],
  },
  {
    title: "Pricing and terms",
    questions: ["What does it cost?", "What if the agent doesn't work out?", "What happens if we cancel?"],
  },
  {
    title: "Your team and your data",
    questions: ["Will this replace my staff?", "What happens to our data?", "Who's behind Tasker & Steward?"],
  },
];

const FAQ_MAP = new Map(FAQS);
export const faqsFor = (questions: string[]): [string, string][] =>
  questions.map((q) => {
    const a = FAQ_MAP.get(q);
    if (!a) throw new Error(`Unknown FAQ: ${q}`);
    return [q, a];
  });
export const HOME_FAQS = faqsFor(HOME_FAQ_QUESTIONS);

export function faqPageJsonLd(items: [string, string][], id: string) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    slogan: TAGLINE,
    description:
      "Tasker & Steward is an AI staffing agency. We review the duties in a job you're hiring for, build and place an AI agent for the repeatable work, and assign a Steward, a real person who manages the agent and answers for its results.",
    email: EMAIL,
    telephone: PHONE,
    address: { "@type": "PostalAddress", streetAddress: "6 Liberty Square, PMB #361", addressLocality: "Boston", addressRegion: "MA", postalCode: "02109", addressCountry: "US" },
    areaServed: { "@type": "Country", name: "United States" },
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", telephone: PHONE, email: EMAIL, areaServed: "US", availableLanguage: "English" },
    ],
    knowsAbout: [
      "AI agents",
      "AI receptionist",
      "After-hours call answering",
      "Lead follow-up",
      "Appointment scheduling",
      "Job description design",
      "Home services businesses",
    ],
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#service` },
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "AI agent staffing",
        serviceType: "AI staffing agency",
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "United States" },
        audience: { "@type": "BusinessAudience", name: "Small and mid-sized businesses" },
        description:
          "We build and place AI agents that handle repeatable work such as answering calls after hours, responding to web chat, following up on leads, scheduling and reminders, entering data and confirming orders. Every agent is managed by a Steward, a real person on our team. Placements start with a 90-day trial, with free retraining or replacement.",
        offers: [
          {
            "@type": "Offer",
            name: "Free Role Report",
            description:
              "A duty-by-duty breakdown of a job you're hiring for: what an AI agent can handle, what still needs a person, and what each option costs.",
            price: "0",
            priceCurrency: "USD",
            url: `${SITE_URL}/#join`,
          },
          {
            "@type": "Offer",
            name: "AI agent placement",
            description: "One-time setup fee, then a flat monthly rate based on the role the agent covers and how much work it handles.",
            url: `${SITE_URL}/#join`,
          },
        ],
      },
      faqPageJsonLd(HOME_FAQS, `${SITE_URL}/#faq`),
    ],
  };
}
