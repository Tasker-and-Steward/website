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
- `/privacy` Privacy Policy
- `/sms-terms` SMS Terms (needed for Twilio A2P 10DLC registration)

## Website activity tracking
`app/components/Tracker.tsx` (in the root layout) sets a first-party visitor cookie (`ts_vid`, 13 months) and a session cookie (`ts_sid`, 30 minutes), then beacons each page view to `/api/t`. That route forwards it to the CRM (`/api/public/web-events`) after responding, with the visitor's IP and browser, which the CRM stores only as hashes. A `?ts=` token from a CRM email link is sent once, then removed from the address bar. Browsers sending Global Privacy Control or Do Not Track are not tracked.

Form routes read the visitor cookie and pass it to the CRM, so a submission ties the browser's earlier visits to the person: `/api/role-report` and `/api/survey/[slug]` include it in the CRM call, and `/api/contact` and `/api/newsletter` log a form submission (`lib/visitor.ts`). Uses the existing `CRM_LEAD_WEBHOOK_*` settings.
