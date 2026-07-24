import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, MessagesSquare, CalendarHeart, Home, PawPrint } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Adoption Process — How to Bring Home a Cavalier",
  description:
    "Our simple, personal adoption process for Ridgewood Cavalier King Charles puppies: apply, chat, reserve, visit and welcome your puppy home with a full go-home pack and lifetime support.",
  alternates: { canonical: "/adoption" },
  keywords: [
    "adopt Cavalier King Charles puppy",
    "Cavalier puppy adoption process",
    "reserve a Cavalier puppy Ohio",
  ],
};

const steps = [
  {
    icon: ClipboardList,
    title: "1. Apply",
    text: "Fill in our short enquiry form so we can learn about your home, your routine and the companion you're hoping for.",
  },
  {
    icon: MessagesSquare,
    title: "2. Let's Talk",
    text: "We'll call or message you to answer questions and help match you with the right puppy or upcoming litter.",
  },
  {
    icon: CalendarHeart,
    title: "3. Reserve & Visit",
    text: "A deposit reserves your puppy. You're warmly invited to visit and meet our dogs in person before go-home day.",
  },
  {
    icon: Home,
    title: "4. Welcome Home",
    text: "At 8+ weeks your puppy goes home with records, contract, a starter pack and our lifetime support.",
  },
];

const faqs = [
  {
    q: "How do I reserve a puppy?",
    a: "Once we've spoken and found the right match, a deposit holds your puppy. The balance is due before go-home day.",
  },
  {
    q: "Do you ship puppies?",
    a: "We prefer families to collect in person so we can meet you. For distant homes we can discuss safe, accompanied travel options.",
  },
  {
    q: "When can a puppy come home?",
    a: "Puppies stay with us until they are at least eight weeks old, fully weaned, vet-checked and started on vaccinations.",
  },
  {
    q: "What comes with my puppy?",
    a: "A signed contract, our two-year health guarantee, veterinary records, microchip paperwork, food to transition on, and a comfort blanket.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function AdoptionPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHeader
        eyebrow="Bringing One Home"
        crumb="Adoption"
        title="A gentle, personal adoption journey"
        description="We take real care matching our puppies with the right families. Here's how the process works, step by step."
      />

      <section className="bg-cream py-24">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delayIndex={i} className="h-full">
                <div className="card h-full p-7 hover:-translate-y-1 hover:shadow-lift">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-chestnut/10 text-chestnut">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mb-2 font-serif text-xl text-ink">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Good To Know" title="Adoption questions, answered" />
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delayIndex={i}>
                <details className="group rounded-2xl border border-charcoal/10 bg-cream p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-lg text-ink">
                    {faq.q}
                    <PawPrint className="h-5 w-5 text-caramel transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="heading-serif max-w-2xl text-3xl text-cream sm:text-4xl">
            Start your adoption enquiry today
          </h2>
          <p className="max-w-xl text-cream/75">
            Tell us a little about your family and we&apos;ll be in touch to guide you through every step.
          </p>
          <Link href="/contact" className="btn-gold">Begin your enquiry</Link>
        </div>
      </section>
    </>
  );
}
