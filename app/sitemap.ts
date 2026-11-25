import type { MetadataRoute } from "next";
import { getProductionSiteUrl } from "@/lib/site-url";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getProductionSiteUrl();
  if (!base) return [];
  const pages = [
    { path: "/", priority: 1, frequency: "weekly" as const },
    { path: "/tools/", priority: 0.9, frequency: "weekly" as const },
    { path: "/tools/house-cleaning-price-calculator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/profit-margin-calculator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/hourly-rate-calculator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/break-even-calculator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/markup-calculator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/invoice-generator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/quotation-generator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/receipt-generator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/expense-tracker/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/profit-loss-statement/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/cash-flow-calculator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/recurring-revenue-calculator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/lead-conversion-calculator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/tools/cleaning-checklist-generator/", priority: 0.8, frequency: "monthly" as const },
    { path: "/about/", priority: 0.5, frequency: "yearly" as const },
    { path: "/privacy/", priority: 0.3, frequency: "yearly" as const },
    { path: "/terms/", priority: 0.3, frequency: "yearly" as const }
  ];
  return pages.map(page => ({ url: base + page.path, changeFrequency: page.frequency, priority: page.priority }));
}
