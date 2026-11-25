import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const productionSiteUrl = process.env.VERCEL_ENV === "production" && configuredSiteUrl?.startsWith("https://") ? configuredSiteUrl : undefined;

  if (!productionSiteUrl) {
    return { rules: { userAgent: "*", allow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${productionSiteUrl}/sitemap.xml`
  };
}
