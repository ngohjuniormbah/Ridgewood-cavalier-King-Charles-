import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PetCard from "@/components/PetCard";
import Reveal from "@/components/Reveal";
import { getPets } from "@/lib/store";
import type { Pet, PetStatus } from "@/lib/types";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Available Cavalier King Charles Puppies",
  description:
    "See our current litters of Cavalier King Charles Spaniel puppies — Blenheim, Tricolour, Ruby and Black & Tan. Health-tested parents, two-year guarantee. Available, reserved and recently placed puppies from Ridgewood Cavaliers.",
  alternates: { canonical: "/puppies" },
  keywords: [
    "Cavalier King Charles puppies for sale",
    "available Cavalier King Charles puppies",
    "Blenheim Cavalier puppy",
    "reserved Cavalier puppies",
  ],
};

const groups: { status: PetStatus; title: string; blurb: string }[] = [
  {
    status: "available",
    title: "Available Puppies",
    blurb: "Ready to meet their families. Enquire early — our puppies find homes quickly.",
  },
  {
    status: "reserved",
    title: "Reserved",
    blurb: "These puppies have found their families and are awaiting their new homes.",
  },
  {
    status: "sold",
    title: "In Their Forever Homes",
    blurb: "Graduates of Ridgewood, now thriving with their families.",
  },
];

function section(pets: Pet[], status: PetStatus) {
  return pets.filter((p) => p.status === status);
}

export default async function PuppiesPage() {
  const pets = await getPets();
  const available = section(pets, "available");

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Available Cavalier King Charles Spaniel puppies",
    itemListElement: available.map((pet, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${pet.name} — ${pet.colour} Cavalier King Charles Spaniel`,
        description: pet.description,
        image: pet.images?.[0] ? `${site.url}${pet.images[0]}` : undefined,
        category: "Cavalier King Charles Spaniel puppy",
        offers: {
          "@type": "Offer",
          price: pet.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      {available.length > 0 && <JsonLd data={itemList} />}
      <PageHeader
        eyebrow="Our Puppies"
        crumb="Puppies"
        path="/puppies"
        title="Cavalier King Charles puppies raised with love"
        description="Each Ridgewood puppy is home-raised, vet-checked and started on early socialisation before ever meeting their new family."
      />

      <div className="bg-cream py-20">
        <div className="container-page space-y-20">
          {groups.map((group) => {
            const list = section(pets, group.status);
            if (list.length === 0) return null;
            return (
              <div key={group.status}>
                <div className="mb-10 max-w-2xl">
                  <h2 className="heading-serif text-2xl text-ink sm:text-3xl">{group.title}</h2>
                  <p className="mt-2 text-charcoal/70">{group.blurb}</p>
                </div>
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((pet, i) => (
                    <Reveal key={pet.id} delayIndex={i} className="h-full">
                      <PetCard pet={pet} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}

          {available.length === 0 && (
            <Reveal className="rounded-3xl border border-dashed border-charcoal/20 bg-white p-12 text-center">
              <h2 className="heading-serif text-2xl text-ink">No puppies available right now</h2>
              <p className="mx-auto mt-3 max-w-md text-charcoal/70">
                Our litters are planned carefully and go quickly. Join our waiting list
                and we&apos;ll be in touch the moment a litter is announced.
              </p>
              <Link href="/contact" className="btn-primary mt-6">
                Join the waiting list
              </Link>
            </Reveal>
          )}

          <div className="rounded-3xl bg-ink p-10 text-center text-cream sm:p-14">
            <h2 className="heading-serif text-2xl sm:text-3xl">Have a question about a puppy?</h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/75">
              We&apos;re always happy to talk about temperament, colour, timing and what to
              expect. Reach out and we&apos;ll reply personally.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link href="/apply" className="btn-gold">Apply to Adopt</Link>
              <Link href="/contact" className="btn-outline">Contact us</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
