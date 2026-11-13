// Content for the "AI or hire?" guides at /ai-or-hire (added 2026-11-13).
// Each role page is rendered from this file, so adding a role is a data change.
// Total employer cost assumes wages are 70% of total compensation (BLS ECEC,
// private industry, June 2026).

export const ROLES_UPDATED = "2026-11-13";
export const ROLES_UPDATED_LABEL = "November 13, 2026";
export const HUB_PATH = "/ai-or-hire";

export type Source = { label: string; url: string };
export type Task = [string, string];
export type CostRow = [string, string, string];

export type Role = {
  slug: string;
  name: string; // "Executive assistant"
  short: string; // used in "Weighing another role?" cards and breadcrumbs
  question: string; // H1, phrased the way people ask it
  title: string; // <title>, without the site suffix
  description: string;
  pay: string; // hub table
  aiHandles: string; // hub table
  needsPerson: string; // hub table
  answer: string;
  aiWell: Task[];
  together: Task[];
  person: Task[];
  cost: CostRow[];
  costNote: string;
  example: string;
  whenToHire: string;
  ctaHeading: string;
  ctaBody: string;
  faqs: [string, string][];
  sources: Source[];
  related: string[];
};

const ECEC: Source = {
  label: "BLS Employer Costs for Employee Compensation, June 2026",
  url: "https://www.bls.gov/news.release/ecec.nr0.htm",
};

const AGENT_ROW_PRICE = "One setup fee, then a flat monthly rate";
const AGENT_ROW_MONTH = "Shown in your Role Report";

