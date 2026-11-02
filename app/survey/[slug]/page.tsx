import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GiftCard from "../../components/GiftCard";
import LegalHeader from "../../components/LegalHeader";
import SiteFooter from "../../components/SiteFooter";
import { closeDate, getPrefill, getSurvey } from "@/lib/crm";
import SurveyForm from "./SurveyForm";

type Params = { params: Promise<{ slug: string }> };
type PageProps = Params & { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const survey = await getSurvey((await params).slug);
  if (!survey) return { title: "Survey", robots: { index: false } };
  return {
    title: survey.title,
    description: survey.intro ?? `A short survey from Tasker & Steward.`,
    alternates: { canonical: `/survey/${survey.slug}` },
    robots: { index: false, follow: true },
  };
}

// Surveys are built in the T&S CRM; this page renders whatever is live there.
// A personal link (?t=…) opens on "Is this you?" with the person's details.
export default async function SurveyPage({ params, searchParams }: PageProps) {
  const survey = await getSurvey((await params).slug);
  if (!survey) notFound();
  const t = (await searchParams).t;
  const prefill = survey.open ? await getPrefill(survey.slug, typeof t === "string" ? t : undefined) : null;
  const closes = closeDate(survey.closesAt);
  const rulesUrl = "#drawing-rules";
  const prize = survey.raffle.prize ?? "$100 gift card";
  return (
    <>
      <LegalHeader />
      <main className="survey">
        <header className="survey-head">
          <p className="eyebrow">A Tasker &amp; Steward survey</p>
          <h1>{survey.title}</h1>
          {survey.intro && <p className="survey-intro">{survey.intro}</p>}
          {survey.raffle.enabled && survey.open && (
            <div className="survey-raffle">
              <GiftCard prize={survey.raffle.prize ?? "$100 Gift Card"} />
              <p>
                Finish the survey and you can enter the drawing for a {survey.raffle.prize ?? "gift card"}. No purchase necessary.{" "}
                <a href={rulesUrl}>Review drawing rules</a>.
              </p>
            </div>
          )}
          <p className="survey-run-by">
            This survey is run by Tasker &amp; Steward LLC. Your answers are used for our research and the results report, never sold. See our <a href="/privacy">Privacy Policy</a>.
            {closes && survey.open ? ` Closes ${closes}.` : ""}
          </p>
        </header>
        {survey.open ? (
          <SurveyForm survey={survey} rulesUrl={rulesUrl} prefill={prefill} />
        ) : (
          <section className="survey-card">
            <h2>This survey is closed</h2>
            <p>Thank you for your interest. If you took part, the results report is on its way.</p>
          </section>
        )}
        {survey.raffle.enabled && (
          <p id="drawing-rules" className="survey-rules">
            <strong>Drawing rules.</strong> Open to legal US residents 18 and older, one entry per person. To enter, finish the
            survey and check the drawing box{closes ? ` by 11:59 pm Eastern on ${closes}` : ""}. One winner of a {prize.toLowerCase()} will be
            drawn at random within seven days after the survey closes and notified by email. If the winner doesn&apos;t reply within
            seven days, a new winner is drawn. No cash alternative. Void where prohibited. Sponsor: Tasker &amp; Steward LLC, 6 Liberty
            Square, PMB #361, Boston, MA 02109.
          </p>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
