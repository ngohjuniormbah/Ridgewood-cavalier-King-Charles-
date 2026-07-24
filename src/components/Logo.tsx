import Link from "next/link";
import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Ridgewood Cavalier King Charles — home">
      <Image
        src="/logo-mark.svg"
        alt="Ridgewood Cavalier King Charles crest"
        width={48}
        height={48}
        className="h-11 w-11 transition-transform duration-500 group-hover:rotate-[6deg]"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-xl font-semibold tracking-wide ${
            light ? "text-cream" : "text-ink"
          }`}
        >
          Ridgewood
        </span>
        <span
          className={`text-[0.62rem] font-semibold uppercase tracking-[0.28em] ${
            light ? "text-gold-soft" : "text-caramel"
          }`}
        >
          Cavalier King Charles
        </span>
      </span>
    </Link>
  );
}
