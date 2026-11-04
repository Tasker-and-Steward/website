import type { Metadata } from "next";
import LegalHeader from "../components/LegalHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description: "How Tasker & Steward collects, uses and protects your information.",
};

export default function Privacy() {
  return (
    <>
      <LegalHeader />
      <main className="legal">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: November 4, 2026</p>

        <p>Tasker &amp; Steward LLC ("Tasker &amp; Steward," "we," "us") runs taskerandsteward.com. This policy explains what we collect when you visit the site or request a Role Report, how we use it, and the choices you have.</p>

        <h2>What we collect</h2>
        <ul>
          <li>Information you give us on our forms: your name, work email, company, company size, industry, the role you're hiring for, the job description or posting link, and, if you choose to give it, your mobile number. If you use our contact form, we also collect your message, the topic you chose and, if you give it, your phone number.</li>
          <li>Your text message consent, if you check the box, along with the date and time and the wording you agreed to.</li>
          <li>If you take one of our surveys: your answers, the contact details you give, whether you asked for the results report, entered a drawing or agreed to our monthly email, and the link you came from. We report survey results only in summary and never publish who said what.</li>
          <li>Basic technical information our hosting provider records, such as IP address, browser type and pages visited, used to keep the site secure and working.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To prepare and send the Role Report you asked for, and to follow up with you about it.</li>
          <li>To send text messages about your request, only if you opted in.</li>
          <li>To respond to your questions and, if you become a client, to provide our services.</li>
          <li>To operate, secure and improve our website.</li>
        </ul>

        <h2>Text messages</h2>
        <p>If you opt in, we text you about your Role Report request. Message frequency varies, up to 2 messages per request. Message and data rates may apply. Reply STOP to opt out at any time, or HELP for help. See our <a href="/sms-terms">SMS Terms</a>.</p>
        <p><strong>We do not sell or share your mobile number or text message consent with third parties or affiliates for their marketing purposes.</strong> Mobile information is shared only with the service providers that deliver our messages.</p>

        <h2>Who we share it with</h2>
        <p>We do not sell your personal information. We share it only with service providers that help us run our business, such as website hosting, email delivery, text message delivery, our customer database and AI tools we use to draft your Role Report. They may use it only to provide services to us. We may also disclose information if the law requires it or to protect our rights.</p>

        <h2>How long we keep it</h2>
        <p>We keep your information for as long as we need it for the purposes above, or as the law requires. You can ask us to delete it at any time.</p>

        <h2>Your choices</h2>
        <ul>
          <li>Unsubscribe from our emails with the link in any message or by replying "unsubscribe."</li>
          <li>Stop text messages by replying STOP.</li>
          <li>Ask to see, correct or delete your information by emailing us.</li>
        </ul>

        <h2>Security</h2>
        <p>We use reasonable safeguards to protect your information, including encrypted connections and limited access. No method of transmission or storage is completely secure.</p>

        <h2>Children</h2>
        <p>Our services are for businesses. We do not knowingly collect information from anyone under 18.</p>

        <h2>Changes</h2>
        <p>If we change this policy, we'll update the date at the top of this page.</p>

        <h2>Contact us</h2>
        <p>
          Tasker &amp; Steward LLC, 6 Liberty Square, PMB #361, Boston, MA 02109
          <br />
          Email: <a href="mailto:hello@taskerandsteward.com">hello@taskerandsteward.com</a>
          <br />
          Phone: (401) 300-9921
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