export const ROLES: Role[] = [
  {
    slug: "executive-assistant",
    name: "Executive assistant",
    short: "Executive assistant",
    question: "Should you hire an executive assistant or use AI?",
    title: "Executive Assistant or AI? What Each Can Handle",
    description:
      "Should you hire an executive assistant or use AI? Which EA duties AI handles well, which still need a person, and what each option costs.",
    pay: "$76,590 median",
    aiHandles: "Scheduling, inbox triage, meeting notes",
    needsPerson: "Confidential judgment calls, managing relationships",
    answer:
      "AI can now handle most of the calendar, inbox and note-taking work that fills an executive assistant's day. What it can't do well is protect your time with judgment, handle confidential situations or manage relationships on your behalf. For most leaders, the right setup is an AI agent for the routine work and a part-time or more senior person for the rest.",
    aiWell: [
      ["Scheduling and rescheduling", "Finding times across calendars, sending invites, confirming, and moving meetings when plans change."],
      ["Inbox triage", "Sorting incoming email, flagging what needs you today and drafting routine replies for your approval."],
      ["Meeting notes and follow-ups", "Recording, summarizing, pulling out action items and sending the recap."],
      ["Travel logistics", "Gathering options, holding bookings and building the itinerary."],
      ["Reminders and deadlines", "Tracking what's due and nudging the right people."],
    ],
    together: [
      ["Expense reports", "AI collects receipts and fills the report. A person checks anything unusual."],
      ["Prep for meetings", "AI pulls the background and past notes. A person decides what actually matters going in."],
      ["Drafting communications", "AI writes the first version. A person makes sure the tone fits the relationship."],
    ],
    person: [
      ["Deciding what deserves your time", "Saying no to the right meetings takes context about your priorities and politics that AI doesn't have."],
      ["Confidential matters", "Board issues, personnel situations and anything sensitive belong with someone accountable."],
      ["Relationships", "Being your trusted point of contact with clients, partners and your team."],
      ["The unexpected", "A flight cancels during a family emergency. Someone has to improvise."],
    ],
    cost: [
      ["Executive assistant, salary only", "$76,590", "about $6,400"],
      ["Executive assistant, salary plus benefits and payroll taxes", "about $109,000", "about $9,100"],
      ["AI agent for scheduling, inbox and notes", AGENT_ROW_PRICE, AGENT_ROW_MONTH],
    ],
    costNote:
      "Salary is the BLS median for executive secretaries and executive administrative assistants, May 2025. Total cost assumes wages are 70% of total compensation, the BLS private industry figure for June 2026.",
    example:
      "A 30-person firm has a founder spending eight hours a week on scheduling and email. Instead of hiring a full-time EA, they place an AI agent on calendar, inbox triage and meeting notes. They hire a part-time operations assistant for travel exceptions, sensitive matters and the founder's key relationships. The founder gets most of those eight hours back, and the person they hire spends their day on work that needs them.",
    whenToHire:
      "Hire a person if you're a senior leader with a heavy calendar of external relationships, if much of the role involves confidential matters, or if you need someone who can represent you in the room. AI makes that person more effective. It doesn't replace the trust you put in them.",
    ctaHeading: "See which of your assistant's duties AI can take on",
    ctaBody:
      "Send us your executive assistant job description. We'll mark each duty as agent or person, suggest a more focused role for the person you hire, and show what each option costs. Free, and yours to keep.",
    faqs: [
      ["Can AI replace an executive assistant?", "For scheduling, inbox triage and meeting notes, largely yes. For judgment, confidential work and relationships, no. Most leaders end up with AI for the routine work and a person for the rest."],
      ["How much does an executive assistant cost?", "The BLS median salary was $76,590 in May 2025. With benefits and payroll taxes, the total runs about $109,000 a year."],
      ["What can an AI assistant do for an executive?", "Schedule and reschedule meetings, sort email, draft routine replies, take and send meeting notes, track deadlines and pull together travel options."],
      ["Is AI safe for an executive's email and calendar?", "It can be, with the right access limits and a person reviewing anything sensitive. Ask any provider exactly what the agent can see, send and change."],
      ["Should I hire an EA or a virtual assistant or use AI?", "If most of the work is scheduling and email, start with AI. If you need someone to represent you or handle sensitive matters, hire a person, and let AI cover their routine work."],
    ],
    sources: [
      { label: "BLS Occupational Outlook Handbook: Secretaries and Administrative Assistants", url: "https://www.bls.gov/ooh/office-and-administrative-support/secretaries-and-administrative-assistants.htm" },
      ECEC,
    ],
    related: ["marketing-coordinator", "customer-support-rep"],
  },
  {
    slug: "bookkeeper",
    name: "Bookkeeper",
    short: "Bookkeeper",
    question: "Should you hire a bookkeeper or use AI?",
    title: "Bookkeeper or AI? What Each Can Handle",
    description:
      "Should you hire a bookkeeper or use AI? Which bookkeeping tasks AI handles well, where a person still has to review, and what each option costs.",
    pay: "$50,670 median",
    aiHandles: "Categorizing transactions, reconciliation, invoice reminders",
    needsPerson: "Reviewing exceptions, month-end sign-off",
    answer:
      "AI is good at the high-volume, rules-based side of bookkeeping: categorizing transactions, matching them to bank records and chasing unpaid invoices. It still makes mistakes on unusual transactions, and it can't take responsibility for your books. Most businesses do best with AI doing the daily entry and a person, in-house or outside, reviewing exceptions and closing the month.",
    aiWell: [
      ["Categorizing transactions", "Coding expenses and income to the right accounts based on your past patterns and rules."],
      ["Bank reconciliation", "Matching bank and card activity to entries in your accounting software and flagging what doesn't match."],
      ["Invoice reminders", "Sending friendly, then firmer, reminders on overdue invoices on a set schedule."],
      ["Receipt capture", "Pulling receipts from email and photos and attaching them to the right transaction."],
      ["Routine reports", "Producing weekly cash and receivables summaries."],
    ],
    together: [
      ["Bills and payables", "AI enters bills and queues payments. A person approves what goes out."],
      ["Collections", "AI handles the reminders. A person calls the customer who's 90 days late."],
      ["Vendor questions", "AI answers \"did you get my invoice?\" A person handles disputes."],
    ],
    person: [
      ["Reviewing exceptions", "The odd transaction, the duplicate charge, the payment that doesn't match anything."],
      ["Month-end close and sign-off", "Someone accountable has to stand behind the numbers."],
      ["Payroll and tax questions", "These carry legal and financial risk, and belong with a qualified person."],
      ["Advice", "Reading the numbers and telling you what they mean for the business."],
    ],
    cost: [
      ["Bookkeeper, salary only", "$50,670", "about $4,200"],
      ["Bookkeeper, salary plus benefits and payroll taxes", "about $72,000", "about $6,000"],
      ["AI agent for entry, reconciliation and reminders", AGENT_ROW_PRICE, AGENT_ROW_MONTH],
    ],
    costNote:
      "Salary is the BLS median for bookkeeping, accounting and auditing clerks, May 2025. Total cost assumes wages are 70% of total compensation, the BLS private industry figure for June 2026.",
    example:
      "A 40-person distributor posts for a full-time bookkeeper, mostly to keep up with transaction entry and overdue invoices. They place an AI agent on categorizing, reconciliation and invoice reminders, and keep their outside accountant for month-end review and taxes. The open role becomes a part-time accounts receivable position focused on the customers who need a phone call.",
    whenToHire:
      "Hire a person if your transactions are complex or unusual, if you handle payroll in-house, if you're in a regulated industry, or if no one currently reviews your books. AI makes a bookkeeper faster. It doesn't make anyone accountable for the numbers.",
    ctaHeading: "See which of your bookkeeper's duties AI can take on",
    ctaBody:
      "Send us your bookkeeper job description. We'll mark each duty as agent or person, suggest a more focused role for the person you hire, and show what each option costs. Free, and yours to keep.",
    faqs: [
      ["Can AI do bookkeeping?", "AI can handle much of the daily work: categorizing transactions, reconciling accounts and sending invoice reminders. A person should still review exceptions and close the month."],
      ["Will AI replace bookkeepers?", "It's changing the job more than ending it. The BLS projects employment of bookkeeping clerks to decline over the next decade as more of the entry work is automated, while review and advisory work stays with people."],
      ["How much does a bookkeeper cost?", "The BLS median salary was $50,670 in May 2025. With benefits and payroll taxes, the total is roughly $72,000 a year."],
      ["Is AI bookkeeping accurate?", "On routine, repeating transactions, it's generally reliable once set up with your rules. Unusual items are where errors happen, which is why a person reviews them."],
      ["Do I still need an accountant if I use AI?", "Yes, for taxes, payroll compliance and advice. AI reduces the hours spent on entry, which can lower what you pay for bookkeeping."],
    ],
    sources: [
      { label: "BLS Occupational Outlook Handbook: Bookkeeping, Accounting, and Auditing Clerks", url: "https://www.bls.gov/ooh/office-and-administrative-support/bookkeeping-accounting-and-auditing-clerks.htm" },
      ECEC,
    ],
    related: ["executive-assistant", "customer-support-rep"],
  },
  {
    slug: "sales-development-rep",
    name: "Sales development rep",
    short: "Sales development rep",
    question: "Should you hire a sales development rep or use AI?",
    title: "SDR or AI? What Each Can Handle",
    description:
      "Should you hire an SDR or use AI? Which prospecting and follow-up tasks AI handles well, which still need a person, and what each option costs.",
    pay: "$60,000 base, $89,000 on-target",
    aiHandles: "Account research, first-draft outreach, instant lead response",
    needsPerson: "Live conversations, reading a buyer",
    answer:
      "AI is now good at the research and volume side of sales development: building lists, researching accounts, drafting first-touch messages and responding to new leads in seconds. It's weaker at live conversations, reading a hesitant buyer and building trust over several calls. Many teams get more from one strong rep supported by AI than from two reps doing everything by hand.",
    aiWell: [
      ["Responding to new leads instantly", "Replying to web forms, chats and missed calls within seconds, day or night, and booking the meeting."],
      ["Account research", "Pulling company news, hiring activity and the right contacts before outreach."],
      ["First-draft outreach", "Writing personalized first emails and follow-ups for a rep to review."],
      ["Follow-up sequences", "Sending the second, third and fourth touch on schedule so leads don't go quiet."],
      ["CRM updates", "Logging activity and keeping records current without the rep typing it in."],
    ],
    together: [
      ["Qualifying leads", "AI asks the basic questions. A person decides who's worth a sales call."],
      ["Booking meetings", "AI handles the back-and-forth on times. A person confirms the right attendees."],
      ["Reviving old leads", "AI reaches out to quotes that went quiet. A person picks up when someone replies with real interest."],
    ],
    person: [
      ["Live conversations", "Cold calls, discovery calls and handling objections in real time."],
      ["Reading the buyer", "Hearing hesitation, spotting the real decision-maker and adjusting."],
      ["Relationships with key accounts", "The long, multi-touch work of earning trust with a large prospect."],
      ["Messaging judgment", "Deciding what your company should and shouldn't say."],
    ],
    cost: [
      ["SDR, base salary", "$60,000", "$5,000"],
      ["SDR, on-target earnings", "$89,000", "about $7,400"],
      ["SDR, on-target earnings plus benefits and payroll taxes", "about $127,000", "about $10,600"],
      ["AI agent for lead response, research and follow-up", AGENT_ROW_PRICE, AGENT_ROW_MONTH],
    ],
    costNote:
      "Base and on-target figures are RepVue's US medians for October 2026. Total cost assumes wages are 70% of total compensation, the BLS private industry figure for June 2026.",
    example:
      "A 60-person company plans to hire two SDRs, mainly because inbound leads sit for a day before anyone replies. They place an AI agent to respond to every new lead within a minute, book meetings and run follow-ups, then hire one SDR focused on live calls and their best accounts. Response time drops from hours to seconds, and the rep spends the day talking to buyers.",
    whenToHire:
      "Hire a person if your sales motion depends on phone conversations, if your deals are large and relationship-driven, or if you're building a path for future account executives. AI makes a good rep faster. It won't build the relationships that close big deals.",
    ctaHeading: "See which of your SDR's duties AI can take on",
    ctaBody:
      "Send us your SDR job description. We'll mark each duty as agent or person, suggest a more focused role for the person you hire, and show what each option costs. Free, and yours to keep.",
    faqs: [
      ["Can AI replace an SDR?", "AI can handle lead response, research, first-draft outreach and follow-up sequences. Live calls and relationship-building still need a person."],
      ["How much does an SDR cost?", "RepVue's October 2026 data puts the US median at $60,000 base and $89,000 on-target earnings. With benefits and payroll taxes, the total runs about $127,000 a year at target."],
      ["What is an AI SDR?", "An AI agent that does sales development tasks: responding to new leads, researching accounts, writing outreach and booking meetings."],
      ["Does AI outreach hurt deliverability or my brand?", "It can if it's sent at high volume without review. Keep a person approving messaging and stay within email and texting rules like CAN-SPAM and opt-out requirements."],
      ["Should I hire an SDR or use AI for inbound leads?", "For speed of response on inbound leads, AI is hard to beat because it replies in seconds at any hour. Hire a person for the conversations those leads turn into."],
    ],
    sources: [
      { label: "RepVue SDR compensation data, October 2026, via LeadHaste", url: "https://leadhaste.com/blog/sales-development-representative-salary" },
      ECEC,
    ],
    related: ["marketing-coordinator", "customer-support-rep"],
  },
  {
    slug: "customer-support-rep",
    name: "Customer support rep",
    short: "Customer support rep",
    question: "Should you hire a customer support rep or use AI?",
    title: "Customer Support Rep or AI? What Each Can Handle",
    description:
      "Should you hire a customer support rep or use AI? Which support tasks AI handles well, which still need a person, and what each option costs.",
    pay: "$44,770 median",
    aiHandles: "Common questions, order status, routing, after-hours coverage",
    needsPerson: "Upset customers, exceptions, escalations",
    answer:
      "AI handles the common, repeating support questions well: order status, hours, appointment changes, password resets and basic troubleshooting, at any hour. It's not the right fit for upset customers, exceptions to your policies or problems it hasn't seen before. The strongest setup puts AI on the first response and the routine questions, with a person taking every escalation.",
    aiWell: [
      ["Common questions", "Hours, pricing, policies, \"where's my order\" and the other questions you answer every day."],
      ["After-hours coverage", "Answering calls, chats and emails at night and on weekends instead of sending them to voicemail."],
      ["Scheduling and changes", "Booking, rescheduling and confirming appointments."],
      ["Routing", "Figuring out what the customer needs and sending it to the right person with the details filled in."],
      ["Ticket notes", "Summarizing each conversation so no one has to ask the customer to repeat themselves."],
    ],
    together: [
      ["Returns and refunds", "AI gathers the details and checks the policy. A person approves anything outside it."],
      ["Troubleshooting", "AI walks through the standard steps. A person takes over when those don't work."],
      ["Emergencies", "AI recognizes urgent calls and follows your escalation rules to reach a person fast."],
    ],
    person: [
      ["Upset customers", "Calming someone down and keeping their business takes empathy and discretion."],
      ["Exceptions", "Deciding when to bend a policy for a good customer."],
      ["New or complex problems", "Anything without a known answer."],
      ["Spotting patterns", "Noticing that ten customers this week hit the same issue and telling the team."],
    ],
    cost: [
      ["Customer support rep, salary only", "$44,770", "about $3,700"],
      ["Customer support rep, salary plus benefits and payroll taxes", "about $64,000", "about $5,300"],
      ["Covering nights and weekends with people", "A second or third shift on top of the above", "Varies by schedule"],
      ["AI agent for common questions, routing and after-hours", AGENT_ROW_PRICE, AGENT_ROW_MONTH],
    ],
    costNote:
      "Salary is the BLS median for customer service representatives, May 2025. Total cost assumes wages are 70% of total compensation, the BLS private industry figure for June 2026.",
    example:
      "A home services company with eight trucks posts for a second customer service rep because calls go to voicemail after 5 pm and on weekends. They place an AI agent to answer every call and chat, book jobs and page the on-call tech for emergencies. Their existing rep handles callbacks, complaints and anything unusual each morning, and the second hire isn't needed yet.",
    whenToHire:
      "Hire a person if most of your support involves complex products, high-value customers or emotional situations, or if you don't have anyone to handle escalations. AI takes the volume off your team. Your customers still need a person when it matters.",
    ctaHeading: "See which of your support rep's duties AI can take on",
    ctaBody:
      "Send us your customer support job description. We'll mark each duty as agent or person, suggest a more focused role for the person you hire, and show what each option costs. Free, and yours to keep.",
    faqs: [
      ["Can AI replace customer service reps?", "AI can handle common questions, scheduling, routing and after-hours coverage. Upset customers, exceptions and new problems still need a person."],
      ["How much does a customer service rep cost?", "The BLS median salary was $44,770 in May 2025. With benefits and payroll taxes, the total is about $64,000 a year, before covering nights and weekends."],
      ["Can AI answer my business's phone calls?", "Yes. A voice agent can answer, handle common requests, book appointments and transfer or page a person based on rules you set."],
      ["Will customers be frustrated talking to AI?", "They get frustrated when they can't reach a person. Give the agent clear rules for handing off, and make it easy to ask for someone."],
      ["What happens when the AI doesn't know the answer?", "It should hand off to a person with a summary of the conversation. With Tasker & Steward, those handoff rules are set with you before the agent goes live."],
    ],
    sources: [
      { label: "BLS Occupational Outlook Handbook: Customer Service Representatives", url: "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm" },
      ECEC,
    ],
    related: ["sales-development-rep", "executive-assistant"],
  },
  {
    slug: "marketing-coordinator",
    name: "Marketing coordinator",
    short: "Marketing coordinator",
    question: "Should you hire a marketing coordinator or use AI?",
    title: "Marketing Coordinator or AI? What Each Can Handle",
    description:
      "Should you hire a marketing coordinator or use AI? Which marketing tasks AI handles well, which still need a person, and what each option costs.",
    pay: "$57,134 average",
    aiHandles: "Scheduling posts, reports, first-draft copy",
    needsPerson: "Brand judgment, vendors, final approval",
    answer:
      "AI now handles much of a marketing coordinator's production work: scheduling posts, pulling reports, drafting first versions of copy and keeping lists clean. It doesn't know your brand the way a person does, and it can't manage vendors, run an event or decide what's worth saying. If the role you're posting is mostly production, start with AI. If it's mostly coordination and judgment, hire.",
    aiWell: [
      ["Social scheduling", "Queuing and publishing posts across channels on a calendar you approve."],
      ["Reporting", "Pulling numbers from ads, email and analytics into a weekly summary."],
      ["First-draft copy", "Writing first versions of emails, posts, ad variations and product descriptions for review."],
      ["List and CRM upkeep", "Cleaning contact lists, tagging leads and keeping records current."],
      ["Repurposing content", "Turning one article or video into posts, an email and a summary."],
    ],
    together: [
      ["Content calendars", "AI proposes a schedule and drafts. A person picks what fits the plan."],
      ["Email campaigns", "AI builds the draft and segments. A person approves the message and send."],
      ["Competitor and market tracking", "AI gathers what's changed. A person decides what it means."],
    ],
    person: [
      ["Brand judgment", "Knowing what sounds like you, and what could embarrass you."],
      ["Vendors and agencies", "Managing printers, designers, venues and outside partners."],
      ["Events and in-person work", "Trade shows, sponsorships and anything that needs someone on site."],
      ["Final approval", "Someone accountable signs off before anything goes public."],
    ],
    cost: [
      ["Marketing coordinator, salary only", "$57,134", "about $4,800"],
      ["Marketing coordinator, salary plus benefits and payroll taxes", "about $82,000", "about $6,800"],
      ["AI agent for scheduling, reporting and first drafts", AGENT_ROW_PRICE, AGENT_ROW_MONTH],
    ],
    costNote:
      "Salary is Indeed's US average for marketing coordinators, based on job postings (July 2026). Total cost assumes wages are 70% of total compensation, the BLS private industry figure for June 2026.",
    example:
      "A 25-person company is about to hire its first marketing coordinator, mostly to keep social posts and the monthly email going. They place an AI agent on scheduling, reporting and first drafts, with the owner approving each week's content in about an hour. They hire a marketing person later, once there's enough strategy and vendor work to fill the role.",
    whenToHire:
      "Hire a person if you run events or trade shows, manage several vendors, or have no one on the team with time to review and approve content. AI keeps the production moving. Someone still has to own the brand.",
    ctaHeading: "See which of your marketing coordinator's duties AI can take on",
    ctaBody:
      "Send us your marketing coordinator job description. We'll mark each duty as agent or person, suggest a more focused role for the person you hire, and show what each option costs. Free, and yours to keep.",
    faqs: [
      ["Can AI replace a marketing coordinator?", "AI can handle scheduling, reporting, first-draft copy and list upkeep. Brand judgment, vendors, events and final approval still need a person."],
      ["How much does a marketing coordinator cost?", "Indeed's 2026 average is $57,134 a year. With benefits and payroll taxes, the total is about $82,000."],
      ["What marketing tasks can AI automate?", "Post scheduling, performance reports, first drafts of emails and ads, content repurposing and contact list cleanup."],
      ["Is AI-written marketing content any good?", "As a first draft, often yes. It still needs a person who knows your customers to edit it and decide what goes out."],
      ["When should a small business hire its first marketing person?", "When there's enough strategy, vendor and event work to fill a role. Until then, AI can cover much of the routine production."],
    ],
    sources: [
      { label: "Indeed: Marketing coordinator salary in the United States", url: "https://www.indeed.com/salaries/marketing-coordinator-Salaries,-US" },
      ECEC,
    ],
    related: ["sales-development-rep", "executive-assistant"],
  },
];

