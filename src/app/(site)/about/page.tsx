import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Home, ShieldCheck, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Ridgewood Cavalier King Charles",
  description:
    "Ridgewood Cavalier King Charles is a small, ethical family breeder raising healthy, gentle Cavalier King Charles Spaniels with health-tested parents and lifetime support.",
  alternates: { canonical: "/about" },
  keywords: [
    "about Ridgewood Cavaliers",
    "ethical Cavalier King Charles breeder",
    "family Cavalier King Charles breeder",
  ],
};

const principles = [
  { icon: Home, title: "Home, not kennels", text: "Puppies are raised underfoot in our living room, socialised to real family life." },
  { icon: ShieldCheck, title: "Health first", text: "We health-test our parents and guarantee every puppy for two years." },
  { icon: Heart, title: "Low volume, high care", text: "Few litters a year means more time, attention and love for each puppy." },
  { icon: Sparkles, title: "Lifetime relationship", text: "We support our families for the whole of their dog's life — no exceptions." },
];

export default async function AboutPage() {
  const content = await getContent();
  const aboutParagraphs = content.aboutBody.split(/\n\s*\n/).filter(Boolean);
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        crumb="About"
        path="/about"
        title="A small family breeder with a big heart"
        description="We are a small home breeder devoted to the Cavalier King Charles Spaniel — its health, its temperament and its future."
      />

      <section className="bg-cream py-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src={content.aboutImage || "/images/parent-winston-tricolour.jpg"}
              alt="A Cavalier King Charles Spaniel at Ridgewood"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <div>
            <span className="eyebrow mb-4">Who We Are</span>
            <h2 className="heading-serif text-3xl text-ink sm:text-4xl">
              {content.aboutTitle}
            </h2>
            <div className="mt-6 space-y-4 text-charcoal/75">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Stand For"
            title="The principles behind every litter"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delayIndex={i} className="h-full">
                <div className="card h-full p-7 hover:-translate-y-1 hover:shadow-lift">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-chestnut/10 text-chestnut">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mb-2 font-serif text-xl text-ink">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal/70">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-chestnut py-20">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="heading-serif max-w-2xl text-3xl text-cream sm:text-4xl">
            We&apos;d love to tell you more in person
          </h2>
          <p className="max-w-xl text-cream/85">
            Come and meet our dogs, ask your questions, and see how our puppies are raised.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="btn-gold">Apply to Adopt</Link>
            <Link href="/contact" className="btn-outline">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
