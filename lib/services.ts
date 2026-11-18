// The two supporting-service pages (Gil, 2026-11-18): AI Governance & Security
// and AI Consulting & Custom Builds. Copy, form options, FAQs and structured
// data live here so the pages, sitemap and llms.txt stay in step.

import { SITE_URL, faqPageJsonLd, organizationJsonLd } from "@/lib/site";

export const SERVICES_UPDATED = "2026-11-18";
export const SERVICES_UPDATED_LABEL = "November 2026";

export type ListItem = [string, string];

export type Callout = {
  icon: string;
  lead: string;
  rest: string;
  tiles: { icon: string; title: string; sub: string }[];
  ways: [string, string][];
};

export type ServiceInquiryKind = "governance" | "consulting";

export const COMPANY_SIZES = ["1 to 9", "10 to 49", "50 to 249", "250 or more"];

export const INDUSTRIES = [
  "Home services",
  "Healthcare",
  "Legal",
  "Professional services",
  "Finance and insurance",
  "Real estate",
  "Staffing and recruiting",
  "Manufacturing",
  "Retail",
  "Hospitality",
  "Technology",
  "Nonprofit",
  "Other",
];

// ---------- AI Governance & Security ----------

export const GOVERNANCE = {
  path: "/ai-governance",
  name: "AI Governance & Security",
  title: "AI Governance & Security for Businesses",
  description:
    "AI use policies, data handling rules, access controls, vendor reviews and incident response for every AI tool your business uses, not just ours. Custom-scoped programs with optional monthly oversight.",
  h1: "Your team is already using AI. Someone should be in charge of it.",
  answer:
    "AI governance is the set of rules, controls and owners that decide how a business uses AI: which tools are approved, what data can go into them, who can access them, and what happens when something goes wrong. Tasker & Steward includes governance with every AI agent we staff, and builds custom governance and security programs that cover the rest of a company's AI.",
  callout: {
    icon: "shield",
    lead: "AI governance",
    rest: "is the set of rules, controls and owners that decide how your business uses AI. It answers four questions:",
    tiles: [
      { icon: "tools", title: "Which tools?", sub: "What's approved, and for what" },
      { icon: "data", title: "What data?", sub: "What can go in, and what can't" },
      { icon: "lock", title: "Who has access?", sub: "Accounts, permissions, owners" },
      { icon: "alert", title: "What if it goes wrong?", sub: "Who gets the call, and what happens" },
    ],
    ways: [
      ["Included", "with every agent we staff"],
      ["Custom programs", "for the rest of your AI"],
    ],
  } as Callout,
  hook: [
    "Someone on your staff pasted a customer email into a chatbot this week. Someone else signed up for an AI note-taker that records every call. Nobody approved either one, and nobody knows where that data went.",
    "Every AI tool in your business can see something, say something, or decide something on your behalf. Without clear rules, nobody is accountable for what it does. Governance is how you set those rules: who can use what, what data goes where, and what happens when something goes wrong. It's the difference between AI your business controls and AI that just happens to your business.",
  ],
  twoWaysHeading: "Two ways we handle it",
  twoWays: [
    [
      "With every agent we staff.",
      "Governance comes standard. Each Tasker & Steward agent starts with defined permissions, escalation rules, a full record of its activity, and a named Steward who watches over it. It works the same way a new employee signs the handbook before their first shift. That package covers the agent we place.",
    ],
    [
      "For the rest of your AI.",
      "Most of the AI in your business didn't come from us. It's the tools your team adopted on its own, the AI features inside software you already pay for, and whatever you're thinking of bringing in next. We build a custom governance and security program around all of it, scoped and priced as its own engagement. You don't need an agent with us to get one.",
    ],
  ] as ListItem[],
  includesHeading: "What we put in place",
  includes: [
    ["AI use policy.", "Clear rules on which tools are approved, what they can be used for, and what's off limits, written so the people following them can understand them."],
    ["Data handling rules.", "Which information can go into AI tools and which can't, with specific guidance for customer, employee, and financial data."],
    ["Access and security controls.", "Who can use which tools, under which accounts, and with what permissions, set up in your systems and not left on paper."],
    ["Vendor review.", "A checklist and review process for any AI product your team wants to adopt, covering data retention, training use, and security commitments."],
    ["Accountability model.", "Who approves new AI use, who owns each tool once it's live, and who answers for it when something goes wrong."],
    ["Incident response.", "What happens when an AI tool exposes data or gives a customer a wrong answer, and who gets the call."],
  ] as ListItem[],
  fitHeading: "Built around how you actually work",
  fit: "We start by finding every place AI already touches your business, then write the policies, controls, and review processes to fit. A ten-person office and a multi-location operation get the same rigor, scaled to the size of the job. If you answer to a regulator, a client audit, or an insurance requirement, we build to that standard too.",
  oversightHeading: "Ongoing oversight",
  oversight:
    "Policies go stale the moment your team adopts a new tool. An optional monthly oversight plan covers new tool reviews, periodic access audits, and policy updates as your use of AI grows.",
  howHeading: "How it works",
  how: "Governance engagements are scoped and priced separately from any agent placement. You keep everything we write, and we work alongside your legal counsel, not in place of it.",
  cta: {
    heading: "Find out where you stand.",
    body: "Tell us how your team uses AI today. We'll review it and show you where the gaps are, what to fix first, and what a governance program would look like for your business.",
    button: "Request My Governance Review",
    thanksHeading: "Thanks. Your request is in.",
    thanks:
      "We have what we need to get started, and someone from Tasker & Steward will be in touch within one business day to schedule your review.",
  },
  faqs: [
    [
      "What is AI governance?",
      "AI governance is the set of rules, controls and owners that decide how a business uses AI. It covers which tools are approved, what data can go into them, who has access, who approves new uses, and how the company responds when an AI tool makes a mistake or exposes information.",
    ],
    [
      "Does a small business need an AI use policy?",
      "Yes, if anyone on the team uses AI tools for work. Most small businesses already have staff using chatbots, note-takers or AI features inside their software. A written policy tells people what's allowed, keeps customer and financial data out of the wrong tools, and gives you a record to point to if a client or insurer asks.",
    ],
    [
      "Do you only handle governance for Tasker & Steward agents?",
      "No. Every agent we staff comes with its own governance package, but that package covers only the agent we place. Governance for the rest of your AI, including tools your team adopted on its own and AI features in software you already use, is a separate custom engagement. You don't need an agent with us to get one.",
    ],
    [
      "What does an AI governance program include?",
      "A typical program includes an AI use policy, data handling rules, access and security controls, a vendor review process for new AI tools, an accountability model that names who owns each tool, and an incident response plan. We scope it to the tools you actually use and any standards you answer to.",
    ],
    [
      "How is AI governance priced?",
      "Each governance engagement is scoped and priced before work begins, separately from any agent placement. An optional monthly oversight plan covers new tool reviews, access audits and policy updates after the program is in place.",
    ],
    [
      "Do you replace our lawyer or compliance team?",
      "No. We write the policies, set up the controls and run the reviews, and we work alongside your legal counsel or compliance team so the final program meets the standards you're held to.",
    ],
  ] as ListItem[],
};

