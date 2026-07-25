import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Home as HomeIcon,
  HeartHandshake,
  Stethoscope,
  ArrowRight,
  PawPrint,
  Check,
} from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PetCard from "@/components/PetCard";
import ReviewCard from "@/components/ReviewCard";
import { getPets, getReviews, getGallery } from "@/lib/store";

const values = [
  {
    icon: ShieldCheck,
    title: "2-Year Health Guarantee",
    text: "Every puppy leaves with a signed contract, full veterinary records and a genuine two-year guarantee against hereditary conditions.",
  },
  {
    icon: HomeIcon,
    title: "Raised In Our Home",
    text: "Our puppies are never kennelled. They grow up underfoot — socialised to family life, children and the everyday sounds of a busy home.",
  },
  {
    icon: Stethoscope,
    title: "Health-Tested Parents",
    text: "Both sires and dams are screened for heart, eye and hip conditions so we can breed for soundness and longevity, not just looks.",
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Breeder Support",
    text: "We are here for the whole journey. Call or message us any time — for the life of your dog, you are part of the Ridgewood family.",
  },
];

const colours = [
  {
    name: "Blenheim",
    image: "/images/parent-belle-blenheim.jpg",
    desc: "Rich chestnut markings on a pearl-white coat — the breed's signature look.",
  },
  {
    name: "Ruby",
    image: "/images/parent-rufus-ruby.jpg",
    desc: "A warm, solid mahogany-red coat and famously affectionate temperament.",
  },
  {
    name: "Tricolour",
    image: "/images/parent-winston-tricolour.jpg",
    desc: "Bold black-and-white with tan points above the eyes and on the cheeks.",
  },
  {
    name: "Black & Tan",
    image: "/images/parent-duchess-black-tan.jpg",
    desc: "Glossy jet-black feathering with striking, warm tan highlights.",
  },
];

const breedTraits = [
  { label: "Gentle with children", text: "Patient, tolerant and affectionate — a natural family companion." },
  { label: "Adaptable", text: "Equally content in an apartment or a house with a garden." },
  { label: "Eager to please", text: "Intelligent and people-focused, which makes them a joy to train." },
  { label: "Sociable", text: "They love other pets and thrive on being part of the family." },
];

const process = [
  { step: "01", title: "Apply", text: "Complete our short adoption application to tell us about your home." },
  { step: "02", title: "Chat", text: "We'll reply personally by email to answer questions and find your match." },
  { step: "03", title: "Reserve", text: "A $250 reservation fee holds your puppy until go-home day." },
  { step: "04", title: "Welcome home", text: "Collect your vet-checked puppy with records, contract and support." },
];

const included = [
  { title: "Health records", text: "Age-appropriate vaccinations, deworming and a licensed-vet wellness exam." },
  { title: "Two-year guarantee", text: "A written health guarantee against hereditary conditions." },
  { title: "Microchip & registration", text: "Microchipped with registration paperwork ready to transfer." },
  { title: "Starter food", text: "A supply of the food your puppy is used to, to ease the transition." },
  { title: "Comfort blanket", text: "A blanket carrying the scent of home and littermates." },
  { title: "Lifetime support", text: "Advice and guidance from us for the whole of your dog's life." },
];

const faqs = [
  { q: "How do I reserve a puppy?", a: "Complete the adoption application. Once we've matched you with a puppy, a $250 reservation fee holds them until go-home day and is deducted from the total price." },
  { q: "When can a puppy come home?", a: "Puppies stay with us until they are at least eight weeks old, fully weaned, vet-checked and started on vaccinations." },
  { q: "Are the parents health tested?", a: "Yes. Both parents are screened for heart, eye and patella conditions before we ever plan a litter." },
  { q: "Do you offer a health guarantee?", a: "Every puppy comes with a signed contract and a genuine two-year health guarantee against hereditary conditions." },
];

