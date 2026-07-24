import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/puppies",
    "/parents",
    "/adoption",
    "/guarantee",
    "/gallery",
    "/reviews",
    "/about",
    "/contact",
  ];

  const now = new Date();
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/puppies" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/puppies" ? 0.9 : 0.7,
  }));
}
