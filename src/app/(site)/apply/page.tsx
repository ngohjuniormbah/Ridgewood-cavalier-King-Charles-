import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ApplicationForm from "@/components/ApplicationForm";
import { getSettings, getPets } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Adoption Application",
  description:
    "Apply to adopt a Ridgewood Cavalier King Charles Spaniel puppy. Complete our short application and we'll be in touch about reserving your puppy.",
  alternates: { canonical: "/apply" },
  keywords: [
    "Cavalier King Charles adoption application",
    "reserve a Cavalier puppy",
    "apply to adopt Cavalier King Charles",
  ],
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: { puppy?: string };
}) {
  const [settings, pets] = await Promise.all([getSettings(), getPets()]);

  // Only honour a puppy name that exists and is genuinely available.
  const requested = searchParams.puppy?.trim();
  const match = requested
    ? pets.find((p) => p.name.toLowerCase() === requested.toLowerCase() && p.status === "available")
    : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Reserve Your Puppy"
        crumb="Apply"
        title={match ? `Apply to adopt ${match.name}` : "Adoption application"}
        description="Tell us a little about your home and we'll personally review your application. It only takes a couple of minutes."
      />

      <section className="bg-cream py-20">
        <div className="container-page max-w-3xl">
          <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-soft sm:p-10">
            <ApplicationForm
              puppyName={match?.name}
              reservationFee={settings.reservationFee}
              email={settings.email}
            />
          </div>
        </div>
      </section>
    </>
  );
}
