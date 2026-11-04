import RoleReportForm from "./components/RoleReportForm";
import { AgentIcon, ArrowIcon, RetrainIcon, RoleDocIcon, StewardIcon, TrialIcon } from "./components/icons";
import SiteFooter from "./components/SiteFooter";
import JsonLd from "./components/JsonLd";
import NewsletterSignup from "./components/NewsletterSignup";
import { FAQS, HOME_FAQS, homeJsonLd } from "@/lib/site";

const CHIPS = [
  "Answering calls after hours",
  "Responding to web chat",
  "Following up on new leads",
  "Scheduling and reminders",
  "Entering data",
  "Confirming orders",
  "Chasing quotes that went quiet",
];

const DUTIES: [string, "agent" | "hire"][] = [
  ["Answer and route phone calls", "agent"],
  ["Respond to website and chat inquiries", "agent"],
  ["Schedule and confirm appointments", "agent"],
  ["Follow up on quotes and new leads", "agent"],
  ["Enter orders and update records", "agent"],
  ["Handle unhappy customers", "hire"],
  ["Manage vendors and the office", "hire"],
  ["Train and support new staff", "hire"],
];

const COMPARE_ROWS: { label: string; software: string; custom: string; us: string }[] = [
  { label: "What you get", software: "Software you set up and run", custom: "A system built to your spec", us: "An AI agent doing the work, managed for you" },
  { label: "Ongoing management", software: "Usually your team", custom: "Varies, often a separate support contract", us: "Included, through your Steward" },
  { label: "When something breaks", software: "The vendor's support queue", custom: "Depends on the support agreement", us: "Your Steward handles it, at no extra cost" },
  { label: "Fit to your business", software: "Within the vendor's features", custom: "Built to your needs at the time of the project", us: "Built around your rules and systems, and updated as you change" },
  { label: "Pricing", software: "A subscription, plus your team's time", custom: "A project fee, plus hosting and support", us: "One setup fee, then a flat monthly rate" },
];



