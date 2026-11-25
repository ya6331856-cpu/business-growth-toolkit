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

The canonical domain is temporarily configured as https://servicekitly.com. Update `metadataBase`, sitemap and robots if another domain is chosen. Do not submit the sitemap to search engines until the final domain is connected and the site is deployed.
