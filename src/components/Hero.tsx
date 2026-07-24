"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/parent-winston-tricolour.jpg"
          alt="Tricolour Cavalier King Charles Spaniel parent dog at Ridgewood"
          fill
          priority
          className="animate-kenburns object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/40" />
      </div>

      <div className="container-page flex min-h-[88vh] items-center py-24">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            <ShieldCheck className="h-3.5 w-3.5" /> 2-Year Health Guarantee
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-serif text-5xl text-cream sm:text-6xl lg:text-7xl"
          >
            Loved before they
            <span className="block text-gold-soft">ever come home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80"
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
            <Link href="/guarantee" className="btn-gold">
              Our Guarantee
            </Link>
            <Link href="/contact" className="btn-outline">
              Book a Visit <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-cream/15 pt-8"
          >
            {[
              { value: "15+", label: "Years with the breed" },
              { value: "4", label: "Classic colours raised" },
              { value: "100%", label: "Home-raised puppies" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-3xl text-gold-soft">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-cream/60">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