export default async function HomePage() {
  const [pets, reviews, gallery] = await Promise.all([
    getPets(),
    getReviews(),
    getGallery(),
  ]);
  const available = pets.filter((p) => p.status === "available");
  const showcase = available.slice(0, 3);
  const topReviews = reviews.slice(0, 3);
  const galleryPreview = gallery.slice(0, 6);

  return (
    <>
      <Hero />

      {/* Welcome / origin teaser */}
      <section className="bg-cream py-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src="/images/parent-rufus-ruby.jpg"
                alt="A ruby Cavalier King Charles Spaniel at Ridgewood"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-52 rounded-2xl bg-ink p-5 text-cream shadow-lift sm:block">
              <p className="font-serif text-2xl text-gold-soft">Since 2010</p>
              <p className="mt-1 text-xs text-cream/70">
                Raising Cavaliers the honest, old-fashioned way.
              </p>
            </div>
          </Reveal>

          <div>
            <span className="eyebrow mb-4">Our Story</span>
            <h2 className="heading-serif text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
              A family, four cavaliers, and a promise
            </h2>
            <div className="mt-6 space-y-4 text-charcoal/75">
              <p>
                Ridgewood began at home with four beloved Cavaliers — our Blenheim
                girl Belle, ruby Rufus, tricolour Winston and black &amp; tan Duchess.
                They are not stock; they are family, and their gentle temperaments
                are the foundation of every litter we raise.
              </p>
              <p>
                We are a small, deliberately low-volume breeder. That means fewer
                litters, more time with each puppy, and the ability to match every
                family with the right companion for their home.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/parents" className="btn-primary">
                Meet the parents <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="btn-ghost">
                About Ridgewood
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Families Choose Us"
            title="Bred for health, raised for love"
            description="Everything we do is built around producing sound, happy Cavaliers and supporting the families who welcome them."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delayIndex={i} className="h-full">
                <div className="card h-full p-7 hover:-translate-y-1 hover:shadow-lift">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-chestnut/10 text-chestnut">
                    <value.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mb-2 font-serif text-xl text-ink">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal/70">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Available pets */}
      <section id="available" className="bg-cream py-24">
        <div className="container-page">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow mb-4">Available Pets</span>
              <h2 className="heading-serif mt-2 text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
                Puppies looking for their families
              </h2>
              <p className="mt-3 max-w-xl text-charcoal/70">
                Our available Cavalier King Charles puppies, updated as each litter grows.
                Click a puppy to start your adoption application.
              </p>
            </div>
            <Link href="/puppies" className="btn-ghost shrink-0">
              View all puppies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {showcase.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {showcase.map((pet, i) => (
                <Reveal key={pet.id} delayIndex={i} className="h-full">
                  <PetCard pet={pet} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-soft sm:p-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/images/parent-belle-blenheim.jpg"
                  alt="A Ridgewood Cavalier King Charles Spaniel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h3 className="heading-serif text-2xl text-ink sm:text-3xl">
                  Our next litter is on the way
                </h3>
                <p className="mt-3 text-charcoal/70">
                  We plan our litters carefully and they find homes quickly. Join our
                  waiting list and you&apos;ll be the first to hear when new puppies are
                  ready to reserve.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href="/apply" className="btn-primary">Join the waiting list</Link>
                  <Link href="/parents" className="btn-ghost">Meet the parents</Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* What's included with every puppy */}
      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Your Go-Home Pack"
            title="What comes home with every puppy"
            description="Each Ridgewood puppy leaves fully prepared for a healthy, happy start in their new home."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <Reveal key={item.title} delayIndex={i} className="h-full">
                <div className="flex h-full items-start gap-4 rounded-2xl border border-charcoal/10 bg-cream p-6">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-chestnut/10 text-chestnut">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-charcoal/70">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview strip */}
      {galleryPreview.length > 0 && (
        <section className="bg-ink py-24">
          <div className="container-page">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="eyebrow mb-4">A Glimpse Of Ridgewood</span>
                <h2 className="heading-serif mt-2 text-3xl text-cream sm:text-4xl">
                  Life with our Cavaliers
                </h2>
              </div>
              <Link href="/gallery" className="btn-outline shrink-0">
                See the full gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {galleryPreview.map((item, i) => (
                <Reveal key={item.id} delayIndex={i}>
                  <div className="group relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="text-sm text-cream">{item.title}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why a Cavalier */}
      <section className="bg-white py-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow mb-4">Why A Cavalier</span>
            <h2 className="heading-serif text-3xl text-ink sm:text-4xl">
              The gentlest of companions
            </h2>
            <p className="mt-4 text-charcoal/75">
              Affectionate, adaptable and endlessly loving, the Cavalier King Charles
              Spaniel is as happy on a long walk as curled up on your lap. They make
              wonderful family dogs and devoted companions.
            </p>
            <ul className="mt-6 space-y-4">
              {breedTraits.map((t) => (
                <li key={t.label} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chestnut/10 text-chestnut">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-charcoal/80">
                    <strong className="text-ink">{t.label}.</strong> {t.text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/parent-duchess-black-tan.jpg" alt="Black & Tan Cavalier King Charles Spaniel" fill className="object-cover" sizes="(max-width: 1024px) 45vw, 25vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/parent-rufus-ruby.jpg" alt="Ruby Cavalier King Charles Spaniel" fill className="object-cover" sizes="(max-width: 1024px) 45vw, 25vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/parent-winston-tricolour.jpg" alt="Tricolour Cavalier King Charles Spaniel" fill className="object-cover" sizes="(max-width: 1024px) 45vw, 25vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How adoption works */}
      <section className="bg-cream py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Simple & Personal"
            title="How adoption works"
            description="Four gentle steps from first hello to welcoming your puppy home."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.step} delayIndex={i} className="h-full">
                <div className="relative h-full rounded-3xl border border-charcoal/10 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                  <span className="font-serif text-5xl text-caramel/40">{step.step}</span>
                  <h3 className="mt-2 font-serif text-lg text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/70">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/apply" className="btn-primary">Start your application <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Colours */}
      <section className="bg-ink py-24">
        <div className="container-page">
          <SectionHeading
            light
            eyebrow="The Four Classic Colours"
            title="Every shade of a Cavalier's heart"
            description="From the pearl-and-chestnut Blenheim to the deep mahogany Ruby, we raise all four recognised colours of the Cavalier King Charles Spaniel."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {colours.map((colour, i) => (
              <Reveal key={colour.name} delayIndex={i} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={colour.image}
                      alt={`${colour.name} Cavalier King Charles Spaniel`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 p-6 text-cream">
                    <p className="inline-flex items-center gap-1.5 font-serif text-2xl">
                      <PawPrint className="h-4 w-4 text-gold-soft" /> {colour.name}
                    </p>
                    <p className="mt-1 max-h-0 overflow-hidden text-sm text-cream/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {colour.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Loved By Families"
            title="Words from Ridgewood homes"
            description="Real stories from the families who have welcomed a Ridgewood Cavalier — shared on Google, Facebook and TikTok."
          />
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {topReviews.map((review, i) => (
              <Reveal key={review.id} delayIndex={i} className="h-full">
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/reviews" className="btn-ghost">
              Read all reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading align="left" eyebrow="Good To Know" title="Frequently asked questions" />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delayIndex={i}>
                <details className="group rounded-2xl border border-charcoal/10 bg-white p-6">
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

      {/* CTA */}
      <section className="relative overflow-hidden bg-chestnut py-20">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="heading-serif max-w-3xl text-3xl text-cream sm:text-4xl lg:text-5xl">
            Ready to welcome a Ridgewood Cavalier into your home?
          </h2>
          <p className="max-w-xl text-cream/85">
            Tell us about your family and we&apos;ll help you find the perfect match.
            We reply to every enquiry personally.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="btn-gold">
              Apply to Adopt
            </Link>
            <Link href="/puppies" className="btn-outline">
              See available puppies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
