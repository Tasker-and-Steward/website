"use client";

// A link to the Role Report form that tells GA4 which page sent the visitor,
// so we can see which "AI or hire?" guide drives Role Report requests.
export default function RoleReportCta({
  source,
  label = "Get a free Role Report",
  className = "btn btn-red",
}: {
  source: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      className={className}
      href="/#join"
      onClick={() => {
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        w.gtag?.("event", "role_report_cta_click", { source });
      }}
    >
      {label}
    </a>
  );
}
