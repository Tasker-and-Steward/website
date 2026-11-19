# Tasker & Steward website

The public site for taskerandsteward.com: the landing page and the free Role Report request form.

## Stack
Next.js 15 (App Router) on Vercel. Fonts are self-hosted from `@fontsource`. GA4 is loaded on every page (`G-05639XJBEN`, override with `NEXT_PUBLIC_GA_ID`).

## Run locally
```
npm install
npm run dev
```

## Role Report form
The form posts to `/api/role-report`, which:
1. Forwards the request to the CRM if `CRM_LEAD_WEBHOOK_URL` is set. Production points at `https://tasker-steward-crm.vercel.app/api/public/website-lead`, authenticated with `CRM_LEAD_WEBHOOK_SECRET` (the same value as the CRM's `WEBSITE_LEAD_SECRET`). The CRM creates a Lead (source Website Form) and a Task to prepare the Role Report, with the SMS consent record in the task.
2. Emails the team through Resend if `RESEND_API_KEY` is set (`NOTIFY_EMAIL`, `FROM_EMAIL`).

At least one of the two must be configured or the form returns an error. See `.env.example`.

A successful submit fires the GA4 `generate_lead` event (mark it as a key event in GA4).

## Pages
- `/` landing page
- `/ai-governance` AI Governance & Security (inquiry form posts to `/api/inquiry`)
- `/ai-consulting` AI Consulting & Custom Builds (inquiry form posts to `/api/inquiry`)
- `/privacy` Privacy Policy
- `/sms-terms` SMS Terms (needed for Twilio A2P 10DLC registration)

## Website activity tracking
`app/components/Tracker.tsx` (in the root layout) sets a first-party visitor cookie (`ts_vid`, 13 months) and a session cookie (`ts_sid`, 30 minutes), then beacons each page view to `/api/t`. That route forwards it to the CRM (`/api/public/web-events`) after responding, with the visitor's IP and browser, which the CRM stores only as hashes. A `?ts=` token from a CRM email link is sent once, then removed from the address bar. Browsers sending Global Privacy Control or Do Not Track are not tracked.

Form routes read the visitor cookie and pass it to the CRM, so a submission ties the browser's earlier visits to the person: `/api/role-report` and `/api/survey/[slug]` include it in the CRM call, `/api/contact` files the message in the CRM (`/api/public/contact-form`: on the person's record, else a new Lead, with a reply task), and `/api/newsletter` logs a form submission (`lib/visitor.ts`). Uses the existing `CRM_LEAD_WEBHOOK_*` settings.

## Service inquiry forms
`/api/inquiry` handles both service-page forms. It emails the team through Resend (reply-to the sender) and files the inquiry in the CRM through `/api/public/contact-form`, with the topic "AI Governance & Security review" or "AI Consulting & Custom Build inquiry" so these leads are easy to filter. Copy, FAQs and structured data for both pages live in `lib/services.ts`. A successful submit fires GA4 `generate_lead` with `form_name` `governance_inquiry` or `consulting_inquiry`.

## Search engine setup
- **IndexNow:** after every production build on Vercel, `scripts/indexnow.mjs` sends every sitemap URL to IndexNow (Bing and partners). The key file is `public/c083043e907b8f6430e2757b84ad83c2.txt`. Preview and local builds skip it, and it never fails a build.
- **Verification tags:** set `GOOGLE_SITE_VERIFICATION` (Search Console) and `BING_SITE_VERIFICATION` (Bing Webmaster Tools) as Production env vars in Vercel, then redeploy. Each meta tag renders only once its code is set.

## Sample governance review download
`/ai-governance#sample` offers the Sample AI Governance Review (a fictional company, 6 pages). `/api/sample-report` emails the reader the link, notifies the team, and files the download in the CRM with the topic "Sample governance review download". The PDF lives at `/downloads/sample-ai-governance-review.pdf`, which robots.txt keeps out of search. The source HTML is in `content/sample-governance-review/`.
