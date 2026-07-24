import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ReviewCard from "@/components/ReviewCard";
import Reveal from "@/components/Reveal";
import GoogleIcon from "@/components/icons/GoogleIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import TikTokIcon from "@/components/icons/TikTokIcon";
import JsonLd from "@/components/JsonLd";
import { getReviews } from "@/lib/store";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews — What Our Families Say",
  description:
    "Read reviews from families who welcomed a Ridgewood Cavalier King Charles Spaniel, shared across Google, Facebook and TikTok. Honest words about our puppies, health guarantee and lifetime support.",
  alternates: { canonical: "/reviews" },
  keywords: [
    "Cavalier King Charles breeder reviews",
    "Ridgewood Cavaliers reviews",
    "trusted Cavalier breeder Ohio reviews",
  ],
};

export default async function ReviewsPage() {
  const reviews = await getReviews();
  const avg =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: `${site.url}/reviews`,
    ...(reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avg,
        reviewCount: reviews.length,
        bestRating: "5",
        worstRating: "1",
      },
      review: reviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: "5" },
        reviewBody: r.text,
      })),
    }),
  };

  return (
    <>
      <JsonLd data={reviewSchema} />
      <PageHeader
        eyebrow="Loved By Families"
        crumb="Reviews"
        title="Words from Ridgewood homes"
        description="We're endlessly proud of our puppies — but it means the most to hear from the families who love them. These reviews come straight from Google, Facebook and TikTok."
      />

      <section className="bg-white py-16">
        <div className="container-page">
          <Reveal className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-6 rounded-3xl border border-charcoal/10 bg-cream p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-serif text-5xl text-ink">{avg}</p>
              <p className="text-sm text-charcoal/60">Average rating from {reviews.length} reviews</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1 text-xs text-charcoal/60">
                <GoogleIcon className="h-7 w-7" /> Google
              </div>
              <div className="flex flex-col items-center gap-1 text-xs text-charcoal/60">
                <FacebookIcon className="h-7 w-7" /> Facebook
              </div>
              <div className="flex flex-col items-center gap-1 text-xs text-charcoal/60">
                <TikTokIcon className="h-7 w-7" /> TikTok
              </div>
            </div>
          </Reveal>

          {reviews.length === 0 ? (
            <p className="py-16 text-center text-charcoal/60">
              Reviews are on their way — please check back soon.
            </p>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, i) => (
                <Reveal key={review.id} delayIndex={i} className="h-full">
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-ink py-20">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="heading-serif max-w-2xl text-3xl text-cream sm:text-4xl">
            Ready to write your own Ridgewood story?
          </h2>
          <Link href="/contact" className="btn-gold">Enquire about a puppy</Link>
        </div>
      </section>
    </>
  );
}
