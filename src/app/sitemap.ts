import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/our-nursery",
    "/puppies",
    "/parents",
    "/adoption",
    "/apply",
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
    changeFrequency: path === "/our-nursery" || path === "/puppies" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/our-nursery" ? 0.95 : path === "/puppies" ? 0.75 : 0.7,
  }));
}
