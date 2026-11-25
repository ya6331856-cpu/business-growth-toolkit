import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://servicekitly.com"),
  title: { default: "ServiceKitly — Tools to Run a Better Service Business", template: "%s | ServiceKitly" },
  description: "Free practical calculators and business tools for cleaning companies, home-service pros and independent service providers. Price jobs, protect profit and create better quotes.",
  applicationName: "ServiceKitly",
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "ServiceKitly", title: "ServiceKitly — Tools to Run a Better Service Business", description: "Price jobs confidently, protect your margins and win more work." }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <header className="site-header"><a className="brand" href="/"><span className="brand-mark">S</span><span>servicekitly<span className="brand-dot">.</span></span></a><nav><a href="/tools/">Tools</a><a href="/about/">About</a></nav><a className="header-cta" href="/tools/">Explore tools <span>↗</span></a></header>
    <main>{children}</main>
    <footer className="footer"><div><a className="brand footer-brand" href="/"><span className="brand-mark">S</span><span>servicekitly<span className="brand-dot">.</span></span></a><p>Practical tools for people who run service businesses.</p></div><div className="footer-links"><a href="/tools/">All tools</a><a href="/about/">About</a><a href="/privacy/">Privacy</a></div><small>© {new Date().getFullYear()} ServiceKitly. Check local tax and legal requirements before relying on estimates.</small></footer>
  </body></html>;
}