export default function Home() {
  return (
    <>
      <a className="skip" href="#join">
        Skip to the Role Report form
      </a>

      <main id="main">
      <section className="hero">
        <div className="wrap">
          <header className="topbar">
            <a className="wordmark" href="/" aria-label="Tasker and Steward home">
              Tasker <span className="amp">&amp;</span> Steward
            </a>
            <div className="topbar-right">
              <span className="soon">Launching early 2027</span>
              <a href="/contact" className="toplink">
                Contact
              </a>
              <a href="#join" className="btn btn-ghost">
                Get a free Role Report
              </a>
            </div>
          </header>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">AI staffing with human accountability</p>
              <h1>
                Still hiring like it's <span className="amp">2019?</span>
              </h1>
              <p className="hero-sub">
                Most job descriptions were written before AI could do any of the work. We review the duties in yours, identify which ones an AI agent can handle well, build and manage that agent for you, and help you rewrite the role for the person you hire. Tasker &amp; Steward keeps up with AI as it changes, so you can stay focused on your customers, your people and your growth.
              </p>
              <ul className="chips" aria-label="Work an agent can take on">
                {CHIPS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="steward-note">
                <StewardIcon size={48} />
                <span>Every agent comes with a Steward, a real person on our team who answers for its work.</span>
              </div>
            </div>

            <RoleReportForm />
          </div>
        </div>
      </section>

        <section className="section" aria-labelledby="example-h">
          <div className="wrap">
            <p className="eyebrow">What a Role Report looks like</p>
            <h2 id="example-h" className="h2" style={{ maxWidth: 860 }}>
              A job you've probably posted, and the job it becomes.
            </h2>
            <p className="lead">
              Most roles mix work that needs a person with work that just needs to get done. A Role Report separates the two, so you can hire a person for the first and let an AI agent handle the second.
            </p>

            <p className="example-tag">Illustrative example</p>
            <div className="example">
              <div className="card before">
                <div className="card-head">
                  <span className="label">Before</span>
                  <span className="pill pill-flag">Frequently reposted</span>
                </div>
                <div className="role-title">Office Coordinator</div>
                <div className="role-sub">Full time · One person doing two jobs</div>
                <ul className="duties">
                  {DUTIES.map(([d, who]) => (
                    <li key={d}>
                      <span>{d}</span>
                      <span className={`pill ${who === "agent" ? "pill-agent" : "pill-hire"}`}>{who === "agent" ? "Agent" : "Your hire"}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="arrow" aria-hidden="true">
                <ArrowIcon />
              </div>

              <div className="after">
                <span className="label" style={{ paddingTop: 4 }}>
                  After
                </span>
                <div className="card hire-card">
                  <div className="split-head">
                    <span className="hire-label">Your hire</span>
                    <span className="muted">Focused on judgment, people and the office</span>
                  </div>
                  <div className="role-title" style={{ fontSize: 30, marginTop: 8 }}>
                    Office Manager
                  </div>
                  <div className="cols">
                    <div>
                      <h4>What they own</h4>
                      <ul>
                        <li>Customer relationships and anything that needs a judgment call</li>
                        <li>Running the office and vendors, and setting the team's priorities</li>
                        <li>Training and supporting the team</li>
                        <li>Reviewing the agent's handoffs each morning</li>
                      </ul>
                    </div>
                    <div>
                      <h4>Hire for</h4>
                      <ul>
                        <li>Calm with upset customers</li>
                        <li>Organized and decisive</li>
                        <li>Comfortable working alongside an agent</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="agent-card">
                  <div className="split-head">
                    <span className="agent-label">
                      <AgentIcon size={32} strokeWidth={2.2} ring={false} />
                      Your AI agent
                    </span>
                    <span className="managed">
                      <StewardIcon size={24} strokeWidth={2.6} ring={false} />
                      Managed by your Steward
                    </span>
                  </div>
                  <div className="role-title" style={{ fontSize: 24, marginTop: 8 }}>
                    Front Desk Agent
                  </div>
                  <p>Answers calls, web inquiries and chat, books and confirms appointments, follows up on quotes and leads, and keeps records current, including nights and weekends.</p>
                </div>
              </div>
            </div>
            <p className="caption">A sample Role Report. Yours is built from your actual posting.</p>
          </div>
        </section>

        <section className="section sand" aria-labelledby="how-h">
          <div className="wrap">
            <p className="eyebrow">A better way to staff the work</p>
            <h2 id="how-h" className="h2">
              You hire your people. We staff the agent.
            </h2>
            <div className="steps">
              <div className="step">
                <div className="step-num">01</div>
                <h3>
                  <RoleDocIcon />
                  Start with the role
                </h3>
                <p>Send us the job you're hiring for. We break it down duty by duty and show you what an agent can carry, what still needs a person, and what each option costs. You keep hiring for the person side, with a more focused job description.</p>
              </div>
              <div className="step">
                <div className="step-num">02</div>
                <h3>
                  <AgentIcon size={40} stroke="#14243A" strokeWidth={1.8} />
                  We build and place the agent
                </h3>
                <p>It's built around how your business runs: your hours, your rules, your systems. It goes through onboarding like a new hire, with practice runs and a supervised first week, and works alongside your team.</p>
              </div>
              <div className="step">
                <div className="step-num">03</div>
                <h3>
                  <StewardIcon size={40} stroke="#6E1F24" strokeWidth={1.8} />
                  A person stays on the hook
                </h3>
                <p>Every agent has a Steward, a real person on our team who writes reviews at 30, 60 and 90 days and is the one you call when something needs to change. Your Steward manages the agent, not your staff.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="gap-h">
          <div className="wrap gap">
            <div className="gap-copy">
              <p className="eyebrow">The cost of uncovered work</p>
              <h2 id="gap-h" className="h2">
                Unanswered leads are often the most expensive gap.
              </h2>
              <p className="first">
                A lot of business is won or lost between a customer reaching out and someone responding: the voicemail at 7 pm, the web form that sits until Monday, the chat window that only says "leave a message."
              </p>
              <p>The family with no heat on a January night calls the next heating company on the list. The customer who ordered online and didn't hear back orders somewhere else next time. Often the business never knows it lost them.</p>
              <p>That gap is work an agent handles well. It can respond to calls, forms and chats as they come in, day or night, follow up until the customer gets an answer, and hand real opportunities to your team with the details already filled in.</p>
            </div>
            <aside className="return" aria-labelledby="return-h">
              <p className="eyebrow">The return</p>
              <h3 id="return-h">Your Role Report shows the math.</h3>
              <div className="return-list">
                <div>
                  <strong>What the role costs you today</strong>
                  <span>From your posting</span>
                </div>
                <div>
                  <strong>What the agent and the reshaped role cost</strong>
                  <span>Side by side with your current plan</span>
                </div>
                <div>
                  <strong className="hl">Estimated opportunity value of unanswered inquiries</strong>
                  <span>Based on your inquiry volume, how many go unanswered, how many typically become customers, and your average job value</span>
                </div>
              </div>
              <p>We'll ask for those inputs and show every assumption, so you can adjust them yourself.</p>
              <a href="#join" className="btn btn-red">
                Get my free Role Report
              </a>
            </aside>
          </div>
        </section>

        <section className="section compare" aria-labelledby="cmp-h">
          <div className="wrap">
            <h2 id="cmp-h" className="h2">
              Why not just buy software, or pay someone to build it?
            </h2>
            <p className="sub">Both can be the right call. Here's what each typically includes, so you can compare.</p>
            <div className="cmp-desk">
              <table>
                <thead>
                  <tr>
                    <td />
                    <th scope="col" className="other">
                      Buying AI software
                    </th>
                    <th scope="col" className="other">
                      Paying for a custom build
                    </th>
                    <th scope="col" className="us">
                      <span className="us-badge">Your AI agent</span>
                      <span className="us-name">
                        Tasker <span className="amp-red">&amp;</span> Steward
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      <td>{r.software}</td>
                      <td>{r.custom}</td>
                      <td className="us">{r.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cmp-mobile">
              {(["software", "custom"] as const).map((k) => (
                <div className="cmp-card" key={k}>
                  <h3>{k === "software" ? "Buying AI software" : "Paying for a custom build"}</h3>
                  <dl>
                    {COMPARE_ROWS.map((r) => (
                      <div key={r.label}>
                        <dt>{r.label}</dt>
                        <dd>{r[k]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
              <div className="cmp-card us">
                <span className="us-badge">Your AI agent</span>
                <h3>
                  Tasker <span className="amp-red">&amp;</span> Steward
                </h3>
                <dl>
                  {COMPARE_ROWS.map((r) => (
                    <div key={r.label}>
                      <dt>{r.label}</dt>
                      <dd>{r.us}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <p className="closing">Whichever way you go, someone has to run it, connect it and keep it current. With us, that's part of the service.</p>
          </div>
        </section>

        <section className="section navy" aria-labelledby="get-h">
          <div className="wrap get">
            <div className="get-intro">
              <h2 id="get-h">What you get</h2>
              <p>Your agent comes with the same protections you'd expect when a staffing agency places someone with you.</p>
            </div>
            <div className="get-cards">
              <div className="get-card">
                <AgentIcon size={56} />
                <h3>An AI agent, placed with you</h3>
                <p>Placed and managed the way an agency places a temp.</p>
              </div>
              <div className="get-card">
                <TrialIcon />
                <h3>A 90-day trial</h3>
                <p>Try the agent before you commit to anything longer.</p>
              </div>
              <div className="get-card">
                <RetrainIcon />
                <h3>Free retraining or replacement</h3>
                <p>If the agent isn't doing the job, we fix it at no cost.</p>
              </div>
              <div className="get-card">
                <StewardIcon size={56} />
                <h3>One person to call</h3>
                <p>A named Steward who answers for the results, instead of a support ticket.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section sand" style={{ paddingBlock: 96 }} aria-labelledby="faq-h">
          <div className="wrap faq-wrap">
            <div className="faq-head">
              <p className="eyebrow">Questions</p>
              <h2 id="faq-h" className="h2">
                Common questions
              </h2>
              <a className="faq-all" href="/faq">
                See all {FAQS.length} questions <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="faq-list">
              {HOME_FAQS.map(([q, a], i) => (
                <details className="faq" key={q} open={i === 0}>
                  <summary>
                    {q}
                    <span className="faq-icon" aria-hidden="true" />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
              <a className="faq-all faq-all-foot" href="/faq">
                See all {FAQS.length} questions <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section newsletter-band" aria-labelledby="nl-h">
          <div className="wrap nl-wrap">
            <div className="nl-copy">
              <p className="eyebrow">Tasker &amp; Steward Monthly</p>
              <h2 id="nl-h" className="h2">
                AI, hiring and the trades, in plain English.
              </h2>
              <p className="lead">
                Once a month: what AI is changing about hiring, what the latest job reports mean for owners, industry trends worth knowing, and where an AI agent can take work off your team.
              </p>
            </div>
            <div className="nl-box">
              <NewsletterSignup />
            </div>
          </div>
        </section>

        <section className="navy cta-band">
          <div className="wrap cta-row">
            <h2>Still posting the same job description you wrote when you started your business?</h2>
            <a href="#join" className="btn btn-red">
              Get a free Role Report
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <JsonLd data={homeJsonLd()} />
    </>
  );
}
