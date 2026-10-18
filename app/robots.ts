import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data/site";

/** Preview deployments stay out of the index; production is open apart from the
 *  route handlers and the parked activation form. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/archive/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
