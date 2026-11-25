import type { MetadataRoute } from "next";
import { getProductionSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const productionSiteUrl = getProductionSiteUrl();

  if (!productionSiteUrl) {
    return { rules: { userAgent: "*", allow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${productionSiteUrl}/sitemap.xml`
  };
}
