"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Trash2, Check } from "lucide-react";
import type { Lead } from "@/lib/types";
import { deleteItem, updateItem } from "./api";

export default function LeadsManager({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function toggleRead(lead: Lead) {
    setBusy(lead.id);
    await updateItem("leads", lead.id, { read: !lead.read });
    router.refresh();
    setBusy(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this lead?")) return;
    setBusy(id);
    await deleteItem("leads", id);
    router.refresh();
    setBusy(null);
  }

  function exportCsv() {
    const rows = [
      ["Name", "Email", "Phone", "Received"],
      ...leads.map((l) => [l.name, l.email, l.phone, new Date(l.createdAt).toLocaleString()]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "ridgewood-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (leads.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-charcoal/20 p-10 text-center text-sm text-charcoal/60">
        No leads yet. When visitors sign up through the &ldquo;Be first to know&rdquo; popup,
        they&apos;ll appear here.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-charcoal/60">{leads.length} waiting-list sign-up(s)</p>
        <button onClick={exportCsv} className="btn-ghost">Export CSV</button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-soft">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className={`flex flex-wrap items-center gap-3 border-b border-charcoal/5 p-4 last:border-0 ${
              lead.read ? "" : "bg-chestnut/5"
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-ink">{lead.name}</p>
                {!lead.read && (
                  <span className="rounded-full bg-chestnut px-2 py-0.5 text-[0.6rem] font-semibold text-cream">
                    New
                  </span>
                )}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-charcoal/60">
                <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1 hover:text-chestnut">
                  <Mail className="h-3 w-3" /> {lead.email}
                </a>
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1 hover:text-chestnut">
                    <Phone className="h-3 w-3" /> {lead.phone}
                  </a>
                )}
                <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <button
              onClick={() => toggleRead(lead)}
              disabled={busy === lead.id}
              className="inline-flex items-center gap-1.5 rounded-lg border border-charcoal/15 px-3 py-1.5 text-xs font-medium text-charcoal/70 hover:border-chestnut hover:text-chestnut"
            >
              <Check className="h-3.5 w-3.5" /> {lead.read ? "Unread" : "Read"}
            </button>
            <button
              onClick={() => remove(lead.id)}
              disabled={busy === lead.id}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-charcoal/50 hover:bg-rose-50 hover:text-rose-600"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
