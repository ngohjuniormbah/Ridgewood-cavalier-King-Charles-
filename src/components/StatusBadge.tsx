import type { PetStatus } from "@/lib/types";

const styles: Record<PetStatus, string> = {
  available: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  reserved: "bg-amber-50 text-amber-700 ring-amber-600/20",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-600/20",
  sold: "bg-charcoal/5 text-charcoal/60 ring-charcoal/15",
};

const labels: Record<PetStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  cancelled: "Cancelled",
  sold: "In Forever Home",
};

export default function StatusBadge({ status }: { status: PetStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}

export { labels as statusLabels };
