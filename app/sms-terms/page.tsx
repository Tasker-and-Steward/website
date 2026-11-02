import type { Metadata } from "next";
import LegalHeader from "../components/LegalHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "SMS Terms",
  alternates: { canonical: "/sms-terms" },
  description: "Terms for Tasker & Steward text message updates.",
};

export default function SmsTerms() {
  return (
    <>
      <LegalHeader />
      <main className="legal">
        <h1>SMS Terms</h1>
        <p className="updated">Last updated: October 29, 2026</p>

        <h2>Program</h2>
        <p>Tasker &amp; Steward Role Report updates. When you request a free Role Report on taskerandsteward.com and check the text message box, Tasker &amp; Steward LLC may text you about that request, for example to confirm we received it, ask a quick question about the role, or let you know your report has been emailed.</p>

        <h2>How you opt in</h2>
        <p>You opt in by entering your mobile number and checking the consent box on our Role Report form. Consent is optional and is not a condition of purchase.</p>

        <h2>Message frequency</h2>
        <p>Message frequency varies, up to 2 messages per request.</p>

        <h2>Cost</h2>
        <p>Message and data rates may apply. Check with your mobile carrier for details.</p>

        <h2>How to opt out</h2>
        <p>Reply STOP to any message to stop receiving texts from us. You'll get one message confirming you've opted out, and no further texts after that. You can reply START to opt back in.</p>

        <h2>Help</h2>
        <p>
          Reply HELP for help, or contact us at <a href="mailto:hello@taskerandsteward.com">hello@taskerandsteward.com</a> or (401) 300-9921.
        </p>

        <h2>Carriers</h2>
        <p>Mobile carriers are not liable for delayed or undelivered messages.</p>

        <h2>Privacy</h2>
        <p>
          We do not sell or share your mobile number or text consent with third parties for their marketing purposes. See our <a href="/privacy">Privacy Policy</a> for how we handle your information.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
