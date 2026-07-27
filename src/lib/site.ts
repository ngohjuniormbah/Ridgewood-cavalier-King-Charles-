/**
 * Static brand details and navigation. Contact details that the owner can edit
 * from the admin Settings tab live in `defaultSettings` below and are read
 * through `getSettings()` — these are only the fallback defaults.
 */

import type { Settings } from "./types";

export const site = {
  name: "Ridgewood Cavalier King Charles",
  shortName: "Ridgewood Cavaliers",
  tagline: "Loved before they ever come home",
  description:
    "Ridgewood Cavalier King Charles is a small, ethical Cavalier King Charles Spaniel breeder raising healthy, well-socialised Blenheim, Tricolour, Ruby and Black & Tan puppies in our family home. Health-tested parents, a two-year health guarantee and lifetime breeder support.",
  // NEXT_PUBLIC_SITE_URL overrides this; the default is the custom domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ridgewoodcavalier.com",
  // Primary SEO keywords the site is optimised to rank for.
  keywords: [
    "Cavalier King Charles Spaniel breeder",
    "Cavalier King Charles puppies for sale",
    "Blenheim Cavalier King Charles puppy",
    "Ruby Cavalier King Charles Spaniel",
    "Tricolour Cavalier puppy",
    "Black and Tan Cavalier King Charles",
    "health tested Cavalier breeder",
    "ethical Cavalier King Charles breeder",
    "adopt Cavalier King Charles puppy",
    "AKC Cavalier King Charles Spaniel",
  ],
} as const;

/** Owner-editable contact details. Overridden by the admin Settings tab. */
export const defaultSettings: Settings = {
  email: "cavalierkingcharlesridgewood@gmail.com",
  phone: "",
  location: "",
  hours: "",
  reservationFee: 250,
  logo: "",
  facebook: "https://www.facebook.com/share/17bRsfJh6P/?mibextid=wwXIfr",
  instagram: "",
  tiktok: "https://www.tiktok.com/@ridgewoodcavalierking4?_r=1&_t=ZT-98L6IvBkspy",
  announcement: "",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/parents", label: "Parent Dogs" },
  { href: "/adoption", label: "Adoption" },
  { href: "/guarantee", label: "Guarantee" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
] as const;
