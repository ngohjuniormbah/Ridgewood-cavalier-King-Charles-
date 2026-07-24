import Link from "next/link";
import { Mail, Facebook, Instagram } from "lucide-react";
import Logo from "./Logo";
import { navLinks, site } from "@/lib/site";
import type { Settings } from "@/lib/types";
import TikTokIcon from "./icons/TikTokIcon";

export default function Footer({ settings }: { settings: Settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-cream/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-cream/60">
            A small, ethical Cavalier King Charles Spaniel breeder raising healthy,
            gentle puppies in our family home.
          </p>
          <div className="flex gap-3">
            {settings.facebook && (
              <a href={settings.facebook} className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {settings.instagram && (
              <a href={settings.instagram} className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {settings.tiktok && (
              <a href={settings.tiktok} className="social-link" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <TikTokIcon className="h-4 w-4" />
              </a>
            )}
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
          <h3 className="mb-5 font-serif text-lg text-cream">Contact</h3>
          <ul className="space-y-4 text-sm text-cream/70">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${settings.email}`} className="break-all hover:text-cream">{settings.email}</a>
            </li>
          </ul>
          <p className="mt-5 text-xs text-cream/50">
            All enquiries and adoption applications are answered by email.
          </p>
        </div>

        <div>
          <h3 className="mb-5 font-serif text-lg text-cream">Ready to meet a puppy?</h3>
          <p className="mb-5 text-sm text-cream/60">
            Start an adoption application and we&apos;ll reply personally.
          </p>
          <Link href="/apply" className="btn-gold w-full">
            Apply to Adopt
          </Link>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Health-guaranteed Cavalier King Charles Spaniels · Raised with love</p>
        </div>
      </div>
    </footer>
  );
}
