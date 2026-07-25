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
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={`${pet.name}, a ${pet.colour} Cavalier King Charles Spaniel`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-serif text-2xl font-semibold text-ink">{pet.name}</h3>
          <span className="text-sm font-semibold text-chestnut">
            ${pet.price.toLocaleString()}
          </span>
        </div>
        <div className="mb-4 flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-caramel">
            <PawPrint className="h-4 w-4" /> {pet.colour}
          </span>
          <span className={`inline-flex items-center gap-1.5 font-medium ${status.text}`}>
            <span className={`h-2 w-2 rounded-full ${status.dot}`} /> {status.label}
          </span>
        </div>
        {pet.description && (
          <p className="mb-6 flex-1 text-sm leading-relaxed text-charcoal/70 line-clamp-4">
            {pet.description}
          </p>
        )}
        <Link
          href={pet.status === "available" ? `/apply?puppy=${encodeURIComponent(pet.name)}` : "/puppies"}
          className="btn-ghost mt-auto w-full"
        >
          {pet.status === "available" ? `Reserve ${pet.name}` : "See all puppies"}
        </Link>
      </div>
    </article>
  );
}
