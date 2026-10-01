"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "@/lib/types";

const CATEGORIES = ["All", "Puppies", "Parents", "Families", "Life at Ridgewood"] as const;

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-charcoal/60">
        Our gallery is being updated — please check back soon.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              filter === cat
                ? "bg-chestnut text-cream shadow-soft"
                : "bg-white text-charcoal/70 ring-1 ring-charcoal/10 hover:ring-chestnut/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {visible.map((item, i) => (
          <motion.button
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            onClick={() => setActive(item)}
            className="group relative block w-full overflow-hidden rounded-3xl bg-white shadow-soft"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={750}
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/0 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-left text-cream">
                <span className="block font-serif text-lg">{item.title}</span>
                {item.caption && <span className="text-sm text-cream/80">{item.caption}</span>}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-h-[85vh] max-w-3xl overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.image}
                alt={active.title}
                width={1000}
                height={1250}
                className="h-auto max-h-[75vh] w-auto object-contain"
              />
              <div className="bg-ink px-6 py-4 text-cream">
                <p className="font-serif text-lg">{active.title}</p>
                {active.caption && <p className="text-sm text-cream/70">{active.caption}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
