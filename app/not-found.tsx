import Link from "next/link";
export default function NotFound() {
  return <section className="page-hero not-found-page">
    <span className="eyebrow">404 · PAGE NOT FOUND</span>
    <h1>This page took a wrong turn.</h1>
    <p>The page may have moved, or the address may be incorrect. Head back to the toolkit to find the calculator you need.</p>
    <Link className="btn-primary" href="/tools/">Explore the tools <span>↗</span></Link>
  </section>;
}
