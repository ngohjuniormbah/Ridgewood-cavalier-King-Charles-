import Link from "next/link";

/**
 * Wordmark styled after the Ridgewood logo — a light grey serif "Ridgewood"
 * above smaller "Cavalier King Charles" lettering. (Drop the group-photo logo
 * into /public/logo.png and swap it in here if you'd prefer the photographic
 * mark in the header.)
 */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex flex-col leading-none" aria-label="Ridgewood Cavalier King Charles — home">
      <span
        className={`font-serif text-2xl font-semibold tracking-wide transition-colors sm:text-[1.7rem] ${
          light ? "text-cream" : "text-[#7c7c7c] group-hover:text-chestnut"
        }`}
      >
        Ridgewood
      </span>
      <span
        className={`font-serif text-[0.82rem] tracking-[0.18em] ${
          light ? "text-cream/70" : "text-[#8f8f8f]"
        }`}
      >
        Cavalier King Charles
      </span>
    </Link>
  );
}
