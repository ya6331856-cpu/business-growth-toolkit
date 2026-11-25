import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Business Tools for Service Pros",
  description: "Price service jobs with confidence, calculate profit margins and create professional business documents with practical free tools.",
  alternates: { canonical: "/" },
  openGraph: { title: "ServiceKitly — Make Every Job Worth Your Time", description: "Practical free calculators and business tools for service businesses and independent professionals." }
};

const featuredTools = [
  {icon:"✳",name:"Cleaning price calculator",desc:"Build a job price from labour, supplies and travel.",href:"/tools/house-cleaning-price-calculator/",tag:"JOB PRICING",tone:"mint",number:"01"},
  {icon:"↗",name:"Profit margin calculator",desc:"Know what stays in your business after costs.",href:"/tools/profit-margin-calculator/",tag:"BUSINESS FINANCE",tone:"peach",number:"02"},
  {icon:"◷",name:"Hourly rate calculator",desc:"Set a rate that supports your income goals.",href:"/tools/hourly-rate-calculator/",tag:"RATE PLANNING",tone:"blue",number:"03"}
];

export default function Home() {
  return <div className="home-page">
    <section className="home-hero">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-label"><i /> THE BUSINESS TOOLKIT FOR SERVICE PROFESSIONALS</span>
          <h1>Make every job<br/><em>work harder.</em></h1>
          <p>Know what to charge. Understand your numbers. Send polished documents. The practical business toolkit built for people who do the work.</p>
          <div className="hero-actions"><Link className="hero-primary" href="/workspace/">Open your workspace <span>↗</span></Link><Link className="hero-secondary" href="/tools/">Explore free tools <span>→</span></Link></div>
          <div className="hero-assurances"><span><b>✓</b> Free to use</span><span><b>✓</b> No account required</span><span><b>✓</b> Results in seconds</span></div>
        </div>
        <div className="hero-product">
          <div className="product-window">
            <div className="product-window-head"><div className="product-brand"><span className="product-mark">S</span><span><b>ServiceKitly</b><small>JOB PROFIT SNAPSHOT</small></span></div><span className="sample-label"><i/> SAMPLE DATA</span></div>
            <div className="product-title-row"><div><small>JOB PERFORMANCE</small><h2>Know your numbers.</h2></div><span className="product-date">EXAMPLE</span></div>
            <div className="product-main-metric"><div><small>ESTIMATED JOB PRICE</small><strong>$184.60</strong><span>Illustrative example — not a live result</span></div><div className="metric-trend">↗</div></div>
            <div className="product-details"><div><span><i className="legend-cost"/> Labour & supplies</span><b>$120.00</b></div><div><span><i className="legend-profit"/> Gross profit</span><b>$64.60</b></div><div className="product-bar"><span/></div><div className="product-foot"><span>Target profit margin</span><b>35%</b></div></div>
            <div className="product-window-foot"><span>✳ Transparent calculations</span><span>↗ Better decisions</span></div>
          </div>
          <div className="hero-float-card"><span>✦</span><div><b>Price with purpose</b><small>Build confidence into every quote.</small></div></div>
          <div className="hero-side-note">LESS GUESSWORK<br/><b>MORE CONTROL</b></div>
        </div>
      </div>
      <div className="hero-bottomline"><span>30 PRACTICAL TOOLS</span><span>4 BUSINESS CATEGORIES</span><span>NO SIGN-UP NEEDED</span><span>BUILT FOR SERVICE PROS</span></div>
    </section>

    <section className="home-intro section">
      <div><span className="section-kicker">BUILT AROUND THE WAY YOU WORK</span><h2>Better decisions.<br/><em>Less busywork.</em></h2></div>
      <p>Running a service business means pricing jobs, managing cash and keeping customers informed. Get the essential calculations and documents done without wrestling with spreadsheets or complicated software.</p>
    </section>

    <section className="featured-section section">
      <div className="section-head"><div><span className="section-kicker">THE ESSENTIALS</span><h2>Start with your numbers.</h2><p>Three practical tools to make your next business decision clearer.</p></div><Link className="section-action" href="/tools/">Browse all 30 tools <span>↗</span></Link></div>
      <div className="featured-grid">{featuredTools.map(tool => <Link className="featured-card" href={tool.href} key={tool.href}><div className="featured-card-top"><span className={`tool-icon ${tool.tone}`}>{tool.icon}</span><span>{tool.number}</span></div><small>{tool.tag}</small><h3>{tool.name}</h3><p>{tool.desc}</p><div className="featured-link">Open tool <b>↗</b></div></Link>)}</div>
    </section>

    <section className="workflow-band">
      <div className="workflow-band-inner"><div className="workflow-band-copy"><span className="section-kicker">A BETTER WAY TO RUN THE DAY</span><h2>From first estimate<br/>to <em>paid with confidence.</em></h2><p>Build a repeatable routine that protects your time and your margins — without adding another complicated system.</p><Link href="/workspace/" className="workflow-cta">Open your workspace <span>↗</span></Link></div>
      <div className="workflow-list"><div><span>01</span><section><b>Calculate your real costs</b><p>Account for labour, materials, travel and the margin you need.</p></section><i>↗</i></div><div><span>02</span><section><b>Send a clear quote</b><p>Turn the job details into a professional customer estimate.</p></section><i>↗</i></div><div><span>03</span><section><b>Track what you keep</b><p>Review income, expenses and cash flow as you grow.</p></section><i>↗</i></div></div></div>
    </section>

    <section className="home-bottom-cta"><div><span className="section-kicker">YOUR NEXT BETTER BUSINESS DECISION</span><h2>Make the numbers<br/><em>work for you.</em></h2></div><Link href="/workspace/" className="hero-primary">Open your workspace <span>↗</span></Link></section>
  </div>;
}
