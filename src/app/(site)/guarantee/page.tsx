import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Our 2-Year Health Guarantee",
  description:
    "Ridgewood Cavalier King Charles puppies come with a genuine two-year health guarantee, a signed contract, full veterinary records and lifetime breeder support.",
  alternates: { canonical: "/guarantee" },
  keywords: [
    "Cavalier King Charles health guarantee",
    "health guaranteed Cavalier puppy",
    "Cavalier breeder contract",
  ],
};

const included = [
  {
    title: "Two-Year Written Guarantee",
    text: "Your puppy is guaranteed against life-threatening congenital and hereditary defects for a full two years from birth.",
  },
  {
    title: "Health-Tested Parents",
    text: "Both parents are screened for heart, eye and patella conditions before we ever plan a litter.",
  },
  {
    title: "Full Veterinary Records",
    text: "Age-appropriate vaccinations, deworming and a licensed-vet wellness exam — all documented and sent home with you.",
  },
  {
    title: "Signed Contract",
    text: "A clear, plain-English contract that protects you, your puppy and the future of the breed.",
  },
  {
    title: "Microchip & Registration",
    text: "Every puppy is microchipped and comes with its registration paperwork.",
  },
  {
    title: "Lifetime Breeder Support",
    text: "Questions at 8 weeks or 8 years — we are only ever a phone call away, for life.",
  },
];

const steps = [
  { step: "01", title: "Health testing", text: "We screen our parent dogs and only breed sound, healthy pairings." },
  { step: "02", title: "Early care", text: "Puppies receive vet exams, vaccinations and daily socialisation." },
  { step: "03", title: "Go-home pack", text: "Records, contract, food, a comfort blanket and a starter guide." },
  { step: "04", title: "Ongoing support", text: "We stay in touch and support you for the whole of your dog's life." },
];

export default function GuaranteePage() {
  return (
    <>
      <PageHeader
        eyebrow="Peace Of Mind"
        crumb="Guarantee"
        title="A genuine two-year health guarantee"
        description="We stand behind the health of every puppy we raise. Here is exactly what that promise means for you."
      />

      <section className="bg-cream py-24">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <Reveal key={item.title} delayIndex={i} className="h-full">
                <div className="card h-full p-7 hover:-translate-y-1 hover:shadow-lift">
                  <ShieldCheck className="mb-4 h-8 w-8 text-gold" />
                  <h3 className="mb-2 font-serif text-xl text-ink">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal/70">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="From Our Home To Yours"
            title="How we protect every puppy"
            description="Our guarantee is the result of a careful process that starts long before a litter is born."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.step} delayIndex={i} className="h-full">
                <div className="h-full rounded-3xl border border-charcoal/10 bg-cream p-7">
                  <span className="font-serif text-4xl text-caramel/50">{s.step}</span>
                  <h3 className="mt-3 font-serif text-lg text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-chestnut py-20">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="heading-serif max-w-2xl text-3xl text-cream sm:text-4xl">
            Confidence, from the very first cuddle
          </h2>
          <p className="max-w-xl text-cream/85">
            Have a question about our contract or guarantee? We&apos;re happy to walk you through every detail.
          </p>
          <Link href="/contact" className="btn-gold">Ask us anything</Link>
        </div>
      </section>
    </>
  );
}
