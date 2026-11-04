export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <span>
          <span className="serif" style={{ color: "#F4EFE4" }}>
            Tasker &amp; Steward
          </span>{" "}
          · AI staffing with human accountability
        </span>
        <nav aria-label="Legal">
          <a href="/contact">Contact</a>
          <a href="/faq">FAQ</a>
          <a href="/insights">Monthly email</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/sms-terms">SMS Terms</a>
          <span>© {new Date().getFullYear()} Tasker &amp; Steward LLC</span>
        </nav>
      </div>
    </footer>
  );
}
