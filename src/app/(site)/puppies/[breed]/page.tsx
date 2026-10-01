import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PetCard from "@/components/PetCard";
import Reveal from "@/components/Reveal";
import { getPets } from "@/lib/store";
import type { PetBreed, PetStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const breedMeta: Record<
  PetBreed,
  {
    name: string;
    singular: string;
    description: string;
  }
> = {
  cavalier: {
    name: "Cavaliers",
    singular: "Cavalier King Charles Spaniel",
    description:
      "Our Cavalier puppies are raised in our family home with careful socialisation and veterinary care.",
  },
  cavapoo: {
    name: "Cavapoos",
    singular: "Cavapoo",
    description:
      "Our Cavapoos are raised with the same home-first approach, individual attention and family support.",
  },
};

const statusSections: {
  status: PetStatus;
  title: string;
  description: string;
}[] = [
  {
    status: "available",
    title: "Available",
    description:
      "These puppies are currently available to join their new families.",
  },
  {
    status: "reserved",
    title: "Reserved",
    description:
      "These puppies have been reserved and are awaiting their new homes.",
  },
  {
    status: "adopted",
    title: "Adopted",
    description:
      "These puppies have found their forever homes.",
  },
  {
    status: "cancelled",
    title: "Canceled",
    description:
      "These puppies are no longer available for adoption and are kept here for status history.",
  },
];

export async function generateMetadata({
  params,
  searchParams,
}: {
  params?: { breed?: string } | Promise<{ breed?: string }>;
  searchParams?: { breed?: string } | Promise<{ breed?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const rawBreed = (resolvedParams?.breed || resolvedSearchParams?.breed || "").toLowerCase();
  const breed: PetBreed = rawBreed.includes("cavapoo") ? "cavapoo" : "cavalier";
  const meta = breedMeta[breed];

  return {
    title: `${meta.name} | Our Nursery`,
    description: meta.description,
    alternates: { canonical: `/puppies/${breed === "cavapoo" ? "cavapoos" : "cavaliers"}` },
  };
}

export default async function PuppiesPage({
  params,
  searchParams,
}: {
  params?: { breed?: string } | Promise<{ breed?: string }>;
  searchParams?: { breed?: string } | Promise<{ breed?: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const rawBreed = (resolvedParams?.breed || resolvedSearchParams?.breed || "").toLowerCase();
  const breed: PetBreed = rawBreed.includes("cavapoo") ? "cavapoo" : "cavalier";

  const pets = await getPets();
  const meta = breedMeta[breed];

  const breedPets = pets.filter(
    (pet) => (pet.breed ?? "cavalier") === breed
  );

  return (
    <>
      <PageHeader
        eyebrow="Our Nursery"
        crumb={meta.name}
        path={`/puppies/${breed === "cavapoo" ? "cavapoos" : "cavaliers"}`}
        title={`${meta.name} and their current status`}
        description={meta.description}
      />

      <div className="bg-cream py-20">
        <div className="container-page space-y-16">

          <div className="flex flex-wrap gap-3">
            <Link
              href="/puppies/cavaliers"
              className={
                breed === "cavalier" ? "btn-primary" : "btn-ghost"
              }
            >
              Cavaliers
            </Link>

            <Link
              href="/puppies/cavapoos"
              className={
                breed === "cavapoo" ? "btn-primary" : "btn-ghost"
              }
            >
              Cavapoos
            </Link>
          </div>

          {breedPets.length === 0 ? (
            <Reveal className="rounded-3xl border border-dashed border-charcoal/20 bg-white p-12 text-center">
              <h2 className="heading-serif text-2xl text-ink">
                No ${meta.name.toLowerCase()} listed right now
              </h2>

              <p className="mx-auto mt-3 max-w-md text-charcoal/70">
                Our litters are planned carefully. Join the waiting list and
                we&apos;ll be in touch when new puppies are announced.
              </p>

              <Link
                href="/contact"
                className="btn-primary mt-6"
              >
                Join the waiting list
              </Link>
            </Reveal>
          ) : (
            statusSections.map((section) => {
              const sectionPets = breedPets.filter(
                (pet) => pet.status === section.status
              );

              if (sectionPets.length === 0) {
                return null;
              }

              return (
                <section key={section.status}>
                  <div className="mb-8">
                    <h2 className="heading-serif text-2xl text-ink sm:text-3xl">
                      {section.title} {meta.name}
                    </h2>

                    <p className="mt-2 text-charcoal/70">
                      {section.description}
                    </p>
                  </div>

                  <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {sectionPets.map((pet, i) => (
                      <Reveal
                        key={pet.id}
                        delayIndex={i}
                        className="h-full"
                      >
                        <PetCard pet={pet} />
                      </Reveal>
                    ))}
                  </div>
                </section>
              );
            })
          )}

          <div className="rounded-3xl bg-ink p-10 text-center text-cream sm:p-14">
            <h2 className="heading-serif text-2xl sm:text-3xl">
              Have a question about a {meta.singular}?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-cream/75">
              We&apos;re happy to talk about temperament, timing, availability
              and what to expect.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link href="/apply" className="btn-gold">
                Apply to Adopt
              </Link>

              <Link href="/contact" className="btn-outline">
                Contact us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
