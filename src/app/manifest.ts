import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f2e8",
    theme_color: "#201812",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