export const GOVERNANCE_TOOLS = [
  "ChatGPT",
  "Microsoft Copilot",
  "Google Gemini",
  "Claude",
  "AI note-takers",
  "AI features inside our CRM or other software",
  "AI agents or chatbots",
  "Not sure",
];
export const GOVERNANCE_POLICY = ["Yes", "In progress", "No", "Not sure"];
export const GOVERNANCE_STANDARDS = [
  "Industry regulators",
  "Client security audits",
  "Insurance requirements",
  "Data privacy laws",
  "None",
  "Not sure",
];

// ---------- AI Consulting & Custom Builds ----------

export const CONSULTING = {
  path: "/ai-consulting",
  name: "AI Consulting & Custom Builds",
  title: "AI Consulting & Custom AI Solutions",
  description:
    "AI consulting, team rollout and training, plus custom AI builds your team owns: command centers, dashboards, internal AI tools and integrations. Fixed scope, one-time build, optional support.",
  h1: "Some work needs a hire. Some needs a tool you own.",
  answer:
    "Tasker & Steward offers AI consulting and custom AI development for small and mid-sized businesses. We help companies decide where AI fits, roll it out to their teams, and build custom tools such as command centers, dashboards, internal AI assistants and system integrations as one-time projects the client owns and maintains.",
  callout: {
    icon: "spark",
    lead: "AI consulting",
    rest: "helps you decide where AI earns its place in your business, get your team using it, and build the tools that don't exist yet. We cover four things:",
    tiles: [
      { icon: "compass", title: "Where AI fits", sub: "Opportunities ranked by payback" },
      { icon: "route", title: "Rollout", sub: "What to adopt, in what order" },
      { icon: "people", title: "Training", sub: "Hands-on, built around your work" },
      { icon: "build", title: "Custom builds", sub: "Dashboards and tools you own" },
    ],
    ways: [
      ["Fixed scope and fee", "for consulting and rollout"],
      ["One-time builds", "you own, with optional support"],
    ],
  } as Callout,
  intro:
    "We staff agents for roles that need one. Sometimes the right answer is a system your own team runs instead. In those cases we design it, build it, and hand you the keys.",
  consultingHeading: "Consulting and adoption",
  consultingIntro:
    "Buying AI tools is easy. Getting a team to use them well is the hard part. We start with how your business runs today and work out where AI earns its place.",
  consulting: [
    ["AI opportunity review.", "A plain assessment of where AI would save real time or bring in real revenue, ranked by payback, along with a list of where it wouldn't help."],
    ["Rollout planning.", "Which tools to adopt, in what order, for which teams, and what has to change in your processes for them to stick."],
    ["Team training.", "Hands-on sessions built around your team's actual work, not generic prompt tips."],
    ["Adoption tracking.", "Simple measures that show whether the tools are being used and whether they're paying off."],
  ] as ListItem[],
  buildsHeading: "Custom builds",
  buildsIntro: "When off-the-shelf software doesn't fit, we build what does. You get a one-time build, and your team owns and maintains it.",
  builds: [
    ["Command centers and dashboards.", "One view of the numbers that run your business, pulled from the systems you already use. A staffing firm, for example, might track recruiter activity, open orders, placements, and client health in one place."],
    ["Internal AI tools.", "Assistants and workflows built around your documents, your data, and your processes."],
    ["Automations and integrations.", "Connecting the systems your team switches between all day so information moves without retyping."],
  ] as ListItem[],
  handoff:
    "Every build comes with documentation and a proper handoff to your team. If you'd rather not maintain it yourself, an optional monthly support plan keeps it running and up to date.",
  howHeading: "How it works",
  how: "Consulting engagements have a fixed scope and fee. Custom builds are scoped and priced before work starts, with no hourly billing. And if the work turns out to belong to a role an agent should fill, we'll tell you.",
  cta: {
    heading: "Bring us the problem.",
    body: "Tell us what's slowing your team down. We'll tell you whether it needs a hire, a tool you own, or neither, and what it would take to get there.",
    button: "Tell Us About the Project",
    thanksHeading: "Thanks. We have your project.",
    thanks:
      "We'll review what you sent and reach out within one business day. If it sounds like a role an agent should fill, we'll tell you that too.",
  },
  faqs: [
    [
      "What does an AI consultant do for a small business?",
      "An AI consultant looks at how the business runs today, finds where AI would save time or bring in revenue, and plans how to roll it out. At Tasker & Steward that means an opportunity review ranked by payback, a rollout plan, hands-on team training and simple tracking to show whether the tools are paying off.",
    ],
    [
      "What is an AI command center?",
      "An AI command center is a single dashboard that pulls the numbers a business runs on from the systems it already uses, such as the CRM, scheduling, accounting and spreadsheets, and puts them in one view. AI can summarize what changed, flag problems early and answer questions about the data.",
    ],
    [
      "Who owns a custom AI build?",
      "You do. Custom builds are one-time projects. You get documentation and a handoff to your team, and your team owns and maintains the system. An optional monthly support plan is available if you'd rather we keep it running.",
    ],
    [
      "How is a custom AI build different from an AI agent placement?",
      "A custom build is a tool you own and your team runs, paid for once. An agent placement is staffed: we build the agent, place it in your business, and a Steward on our team manages it for a monthly rate. We'll tell you which one fits the problem.",
    ],
    [
      "How is AI consulting priced?",
      "Consulting engagements have a fixed scope and fee. Custom builds are scoped and priced before work starts, with no hourly billing.",
    ],
  ] as ListItem[],
};

