import type { ReviewSource } from "@/lib/types";
import GoogleIcon from "./icons/GoogleIcon";
import FacebookIcon from "./icons/FacebookIcon";
import TikTokIcon from "./icons/TikTokIcon";

const labels: Record<ReviewSource, string> = {
  google: "Google",
  facebook: "Facebook",
  tiktok: "TikTok",
};

export function sourceLabel(source: ReviewSource): string {
  return labels[source];
}

export default function SourceBadge({ source }: { source: ReviewSource }) {
  const Icon =
    source === "google" ? GoogleIcon : source === "facebook" ? FacebookIcon : TikTokIcon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal/5 px-3 py-1 text-xs font-medium text-charcoal/70">
      <Icon className="h-3.5 w-3.5" />
      via {labels[source]}
    </span>
  );
}
