import { FAQS, SITE_URL, TAGLINE } from "@/lib/site";

export const dynamic = "force-static";

// A plain-text summary for AI assistants and answer engines (llmstxt.org).
export function GET() {
  const body = `# Tasker & Steward

> ${TAGLINE}. Tasker & Steward is an AI staffing agency for small and mid-sized businesses. We review the duties in a job you're hiring for, build and place an AI agent for the repeatable work, and assign a Steward, a real person on our team who manages the agent and answers for its results.

## What we do
- Free Role Report: send us a job you're hiring for. We break it down duty by duty, mark which duties an AI agent can handle and which still need a person, suggest a more focused role for your hire, and show what each option costs.
- AI agent placement: we build the agent around your hours, rules and systems, onboard it like a new hire with practice runs and a supervised first week, and place it alongside your team.
- Stewardship: every agent has a named Steward who reviews its work weekly, writes performance reviews at 30, 60 and 90 days, and makes changes as your business changes.

## Work agents typically take on
Answering calls after hours, responding to web chat, following up on new leads, scheduling and reminders, entering data, confirming orders, and chasing quotes that went quiet.

## Terms
- Pricing: a one-time setup fee, then a flat monthly rate based on the role the agent covers and how much work it handles. Each Role Report shows the cost for that role.
- 90-day trial, then a 12-month term only if you keep the agent.
- Free retraining or replacement if the agent isn't doing the job.
- Your business data stays yours, with a full export when the service ends.

## Frequently asked questions
${FAQS.map(([q, a]) => `### ${q}\n${a}`).join("\n\n")}

## Links
- Home and Role Report request form: ${SITE_URL}/
- Frequently asked questions: ${SITE_URL}/faq
- Privacy Policy: ${SITE_URL}/privacy
- SMS Terms: ${SITE_URL}/sms-terms

## Contact
Tasker & Steward LLC, 6 Liberty Square, PMB #361, Boston, MA 02109. Email hello@taskerandsteward.com. Phone (401) 300-9921.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
