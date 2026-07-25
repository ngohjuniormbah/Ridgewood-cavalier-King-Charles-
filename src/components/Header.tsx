"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "@/lib/site";
import type { Settings } from "@/lib/types";

export default function Header({ settings }: { settings: Settings }) {
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
      {/* Top information bar — email only */}
      <div className="bg-ink text-cream/90">
        <div className="container-page flex items-center justify-center gap-6 py-2 text-[0.78rem]">
          <a
            href={`mailto:${settings.email}`}
            className="inline-flex items-center gap-2 link-underline"
          >
            <Mail className="h-3.5 w-3.5 text-gold" /> {settings.email}
          </a>
          {settings.announcement && (
            <span className="hidden text-cream/60 sm:inline">· {settings.announcement}</span>
          )}
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
          <Logo logo={settings.logo || "/logo.webp"} />

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
            <Link href="/apply" className="hidden btn-primary sm:inline-flex">
              Apply to Adopt
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
            open ? "max-h-[34rem]" : "max-h-0"
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
              <Link href="/apply" className="btn-primary w-full">
                Apply to Adopt
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
