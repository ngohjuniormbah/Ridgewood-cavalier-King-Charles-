import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { site } from "@/lib/site";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  crumb: string;
  path?: string;
}

export default function PageHeader({ eyebrow, title, description, crumb, path }: Props) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: crumb,
        ...(path ? { item: `${site.url}${path}` } : {}),
      },
    ],
  };
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-14">
      <JsonLd data={breadcrumb} />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #c39b52 0, transparent 45%), radial-gradient(circle at 80% 60%, #b07c4f 0, transparent 40%)",
        }}
      />
      <div className="container-page">
        <nav className="mb-6 flex items-center gap-2 text-xs text-cream/50">
          <Link href="/" className="hover:text-cream">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gold-soft">{crumb}</span>
        </nav>
        {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
        <h1 className="heading-serif mt-2 max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/75">{description}</p>
        )}
      </div>
    </section>
  );
}
