import { Provenance, PROVENANCE_LABELS, ExpectationStatus } from "@/lib/enums";

const PROVENANCE_STYLES: Record<string, string> = {
  SHARED_BASELINE: "bg-slate-100 text-slate-600 border border-slate-200",
  BRAND_ADDON: "bg-violet-100 text-violet-700 border border-violet-200",
  BRAND_FORK: "bg-amber-100 text-amber-800 border border-amber-200",
  CUSTOM: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

export function ProvenanceBadge({ provenance }: { provenance: string }) {
  const isBaseline = provenance === Provenance.SHARED_BASELINE;
  return (
    <span className={`badge ${PROVENANCE_STYLES[provenance] ?? PROVENANCE_STYLES.CUSTOM}`}>
      {isBaseline && <LockIcon />}
      {PROVENANCE_LABELS[provenance as Provenance] ?? provenance}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const published = status === ExpectationStatus.PUBLISHED;
  return (
    <span
      className={`badge ${
        published
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-yellow-100 text-yellow-800 border border-yellow-200"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

export function RoleBadge({ label }: { label: string }) {
  return <span className="badge bg-brand-50 text-brand-700 border border-brand-100">{label}</span>;
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden>
      <path d="M8 1a3 3 0 0 0-3 3v2H4.5A1.5 1.5 0 0 0 3 7.5v5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 6H11V4a3 3 0 0 0-3-3Zm1.5 5h-3V4a1.5 1.5 0 0 1 3 0v2Z" />
    </svg>
  );
}
