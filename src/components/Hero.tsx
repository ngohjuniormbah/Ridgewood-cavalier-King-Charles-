"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Animated brown / parent-colour gradient background (no photo) */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/60" />
        {/* soft moving glows in the parent-dog tones */}
        <motion.div
          aria-hidden
          className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-caramel/25 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-chestnut/30 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-page flex min-h-[80vh] items-center py-24">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="heading-serif text-5xl text-cream sm:text-6xl lg:text-7xl"
          >
            Loved before they
            <span className="block text-gold-soft">ever come home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85"
          >
            Gentle, health-tested Cavalier King Charles Spaniels raised underfoot in
            our family home. A signed contract, full health records and lifetime
            breeder support come with every puppy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link href="/apply" className="btn-gold">
              Apply to Adopt
            </Link>
            <Link href="/puppies" className="btn-outline">
              View available puppies <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
