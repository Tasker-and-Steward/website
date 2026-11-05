import type { Metadata, Viewport } from "next";
import "@fontsource/libre-caslon-text/latin-400.css";
import "@fontsource/libre-caslon-text/latin-400-italic.css";
import "@fontsource/libre-caslon-text/latin-700.css";
import "@fontsource/libre-franklin/latin-400.css";
import "@fontsource/libre-franklin/latin-500.css";
import "@fontsource/libre-franklin/latin-600.css";
import "@fontsource/libre-franklin/latin-700.css";
import Script from "next/script";
import { Suspense } from "react";
import Tracker from "./components/Tracker";
import "./globals.css";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-05639XJBEN";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: "%s | Tasker & Steward" },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  keywords: [
    "AI staffing agency",
    "AI agents for small business",
    "AI receptionist",
    "after-hours answering service",
    "AI lead follow-up",
    "Role Report",
    "home services AI",
  ],
  openGraph: {
    title: "Still hiring like it's 2019? | Tasker & Steward",
    description:
      "Get a free Role Report. We break your job posting down duty by duty and show what an AI agent can handle, managed by a real person on our team.",
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Still hiring like it's 2019? | Tasker & Steward",
    description: "Get a free Role Report: what an AI agent can carry, what still needs a person, and what each option costs.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#14243A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Suspense fallback={null}>
          <Tracker />
        </Suspense>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
