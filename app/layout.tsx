import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { getProductionSiteUrl } from "@/lib/site-url";
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
const productionSiteUrl = process.env.VERCEL_ENV === "production" && configuredSiteUrl?.startsWith("https://") ? configuredSiteUrl : undefined;

export const metadata: Metadata = {
  ...(productionSiteUrl ? { metadataBase: new URL(productionSiteUrl) } : {}),
  title: { default: "ServiceKitly — Tools to Run a Better Service Business", template: "%s | ServiceKitly" },
  description: "Free practical calculators and business tools for cleaning companies, home-service pros and independent service providers. Price jobs, protect profit and create better quotes.",
  applicationName: "ServiceKitly",
  robots: productionSiteUrl ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: "ServiceKitly", title: "ServiceKitly — Tools to Run a Better Service Business", description: "Price jobs confidently, protect your margins and win more work." }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={dmSans.variable}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><a className="brand" href="/"><span className="brand-mark">S</span><span>servicekitly<span className="brand-dot">.</span></span></a><nav aria-label="Main navigation"><a href="/tools/">Tools</a><a href="/about/">About</a></nav><a className="header-cta" href="/tools/">Explore tools <span>↗</span></a></header>
    <main id="main-content">{children}</main>
    <footer className="footer"><div><a className="brand footer-brand" href="/"><span className="brand-mark">S</span><span>servicekitly<span className="brand-dot">.</span></span></a><p>Practical tools for people who run service businesses.</p></div><div className="footer-links"><a href="/tools/">All tools</a><a href="/about/">About</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></div><small>© {new Date().getFullYear()} ServiceKitly. Check local tax and legal requirements before relying on estimates.</small></footer>
  </body></html>;
}
