import Image from "next/image";
import { ExternalLink, Quote } from "lucide-react";
import type { Review } from "@/lib/types";
import StarRating from "./StarRating";
import SourceBadge from "./SourceBadge";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="card flex h-full flex-col p-7 hover:-translate-y-1 hover:shadow-lift">
      <div className="mb-5 flex items-center justify-between">
        <StarRating rating={review.rating} />
        <SourceBadge source={review.source} />
      </div>

      <Quote className="mb-3 h-7 w-7 text-gold/50" />
      <p className="flex-1 text-[0.95rem] leading-relaxed text-charcoal/80">{review.text}</p>

      {review.photo && (
        <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={review.photo}
            alt={`Photo shared by ${review.author}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 380px"
          />
        </div>
      )}

      {review.link && (
        <a
          href={review.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-chestnut link-underline"
        >
          View post <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}

      <div className="mt-6 flex items-center gap-3 border-t border-charcoal/10 pt-5">
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt={review.author}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-chestnut/10 font-serif text-sm font-semibold text-chestnut">
            {initials(review.author)}
          </span>
        )}
        <div>
          <p className="font-medium text-ink">{review.author}</p>
          {review.location && (
            <p className="text-xs text-charcoal/50">{review.location}</p>
          )}
        </div>
      </div>
    </article>
  );
}
