import type { Metadata } from "next";
import ToolDirectory from "@/components/ToolDirectory";

export const metadata: Metadata = {
  title: "Free Business Tools for Service Professionals",
  description: "Browse free pricing, profit, document and planning tools for service businesses and independent professionals.",
  alternates: { canonical: "/tools/" }
};

export default function Tools() {
  return <>
    <section className="page-hero directory-hero">
      <span className="eyebrow"><i/> THE SERVICEKITLY TOOLKIT</span>
      <h1>Find the right tool.<br/><em>Get back to work.</em></h1>
      <p>Practical calculators and business documents for the decisions behind every job. Search by task or explore a category.</p>
    </section>
    <section className="section directory-grid">
      <div className="directory-banner"><div><span className="section-kicker">BUILT AROUND YOUR WORK</span><h2>Less admin. More clarity.</h2><p>25 useful tools · Free to use · No account needed</p></div><span aria-hidden="true" className="directory-banner-mark">✳</span></div>
      <ToolDirectory />
    </section>
  </>;
}
