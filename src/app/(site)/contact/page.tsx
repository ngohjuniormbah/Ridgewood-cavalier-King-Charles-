import type { Metadata } from "next";
import Link from "next/link";
import { Mail, HeartHandshake } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Ridgewood Cavalier King Charles to enquire about a puppy or start an adoption application. We reply to every message personally by email.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact Cavalier King Charles breeder",
    "Cavalier puppy enquiry",
    "adopt Cavalier King Charles puppy",
  ],
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        crumb="Contact"
        title="Let's find your perfect companion"
        description="Whether you're ready to apply for a puppy or just have questions, we'd love to hear from you. Every message is answered personally."
      />

      <section className="bg-cream py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-chestnut/10 text-chestnut">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-charcoal/50">Email us</p>
                <a href={`mailto:${settings.email}`} className="break-all font-medium text-ink hover:text-chestnut">
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-charcoal/10 bg-white p-7 shadow-soft">
              <HeartHandshake className="mb-3 h-8 w-8 text-gold" />
              <h2 className="font-serif text-xl text-ink">Ready to adopt?</h2>
              <p className="mt-2 text-sm text-charcoal/70">
                If you&apos;d like to reserve a puppy, the quickest way is to complete our
                short adoption application.
              </p>
              <Link href="/apply" className="btn-primary mt-5">
                Apply to Adopt
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-charcoal/10 bg-white p-7 shadow-soft sm:p-10">
            <h2 className="mb-6 font-serif text-2xl text-ink">Send us a message</h2>
            <ContactForm email={settings.email} />
          </div>
        </div>
      </section>
    </>
  );
}
