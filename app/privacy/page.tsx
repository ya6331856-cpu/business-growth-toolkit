import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how ServiceKitly handles information when you use its free business calculators.",
  alternates: { canonical: "/privacy/" }
};
export default function Privacy() {
  return <>
    <section className="page-hero"><span className="eyebrow">YOUR PRIVACY</span><h1>Privacy policy</h1><p>This page explains the current, limited data practices of ServiceKitly. It must be reviewed and updated whenever analytics, advertising, forms, accounts or other third-party services are introduced.</p></section>
    <section className="content-section">
      <h2>Information you enter into calculators</h2><p>The current calculators run in your browser. The values you enter are used to calculate the result and are not submitted to a ServiceKitly account or stored by the calculator on a server. Avoid entering confidential customer, payment or identity information.</p>
      <h2>Accounts and contact forms</h2><p>The current site does not require an account to use its calculators and does not currently provide a contact form.</p>
      <h2>Cookies and analytics</h2><p>ServiceKitly does not intentionally set analytics or advertising cookies in this initial release. Hosting infrastructure may process basic technical request data to deliver and protect the website. This notice must be revised if cookies, analytics, advertising or other tracking technologies are enabled.</p>
      <h2>Third-party services</h2><p>The website is hosted by a third-party hosting provider. That provider may process technical data under its own privacy terms. No payment processor is used by the current calculator tools.</p>
      <h2>Children's privacy</h2><p>These business tools are intended for business owners and adults, not children.</p>
      <h2>Changes to this policy</h2><p>This policy may be updated when site features or legal requirements change. Check the current version whenever a new data-processing service is added.</p>
      <h2>Important notice</h2><p>This is a plain-language starter policy, not legal advice. Before public launch, confirm the actual hosting, logging, cookie and data-processing practices and obtain appropriate legal review for the countries you target.</p>
    </section>
  </>;
}
