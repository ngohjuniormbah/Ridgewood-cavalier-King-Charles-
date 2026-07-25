import Link from "next/link";
import Image from "next/image";

/**
 * Renders the uploaded brand logo when one is set in admin Settings; otherwise
 * falls back to a grey serif "Ridgewood / Cavalier King Charles" wordmark.
 */
export default function Logo({ light = false, logo }: { light?: boolean; logo?: string }) {
  if (logo) {
    return (
      <Link href="/" className="flex items-center" aria-label="Ridgewood Cavalier King Charles — home">
        <Image
          src={logo}
          alt="Ridgewood Cavalier King Charles"
          width={260}
          height={190}
          className="h-14 w-auto object-contain sm:h-16"
          priority
        />
      </Link>
    );
  }

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
