import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import Logo from "./Logo";
import { navLinks, site, fullAddress } from "@/lib/site";
import TikTokIcon from "./icons/TikTokIcon";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-cream/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-cream/60">
            A small, ethical Cavalier King Charles Spaniel breeder raising healthy,
            gentle puppies in our family home in {site.address.city}, {site.address.state}.
          </p>
          <div className="flex gap-3">
            <a
              href={site.social.facebook}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={site.social.instagram}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.social.tiktok}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-serif text-lg text-cream">Explore</h3>
          <ul className="space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline text-cream/70 hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-serif text-lg text-cream">Visit &amp; Contact</h3>
          <ul className="space-y-4 text-sm text-cream/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {fullAddress()}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={site.phoneHref} className="hover:text-cream">{site.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-cream">{site.email}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {site.hours}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-serif text-lg text-cream">Ready to meet a puppy?</h3>
          <p className="mb-5 text-sm text-cream/60">
            Reserve a visit or ask about upcoming litters. We reply to every enquiry personally.
          </p>
          <Link href="/contact" className="btn-gold w-full">
            Book a Visit
          </Link>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>
            Raised with love in {site.address.city}, {site.address.state} · Health-guaranteed Cavalier King Charles Spaniels
          </p>
        </div>
      </div>
    </footer>
  );
}