export const CONSULTING_NEEDS = [
  "Advice on where AI fits in our business",
  "Help rolling out AI to our team",
  "A custom build, such as a dashboard, internal tool, or integration",
  "Not sure yet",
];
export const CONSULTING_TIMELINES = ["Within 30 days", "1 to 3 months", "3 to 6 months", "Just exploring"];
export const CONSULTING_OWNERSHIP = [
  "We have an internal team to maintain it",
  "We'd want ongoing support",
  "Not sure yet",
];

// ---------- Structured data ----------

function breadcrumb(id: string, name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

function serviceJsonLd(opts: {
  path: string;
  name: string;
  title: string;
  description: string;
  serviceType: string;
  answer: string;
  catalog: ListItem[];
  faqs: ListItem[];
}) {
  const url = `${SITE_URL}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${opts.title} | Tasker & Steward`,
        description: opts.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        dateModified: SERVICES_UPDATED,
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".guide h1", ".svc-callout-top p"] },
        potentialAction: { "@type": "CommunicateAction", name: "Contact Tasker & Steward", target: `${url}#inquiry` },
        inLanguage: "en-US",
      },
      breadcrumb(`${url}#breadcrumb`, opts.name, opts.path),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: opts.name,
        serviceType: opts.serviceType,
        description: opts.answer,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        audience: { "@type": "BusinessAudience", name: "Small and mid-sized businesses" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: opts.name,
          itemListElement: opts.catalog.map(([name, description]) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: name.replace(/\.$/, ""), description },
          })),
        },
      },
      faqPageJsonLd(opts.faqs, `${url}#faq`),
    ],
  };
}

export const governanceJsonLd = () =>
  serviceJsonLd({
    path: GOVERNANCE.path,
    name: GOVERNANCE.name,
    title: GOVERNANCE.title,
    description: GOVERNANCE.description,
    serviceType: "AI governance and security consulting",
    answer: GOVERNANCE.answer,
    catalog: [...GOVERNANCE.includes, ["Ongoing oversight.", GOVERNANCE.oversight]],
    faqs: GOVERNANCE.faqs,
  });

export const consultingJsonLd = () =>
  serviceJsonLd({
    path: CONSULTING.path,
    name: CONSULTING.name,
    title: CONSULTING.title,
    description: CONSULTING.description,
    serviceType: "AI consulting and custom AI development",
    answer: CONSULTING.answer,
    catalog: [...CONSULTING.consulting, ...CONSULTING.builds],
    faqs: CONSULTING.faqs,
  });
