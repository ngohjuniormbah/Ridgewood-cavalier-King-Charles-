import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { getGallery } from "@/lib/store";

export const metadata: Metadata = {
  title: "Gallery — Our Cavaliers in Everyday Life",
  description:
    "A gallery of Ridgewood Cavalier King Charles Spaniels — our parent dogs, puppies and the families who have welcomed them home. Blenheim, Tricolour, Ruby and Black & Tan Cavaliers.",
  alternates: { canonical: "/gallery" },
  keywords: [
    "Cavalier King Charles gallery",
    "Cavalier puppy photos",
    "Blenheim Ruby Tricolour Cavalier pictures",
  ],
};

export default async function GalleryPage() {
  const gallery = await getGallery();
  return (
    <>
      <PageHeader
        eyebrow="Moments At Ridgewood"
        crumb="Gallery"
        title="Life with our Cavaliers"
        description="A little window into everyday life at Ridgewood — the dogs we love and the puppies who go on to fill homes with joy."
      />
      <section className="bg-cream py-20">
        <div className="container-page">
          <GalleryGrid items={gallery} />
        </div>
      </section>
    </>
  );
}
