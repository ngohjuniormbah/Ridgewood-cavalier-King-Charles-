"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Phone, Clock, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { navLinks, site, fullAddress } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top information bar */}
      <div className="hidden bg-ink text-cream/90 md:block">
        <div className="container-page flex items-center justify-center gap-8 py-2 text-[0.78rem]">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-gold" /> {fullAddress()}
          </span>
          <a href={site.phoneHref} className="inline-flex items-center gap-2 link-underline">
            <Phone className="h-3.5 w-3.5 text-gold" /> {site.phone}
          </a>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-gold" /> {site.hours}
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`border-b transition-all duration-500 ${
          scrolled
            ? "border-charcoal/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80"
            : "border-transparent bg-cream"
        }`}
      >
        <nav className="container-page flex items-center justify-between py-4">
          <Logo />

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`link-underline text-sm font-medium transition-colors ${
                      active ? "text-chestnut" : "text-charcoal/80 hover:text-chestnut"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden btn-primary sm:inline-flex">
              Contact Us
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden border-t border-charcoal/10 bg-cream transition-[max-height] duration-500 lg:hidden ${
            open ? "max-h-[32rem]" : "max-h-0"
          }`}
        >
          <ul className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    pathname === link.href
                      ? "bg-chestnut/10 text-chestnut"
                      : "text-charcoal/80 hover:bg-charcoal/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link href="/contact" className="btn-primary w-full">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