export const roleBySlug = (slug: string) => ROLES.find((r) => r.slug === slug);

export const HUB = {
  title: "Should You Use AI or Hire? A Role-by-Role Guide",
  description:
    "Should you use AI or hire for the role you're filling? Role-by-role guides showing which duties AI handles well, which need a person, and what each costs.",
  h1: "Should you use AI or hire? Start with the role.",
  answer:
    "For most roles, the answer is both. AI handles the repeatable duties well today: scheduling, data entry, first replies, follow-ups and reports. A person is still the better choice for judgment calls, relationships and anything that goes off script. The useful question is which duties in your role fall on each side.",
  intro:
    "Most job descriptions were written before AI could do any of the work. So a single posting often mixes two jobs: one that needs a person, and one that just needs to get done. The guides below split five common roles duty by duty, with honest notes on where AI falls short.",
  payNote:
    "Pay figures: BLS May 2025 medians for executive assistants, bookkeepers and customer service reps; RepVue for SDRs (October 2026); Indeed for marketing coordinators (2026). Full sources on each page.",
  costHeading: "What a hire really costs",
  cost:
    "Salary is only part of it. In June 2026, wages made up 70% of what private employers spent on compensation, according to the Bureau of Labor Statistics. Benefits, paid leave and payroll taxes made up the other 30%. A $50,000 salary works out to roughly $71,000 a year in total cost, before recruiting, training and turnover.",
  agentHeading: "How an AI agent is priced",
  agent:
    "With Tasker & Steward, each AI agent has one setup fee and then a flat monthly rate, based on the role it covers and how much work it handles. Every agent comes with a Steward, a real person on our team who manages it and answers for its work. You still hire your own people. We staff and manage the agent.",
  ctaHeading: "Get the answer for your role",
  ctaBody:
    "The guides cover the common cases. Your Role Report covers yours. Send us the job you're hiring for and we'll break it down duty by duty: what an agent can carry, what still needs a person, and what each option costs. Free, and yours to keep.",
  faqs: [
    ["Can AI replace an employee?", "For a full role, rarely. For the repeatable duties inside a role, often. Most roles end up as a smaller, more focused job for a person plus an AI agent handling the routine work."],
    ["Which jobs are easiest to automate with AI?", "Roles with a large share of rules-based, repeatable work: front desk and intake, scheduling, customer support, data entry, bookkeeping and lead follow-up."],
    ["Is AI cheaper than hiring?", "For the repeatable part of a role, usually. A full-time employee costs roughly 1.4 times their salary once benefits and payroll taxes are counted. Your Role Report compares both options using your posting."],
    ["Will AI replace my staff?", "It isn't designed to. Agents take on after-hours and repetitive work so the people you have, and the next person you hire, can focus on the parts that need a person."],
    ["Who manages the AI after it's set up?", "With Tasker & Steward, your Steward does. That's a named person on our team who reviews the agent's work and is the one you call when something needs to change."],
  ] as [string, string][],
  sources: [ECEC],
};
