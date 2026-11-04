import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import LegalHeader from "../components/LegalHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Us",
  alternates: { canonical: "/contact" },
  description: "Questions about AI agents, partnerships or working with Tasker & Steward? Send us a message and a real person on our team will reply.",
};

export default function Contact() {
  return (
    <>
      <LegalHeader />
      <main className="legal contact-page">
        <h1>Contact us</h1>
        <p>
          Have a question about AI agents, a partnership idea, or something else on your mind? Send us a message and a real person on our team will get back to you.
        </p>
        <p className="contact-alt">
          Want a breakdown of a job you're hiring for? <a href="/#join">Request a free Role Report</a> instead.
        </p>
        <ContactForm />
        <p className="contact-direct">
          Prefer email or phone? Reach us at <a href="mailto:hello@taskerandsteward.com">hello@taskerandsteward.com</a> or (401) 300-9921.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
