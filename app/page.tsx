import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Business Tools for Service Pros",
  description: "Price service jobs with confidence, calculate profit margins and create professional business documents with practical free tools.",
  alternates: { canonical: "/" },
  openGraph: { title: "ServiceKitly — Make Every Job Worth Your Time", description: "Practical free calculators and business tools for service businesses and independent professionals." }
};

const featuredTools = [
  {icon:"✦",name:"Cleaning price calculator",desc:"Build a job price from labour, supplies and travel.",href:"/tools/house-cleaning-price-calculator/",tag:"MOST POPULAR",tone:"mint",number:"01"},
  {icon:"↗",name:"Profit margin calculator",desc:"Know what stays in your business after costs.",href:"/tools/profit-margin-calculator/",tag:"FINANCE",tone:"peach",number:"02"},
  {icon:"◷",name:"Hourly rate calculator",desc:"Set a rate that supports your income goals.",href:"/tools/hourly-rate-calculator/",tag:"PRICING",tone:"blue",number:"03"}
];

export default function Home() {
  return <div className="home-page">
    <section className="home-hero">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-label"><i /> THE BUSINESS TOOLKIT FOR SERVICE PROFESSIONALS</span>
          <h1>Run your business.<br/><em>Not on guesswork.</em></h1>
          <p>Know what to charge, keep more of what you earn and spend less time on paperwork. One practical toolkit for the work you do every day.</p>
          <div className="hero-actions"><Link className="hero-primary" href="/tools/">Explore all tools <span>↗</span></Link><Link className="hero-secondary" href="/tools/house-cleaning-price-calculator/">Price a job <span>→</span></Link></div>
          <div className="hero-assurances"><span><b>✓</b> Free to use</span><span><b>✓</b> No account required</span><span><b>✓</b> Instant calculations</span></div>
        </div>
        <div className="hero-product">
          <div className="product-window">
            <div className="product-window-head"><div className="product-brand"><span className="product-mark">S</span><span><b>ServiceKitly</b><small>JOB PRICING WORKSPACE</small></span></div><span className="sample-label"><i/> SAMPLE</span></div>
            <div className="product-title-row"><div><small>YOUR JOB OVERVIEW</small><h2>Make the numbers work.</h2></div><span className="product-date">EXAMPLE</span></div>
            <div className="product-main-metric"><div><small>SUGGESTED JOB PRICE</small><strong>$184.60</strong><span>Illustrative sample — not a live business result</span></div><div className="metric-trend">↗</div></div>
            <div className="product-details"><div><span><i className="legend-cost"/> Labour & supplies</span><b>$120.00</b></div><div><span><i className="legend-profit"/> Gross profit</span><b>$64.60</b></div><div className="product-bar"><span/></div><div className="product-foot"><span>Target profit margin</span><b>35%</b></div></div>
            <div className="product-window-foot"><span>✳ Clear calculations</span><span>↗ Better decisions</span></div>
          </div>
          <div className="hero-float-card"><span>✦</span><div><b>Price with purpose</b><small>Build confidence into every quote.</small></div></div>
          <div className="hero-side-note">LESS ADMIN<br/><b>MORE CONTROL</b></div>
        </div>
      </div>
      <div className="hero-bottomline"><span>BUILT FOR INDEPENDENT PROS</span><span>LOCAL SERVICES</span><span>SMALL TEAMS</span><span>GROWING BUSINESSES</span></div>
    </section>

    <section className="home-intro section">
      <div><span className="section-kicker">YOUR WORK, MADE CLEARER</span><h2>Good work deserves<br/><em>good numbers.</em></h2></div>
      <p>Pricing a job, sending an invoice or checking your profit shouldn't mean wrestling with spreadsheets. Get straight to the answer with simple tools built around real service-business tasks.</p>
    </section>

    <section className="featured-section section">
      <div className="section-head"><div><span className="section-kicker">START WITH THE ESSENTIALS</span><h2>Your everyday tools.</h2><p>Useful starting points for healthier business decisions.</p></div><Link className="section-action" href="/tools/">View all 11 tools <span>↗</span></Link></div>
      <div className="featured-grid">{featuredTools.map(tool => <Link className="featured-card" href={tool.href} key={tool.href}><div className="featured-card-top"><span className={`tool-icon ${tool.tone}`}>{tool.icon}</span><span>{tool.number}</span></div><small>{tool.tag}</small><h3>{tool.name}</h3><p>{tool.desc}</p><div className="featured-link">Open calculator <b>↗</b></div></Link>)}</div>
    </section>

    <section className="workflow-band">
      <div className="workflow-band-inner"><div className="workflow-band-copy"><span className="section-kicker">A SIMPLE BUSINESS ROUTINE</span><h2>From first estimate<br/>to <em>paid with confidence.</em></h2><p>Build a repeatable process that protects your time and your margins — without adding another complicated system.</p><Link href="/tools/" className="workflow-cta">Build your workflow <span>↗</span></Link></div>
      <div className="workflow-list"><div><span>01</span><section><b>Calculate your real costs</b><p>Include the labour, materials and travel behind every job.</p></section><i>↗</i></div><div><span>02</span><section><b>Send a clear quote</b><p>Turn your numbers into a customer-ready estimate.</p></section><i>↗</i></div><div><span>03</span><section><b>Track what you keep</b><p>Review income, expenses and profit as you grow.</p></section><i>↗</i></div></div></div>
    </section>

    <section className="home-bottom-cta"><div><span className="section-kicker">LESS GUESSWORK STARTS HERE</span><h2>Make your next business<br/><em>decision a better one.</em></h2></div><Link href="/tools/" className="hero-primary">Explore the toolkit <span>↗</span></Link></section>
  </div>;
}
