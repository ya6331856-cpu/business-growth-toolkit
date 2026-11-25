"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep the error available to the framework's reporting pipeline without
    // exposing technical details to visitors.
    console.error("ServiceKitly route error:", error);
  }, [error]);

  return (
    <section className="page-hero" role="alert" aria-labelledby="error-title">
      <span className="eyebrow">SOMETHING WENT WRONG</span>
      <h1 id="error-title">This page needs another try.</h1>
      <p>
        The page could not load correctly. You can try again, or return to the
        toolkit and open another tool.
      </p>
      <div className="hero-actions">
        <button className="btn-primary" type="button" onClick={() => reset()}>
          Try again <span aria-hidden="true">↻</span>
        </button>
        <Link className="btn-secondary" href="/tools/">
          Browse all tools <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
