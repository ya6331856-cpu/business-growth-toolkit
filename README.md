# ServiceKitly

Practical, browser-based calculators and business tools for independent service providers and small teams.

## Current tools

- House Cleaning Price Calculator — estimates a quote from labour, supplies, travel and target margin.
- Profit Margin Calculator — calculates profit or loss and profit margin from revenue and costs.
- Hourly Rate Calculator — estimates a billing rate from income goals, business expenses and realistic billable hours.
- Break-Even Point Calculator — estimates the units needed to cover fixed and variable costs.
- Markup Calculator — calculates a suggested selling price from item cost and markup.

All calculator amounts can be displayed in USD, INR, GBP, EUR, CAD, AUD or AED. Currency selection formats the result; it does not perform foreign-exchange conversion.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Before deployment, run:

```bash
npm run typecheck
npm run build
```

Calculators provide planning estimates, not financial, tax, legal or accounting advice. Review local market and regulatory requirements and include all relevant business costs before relying on a result.

## Production domain and indexing

Set `NEXT_PUBLIC_SITE_URL` in the Vercel **Production** environment to the final HTTPS domain (for example, `https://www.example.com`) before the production deployment. The layout metadata, canonical URL base, sitemap and robots file read this value automatically. Preview deployments and deployments without a valid production URL are marked `noindex`, disallow crawling and return an empty sitemap to avoid indexing preview URLs or an unowned domain.

After connecting the final domain, set the environment variable, redeploy once, and verify the homepage, `/robots.txt`, `/sitemap.xml` and canonical URLs before submitting the sitemap to Google Search Console.
