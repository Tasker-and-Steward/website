import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalHeader from "../../../components/LegalHeader";
import SiteFooter from "../../../components/SiteFooter";
import { closeDate, getSurvey } from "@/lib/crm";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const survey = await getSurvey((await params).slug);
  return { title: survey ? `${survey.title}: official drawing rules` : "Official rules", robots: { index: false, follow: true } };
}

// Official rules for a survey's gift card drawing. Dates come from the survey
// in the CRM. Have counsel review before launch.
export default async function RulesPage({ params }: Params) {
  const survey = await getSurvey((await params).slug);
  if (!survey || !survey.raffle.enabled) notFound();
  const prize = survey.raffle.prize ?? "$100 gift card";
  const closes = closeDate(survey.closesAt);
  return (
    <>
      <LegalHeader />
      <main className="legal">
        <h1>Official rules: {survey.title} drawing</h1>
        <p className="updated">Sponsor: Tasker &amp; Steward LLC, 6 Liberty Square, PMB #361, Boston, MA 02109</p>

        <h2>No purchase necessary</h2>
        <p>No purchase or payment of any kind is necessary to enter or win. A purchase will not improve your chances of winning.</p>

        <h2>Who can enter</h2>
        <p>Open to legal residents of the United States who are 18 or older. Employees of Tasker &amp; Steward LLC and their immediate families are not eligible. Void where prohibited.</p>

        <h2>How to enter</h2>
        <p>
          Complete the {survey.title} at <a href={`/survey/${survey.slug}`}>taskerandsteward.com/survey/{survey.slug}</a> and check the box to enter the drawing. You may answer the survey and enter
          once per person. Entries close {closes ? `at the end of ${closes}` : "when the survey closes"} (Eastern Time).
        </p>

        <h2>Prize</h2>
        <p>One winner receives a {prize}. The prize has no cash alternative and cannot be transferred, except that the Sponsor may substitute a prize of equal or greater value.</p>

        <h2>Drawing and odds</h2>
        <p>One winner will be drawn at random from all eligible entries within seven days after entries close. Odds of winning depend on the number of eligible entries received.</p>

        <h2>Winner notification</h2>
        <p>The winner will be notified by email at the address given in the survey and must respond within 7 days, or a new winner will be drawn from the remaining eligible entries.</p>

        <h2>Your information</h2>
        <p>
          Entry information is used to run the drawing and as described in our <a href="/privacy">Privacy Policy</a>. Survey answers are reported only in summary; we never publish who said what.
        </p>

        <h2>Sponsor</h2>
        <p>Tasker &amp; Steward LLC, 6 Liberty Square, PMB #361, Boston, MA 02109. Questions: <a href="mailto:hello@taskerandsteward.com">hello@taskerandsteward.com</a>.</p>
      </main>
      <SiteFooter />
    </>
  );
}
