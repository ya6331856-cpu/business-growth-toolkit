import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the terms for using ServiceKitly's free business calculators and educational tools.",
  alternates: { canonical: "/terms/" }
};
export default function Terms() {
  return <>
    <section className="page-hero"><span className="eyebrow">PLEASE READ</span><h1>Terms of use</h1><p>By using ServiceKitly, you agree to use these tools responsibly and understand the limits of the estimates they provide.</p></section>
    <section className="content-section">
      <h2>Informational tools only</h2><p>ServiceKitly provides calculators and general educational information. Results are estimates based only on the inputs you provide. They are not financial, accounting, tax, legal or professional advice.</p>
      <h2>Check your inputs and results</h2><p>You are responsible for checking that your inputs are accurate and that any result is suitable for your circumstances. Calculators may not include every cost, tax, fee, local rule or business-specific factor.</p>
      <h2>No guarantee of business outcomes</h2><p>We do not guarantee that using a calculator will lead to a particular price, profit, sale, ranking or business result. Market conditions and individual circumstances vary.</p>
      <h2>Acceptable use</h2><p>Do not misuse the website, attempt to disrupt its operation, or use it in a way that violates applicable law or the rights of others.</p>
      <h2>Third-party services and availability</h2><p>The website may rely on third-party hosting or infrastructure. We aim to keep the tools available, but do not guarantee uninterrupted or error-free access.</p>
      <h2>Updates</h2><p>We may update these terms as the website and its features change. Continued use after an update means you accept the revised terms.</p>
      <h2>Contact and legal review</h2><p>This starter terms page does not replace jurisdiction-specific legal advice. Before commercial launch, review these terms for the countries where the website will operate and add a genuine contact method if one is established.</p>
    </section>
  </>;
}
