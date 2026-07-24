import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { site, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Book a Visit",
  description:
    "Contact Ridgewood Cavalier King Charles to enquire about a puppy, join our waiting list or book a visit. Based in Delaware, Ohio — we reply to every enquiry personally.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact Cavalier King Charles breeder",
    "book a visit Cavalier puppy Ohio",
    "Cavalier puppy enquiry",
  ],
};

const details = [
  { icon: MapPin, label: "Visit us", value: fullAddress() },
  { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Email us", value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: "Hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        crumb="Contact"
        title="Let's find your perfect companion"
        description="Whether you're ready to reserve a puppy or just have questions, we'd love to hear from you."
      />

      <section className="bg-cream py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-chestnut/10 text-chestnut">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-charcoal/50">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="font-medium text-ink hover:text-chestnut">{d.value}</a>
                    ) : (
                      <p className="font-medium text-ink">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-charcoal/10 shadow-soft">
              <iframe
                title={`Map to ${site.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress())}&output=embed`}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-charcoal/10 bg-white p-7 shadow-soft sm:p-10">
            <h2 className="mb-6 font-serif text-2xl text-ink">Send us an enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
