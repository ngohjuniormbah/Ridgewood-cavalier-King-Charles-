"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, PawPrint, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "ridgewood_lead";
const SHOW_DELAY_MS = 18000; // first appearance after ~18s
const COOLDOWN_DAYS = 3; // if dismissed, don't show again for this long

type Status = "idle" | "sending" | "done" | "error";

function shouldShow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const data = JSON.parse(raw) as { subscribed?: boolean; dismissedAt?: number };
    if (data.subscribed) return false;
    if (data.dismissedAt) {
      const days = (Date.now() - data.dismissedAt) / (1000 * 60 * 60 * 24);
      return days >= COOLDOWN_DAYS;
    }
    return true;
  } catch {
    return true;
  }
}

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shouldShow()) return;
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function remember(data: { subscribed?: boolean; dismissedAt?: number }) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }

  function close() {
    setOpen(false);
    remember({ dismissedAt: Date.now() });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not submit");
      setStatus("done");
      remember({ subscribed: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-lift"
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/10 text-ink transition hover:bg-ink/20"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header band */}
            <div className="hero-gradient px-8 py-8 text-center text-cream">
              <span className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cream/15">
                <PawPrint className="h-6 w-6 text-gold-soft" />
              </span>
              <h2 className="heading-serif text-2xl">Be first to know</h2>
              <p className="mt-1 text-sm text-cream/80">
                Join our waiting list and we&apos;ll email you the moment our next litter
                is ready to reserve.
              </p>
            </div>

            <div className="p-7">
              {status === "done" ? (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                  <h3 className="font-serif text-xl text-ink">You&apos;re on the list!</h3>
                  <p className="text-sm text-charcoal/70">
                    Thank you — we&apos;ll be in touch as soon as new puppies are available.
                  </p>
                  <button onClick={() => setOpen(false)} className="btn-primary mt-2">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-3">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-charcoal/15 bg-cream px-4 py-3 text-sm outline-none focus:border-chestnut focus:ring-2 focus:ring-chestnut/20"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full rounded-xl border border-charcoal/15 bg-cream px-4 py-3 text-sm outline-none focus:border-chestnut focus:ring-2 focus:ring-chestnut/20"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone number (optional)"
                    className="w-full rounded-xl border border-charcoal/15 bg-cream px-4 py-3 text-sm outline-none focus:border-chestnut focus:ring-2 focus:ring-chestnut/20"
                  />
                  {status === "error" && (
                    <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full disabled:opacity-60"
                  >
                    {status === "sending" ? "Joining…" : "Notify me"}
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="w-full text-center text-xs text-charcoal/50 hover:text-charcoal"
                  >
                    No thanks
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
