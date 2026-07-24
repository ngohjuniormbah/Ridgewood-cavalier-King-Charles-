import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import type { Pet } from "@/lib/types";
import StatusBadge from "./StatusBadge";

export default function PetCard({ pet }: { pet: Pet }) {
  const image = pet.images[0] ?? "/images/parent-belle-blenheim.jpg";
  const muted = pet.status === "sold" || pet.status === "cancelled";
  return (
    <article className="card group flex h-full flex-col hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={`${pet.name}, a ${pet.colour} Cavalier King Charles Spaniel ${pet.gender.toLowerCase()}`}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
            muted ? "grayscale-[35%]" : ""
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
        />
        <div className="absolute left-4 top-4">
          <StatusBadge status={pet.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-serif text-2xl font-semibold text-ink">{pet.name}</h3>
          <span className="text-sm font-semibold text-chestnut">
            ${pet.price.toLocaleString()}
          </span>
        </div>
        <p className="mb-4 inline-flex items-center gap-1.5 text-sm text-caramel">
          <PawPrint className="h-4 w-4" /> {pet.colour} · {pet.gender}
        </p>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-charcoal/70 line-clamp-4">
          {pet.description}
        </p>
        <Link
          href={pet.status === "available" ? "/contact" : "/puppies"}
          className="btn-ghost w-full"
        >
          {pet.status === "available" ? "Enquire about " + pet.name : "See all puppies"}
        </Link>
      </div>
    </article>
  );
}
