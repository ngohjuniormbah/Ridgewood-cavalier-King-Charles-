import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PawPrint } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getPets, getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Nursery | Cavaliers & Cavapoos",
  description:
    "Meet the two breeds raised at Ridgewood: Cavalier King Charles Spaniels and Cavapoos. Explore each breed's available puppies.",
  alternates: { canonical: "/our-nursery" },
};

function BreedImage({ src, alt }: { src: string; alt: string }) {
  if (!src) {
    return (
      <div className="flex h-full min-h-[340px] items-center justify-center bg-cream text-center">
        <div className="px-8 text-charcoal/40">
          <PawPrint className="mx-auto h-10 w-10" />
          <p className="mt-3 text-sm">Breed image coming soon</p>
        </div>
      </div>
    );
  }
  return <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />;
}

export default async function OurNurseryPage() {
  const [settings, pets] = await Promise.all([getSettings(), getPets()]);
  const cavalierAvailable = pets.filter((p) => (p.breed ?? "cavalier") === "cavalier" && p.status === "available").length;
  const cavapooAvailable = pets.filter((p) => p.breed === "cavapoo" && p.status === "available").length;

  return (
    <>
      <PageHeader
        eyebrow="Our Nursery"
        crumb="Our Nursery"
        path="/our-nursery"
        title="Two breeds, one family approach"
        description="We raise Cavalier King Charles Spaniels and Cavapoos in a home environment where every puppy receives individual attention, early socialisation and thoughtful care."
      />

      <section className="bg-cream py-20">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal className="group overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-soft">
              <div className="relative aspect-[4/3] overflow-hidden"><BreedImage src={settings.nurseryCavalierImage} alt="Cavalier King Charles Spaniel at Ridgewood" /></div>
              <div className="p-7">
                <h2 className="heading-serif text-3xl text-ink">Cavalier King Charles Spaniels</h2>
                <p className="mt-4 text-charcoal/70">Our Cavaliers are affectionate, gentle companions raised in our family home. We focus on sound temperament, health and a strong start in family life.</p>
                <p className="mt-4 text-charcoal/70">{cavalierAvailable} {cavalierAvailable === 1 ? "puppy is" : "puppies are"} currently listed as available.</p>
                <Link href="/puppies/cavaliers" className="btn-primary mt-6">View available Cavaliers <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </Reveal>

            <Reveal delayIndex={1} className="group overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-soft">
              <div className="relative aspect-[4/3] overflow-hidden"><BreedImage src={settings.nurseryCavapooImage} alt="Cavapoo at Ridgewood" /></div>
              <div className="p-7">
                <h2 className="heading-serif text-3xl text-ink">Cavapoos</h2>
                <p className="mt-4 text-charcoal/70">Our Cavapoos are raised with the same family-first approach. Each puppy is handled, socialised and cared for as an individual from the beginning.</p>
                <p className="mt-4 text-charcoal/70">{cavapooAvailable} {cavapooAvailable === 1 ? "puppy is" : "puppies are"} currently listed as available.</p>
                <Link href="/puppies/cavapoos" className="btn-primary mt-6">View available Cavapoos <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-20 max-w-3xl">
            <p>Our nursery is intentionally small. Keeping the program personal means we can spend time with each puppy, observe their individual personalities and give them the calm start they need before joining a new family.</p>
            <p className="mt-5">Both breeds are raised around normal household life and introduced gradually to new people, sounds, handling and routines. Our goal is not simply to raise beautiful puppies, but to prepare confident companions that can settle into family life.</p>
            <p className="mt-5">Browse the breed pages above to see current availability. When a puppy is listed as available, you can review their details and begin the adoption process directly from their profile.</p>
          </div>
        </div>
      </section>
    </>
  );
}
