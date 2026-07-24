"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PawPrint, Star, ImageIcon, LogOut, ExternalLink, Info, Inbox, Settings as SettingsIcon } from "lucide-react";
import type { SiteData, Settings } from "@/lib/types";
import PetsManager from "./PetsManager";
import ReviewsManager from "./ReviewsManager";
import GalleryManager from "./GalleryManager";
import MessagesManager from "./MessagesManager";
import SettingsManager from "./SettingsManager";

type Tab = "pets" | "reviews" | "gallery" | "messages" | "settings";

const tabs: { id: Tab; label: string; icon: typeof PawPrint }[] = [
  { id: "pets", label: "Puppies & Pets", icon: PawPrint },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "messages", label: "Applications", icon: Inbox },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export default function AdminDashboard({
  data,
  settings,
  persistent,
}: {
  data: SiteData;
  settings: Settings;
  persistent: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("pets");

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  const unread = data.messages.filter((m) => !m.read).length;
  const counts: Record<Tab, number | null> = {
    pets: data.pets.length,
    reviews: data.reviews.length,
    gallery: data.gallery.length,
    messages: unread || data.messages.length,
    settings: null,
  };

  return (
    <div>
      {/* Top bar */}
      <header className="border-b border-charcoal/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-mark.svg" alt="Ridgewood" width={40} height={40} className="h-10 w-10" />
            <div>
              <p className="font-serif text-lg leading-none text-ink">Ridgewood Admin</p>
              <p className="text-xs text-charcoal/50">Manage your website content</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="btn-ghost hidden sm:inline-flex">
              View site <ExternalLink className="h-4 w-4" />
            </Link>
            <button onClick={logout} className="btn-ghost">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {!persistent && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <Info className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              <strong>Preview mode.</strong> Changes are saved locally so you can try everything.
              To store content and uploads permanently online, add your Supabase keys in Vercel
              (see the README) — the dashboard then persists automatically.
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                tab === t.id
                  ? "bg-chestnut text-cream shadow-soft"
                  : "bg-white text-charcoal/70 ring-1 ring-charcoal/10 hover:ring-chestnut/40"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
              {counts[t.id] !== null && (
                <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${tab === t.id ? "bg-cream/20" : "bg-charcoal/5"}`}>
                  {counts[t.id]}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "pets" && <PetsManager pets={data.pets} />}
        {tab === "reviews" && <ReviewsManager reviews={data.reviews} />}
        {tab === "gallery" && <GalleryManager gallery={data.gallery} />}
        {tab === "messages" && <MessagesManager messages={data.messages} />}
        {tab === "settings" && <SettingsManager settings={settings} />}
      </div>
    </div>
  );
}
