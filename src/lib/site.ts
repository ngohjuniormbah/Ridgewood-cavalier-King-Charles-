/**
 * Single source of truth for business details, navigation and SEO keywords.
 * Update the values here to change them everywhere across the site.
 */

export const site = {
  name: "Ridgewood Cavalier King Charles",
  shortName: "Ridgewood Cavaliers",
  tagline: "Loved before they ever come home",
  description:
    "Ridgewood Cavalier King Charles is a small, ethical Cavalier King Charles Spaniel breeder raising healthy, well-socialised Blenheim, Tricolour, Ruby and Black & Tan puppies in our family home. Health-tested parents, a two-year health guarantee and lifetime breeder support.",
  // Business contact — edit these to your own details.
  address: {
    street: "32 Madison Ct",
    city: "Delaware",
    state: "OH",
    zip: "43015",
    country: "US",
  },
  phone: "+1 (740) 417-5168",
  phoneHref: "tel:+17404175168",
  email: "hello@ridgewoodcavaliers.com",
  hours: "Mon–Sat: 9am – 6pm EST",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ridgewoodcavaliers.com",
  social: {
    facebook: "https://www.facebook.com",
    tiktok: "https://www.tiktok.com",
    instagram: "https://www.instagram.com",
    google: "https://www.google.com/maps",
  },
  // Primary SEO keywords the site is optimised to rank for.
  keywords: [
    "Cavalier King Charles Spaniel breeder",
    "Cavalier King Charles puppies for sale",
    "Cavalier puppies Ohio",
    "Blenheim Cavalier King Charles puppy",
    "Ruby Cavalier King Charles Spaniel",
    "Tricolour Cavalier puppy",
    "Black and Tan Cavalier King Charles",
    "health tested Cavalier breeder",
    "ethical Cavalier King Charles breeder",
    "Cavalier King Charles puppies Delaware Ohio",
    "Cavalier puppies Columbus Ohio",
    "AKC Cavalier King Charles Spaniel",
  ],
} as const;

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

export function fullAddress(): string {
  const { street, city, state, zip } = site.address;
  return `${street}, ${city}, ${state} ${zip}`;
}
