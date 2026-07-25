import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import type { Pet, PetStatus } from "@/lib/types";

const statusStyles: Record<PetStatus, { label: string; dot: string; text: string }> = {
  available: { label: "Available", dot: "bg-emerald-500", text: "text-emerald-700" },
  reserved: { label: "Reserved", dot: "bg-amber-500", text: "text-amber-700" },
  cancelled: { label: "Cancelled", dot: "bg-rose-500", text: "text-rose-700" },
  sold: { label: "In forever home", dot: "bg-charcoal/40", text: "text-charcoal/60" },
};

export default function PetCard({ pet }: { pet: Pet }) {
  const image = pet.images[0] ?? "/images/parent-belle-blenheim.jpg";
  const status = statusStyles[pet.status];
  return (
    <article className="card group flex h-full flex-col hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={`${pet.name}, a ${pet.colour} Cavalier King Charles Spaniel`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <h3 className="font-serif text-xl font-semibold text-ink">{pet.name}</h3>
          <span className="text-sm font-semibold text-chestnut">
            ${pet.price.toLocaleString()}
          </span>
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1 text-caramel">
            <PawPrint className="h-3.5 w-3.5" /> {pet.colour}
          </span>
          <span className={`inline-flex items-center gap-1 font-medium ${status.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} /> {status.label}
          </span>
        </div>
        {pet.description && (
          <p className="mb-4 flex-1 text-[0.8rem] leading-relaxed text-charcoal/70 line-clamp-3">
            {pet.description}
          </p>
        )}
        <Link
          href={pet.status === "available" ? `/apply?puppy=${encodeURIComponent(pet.name)}` : "/puppies"}
          className="btn-ghost mt-auto w-full !px-4 !py-2.5 text-xs"
        >
          {pet.status === "available" ? `Reserve ${pet.name}` : "See all puppies"}
        </Link>
      </div>
    </article>
  );
}
