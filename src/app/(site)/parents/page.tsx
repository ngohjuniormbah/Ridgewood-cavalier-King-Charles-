import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, Stethoscope } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Our Parent Dogs — The Origin of Ridgewood",
  description:
    "Meet the four Cavalier King Charles Spaniels behind Ridgewood — Belle, Rufus, Winston and Duchess. Health-tested, home-raised parents whose gentle temperaments are the foundation of every litter.",
  alternates: { canonical: "/parents" },
  keywords: [
    "Cavalier King Charles parent dogs",
    "health tested Cavalier breeder",
    "Cavalier King Charles Spaniel bloodline",
  ],
};

const parents = [
  {
    name: "Belle",
    role: "Foundation Dam",
    colour: "Blenheim",
    image: "/images/parent-belle-blenheim.jpg",
    bio: "Belle is where our story begins. A pearl-and-chestnut Blenheim with an unshakeable gentleness, she is the calm heart of our home and the mother of our sweetest litters.",
  },
  {
    name: "Rufus",
    role: "Sire",
    colour: "Ruby",
    image: "/images/parent-rufus-ruby.jpg",
    bio: "Rufus is a warm, solid ruby with soulful eyes and an easy, affectionate nature. He passes on his even temperament and love of people to every puppy he fathers.",
  },
  {
    name: "Winston",
    role: "Sire",
    colour: "Tricolour",
    image: "/images/parent-winston-tricolour.jpg",
    bio: "Bold, playful and endlessly curious, Winston brings striking tricolour markings and a confident, joyful spirit to our lines — always the first to invent a new game.",
  },
  {
    name: "Duchess",
    role: "Dam",
    colour: "Black & Tan",
    image: "/images/parent-duchess-black-tan.jpg",
    bio: "Duchess is elegance itself — glossy black feathering, rich tan points and a devoted, watchful nature. She is a wonderful, attentive mother to her puppies.",
  },
];

export default function ParentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Origin of Ridgewood"
        crumb="Parent Dogs"
        title="It started with four Cavaliers we loved"
        description="Ridgewood was never a business plan. It grew, quite simply, from a home full of Cavalier King Charles Spaniels and a wish to share their gentle spirit with other families."
      />

      {/* Origin narrative */}
      <section className="bg-cream py-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow mb-4">How It All Began</span>
            <h2 className="heading-serif text-3xl text-ink sm:text-4xl">
              A story written by the dogs themselves
            </h2>
            <div className="mt-6 space-y-4 text-charcoal/75">
              <p>
                Years ago, a single Blenheim puppy named Belle joined our family. Her
                sweetness was so complete that one Cavalier soon became two, then four —
                each with their own colour, their own character, and the same melting,
                people-loving heart the breed is treasured for.
              </p>
              <p>
                Friends who met our dogs kept asking the same question: <em>where can we
                find one like this?</em> Honest, well-bred Cavaliers were hard to come by.
                So we made a careful decision — to raise a very small number of litters
                ourselves, health-testing our parents and placing every puppy personally.
              </p>
              <p>
                That is Ridgewood. No kennels, no shortcuts — just four beloved dogs, a
                busy family home, and puppies who are genuinely loved long before they
                ever come home to you.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Stethoscope, label: "Heart & eye tested" },
                { icon: Heart, label: "Home-raised parents" },
                { icon: ShieldCheck, label: "Bred for temperament" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-charcoal/80">
                  <item.icon className="h-5 w-5 text-chestnut" /> {item.label}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            {parents.map((p) => (
              <div key={p.name} className="relative aspect-square overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={p.image}
                  alt={`${p.name}, a ${p.colour} Cavalier King Charles Spaniel`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 45vw, 22vw"
                />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Individual parents */}
      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Meet The Parents"
            title="The four hearts behind every litter"
            description="Each of our dogs is a cherished member of the family first, and a parent second."
          />
          <div className="mt-14 space-y-16">
            {parents.map((parent, i) => (
              <Reveal key={parent.name}>
                <div
                  className={`grid items-center gap-8 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
                    <Image
                      src={parent.image}
                      alt={`${parent.name}, ${parent.colour} Cavalier King Charles Spaniel`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <span className="eyebrow mb-4">{parent.role} · {parent.colour}</span>
                    <h3 className="heading-serif text-3xl text-ink sm:text-4xl">{parent.name}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-charcoal/75">{parent.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="heading-serif max-w-2xl text-3xl text-cream sm:text-4xl">
            Puppies from these parents are worth the wait
          </h2>
          <p className="max-w-xl text-cream/75">
            Ask us about upcoming litters and how our parents&apos; temperaments might match your family.
          </p>
          <Link href="/contact" className="btn-gold">Enquire about a litter</Link>
        </div>
      </section>
    </>
  );
}
