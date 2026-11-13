export default function LegalHeader() {
  return (
    <div className="legal-top">
      <div className="wrap topbar" style={{ borderBottom: "none" }}>
        <a className="wordmark" href="/">
          Tasker <span className="amp">&amp;</span> Steward
        </a>
        <div className="topbar-right">
          <span className="soon">Launching early 2027</span>
          <a href="/contact" className="toplink">
            Contact
          </a>
          <a href="/#join" className="btn btn-ghost">
            Get a free Role Report
          </a>
        </div>
      </div>
    </div>
  );
}
