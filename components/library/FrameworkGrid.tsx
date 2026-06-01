"use client";

import { useState } from "react";
import { GridCell, type CellData } from "./GridCell";
import { ProvenanceBadge } from "@/components/Badges";
import { forkCompetency } from "@/app/actions/library";

export type GridRow = {
  competencyId: string;
  name: string;
  description: string | null;
  provenance: string;
  brandName: string | null;
  canEdit: boolean;
  canPublish: boolean;
  isFork: boolean;
  overridesBaselineName?: string;
  canFork: boolean;
  cells: Record<string, CellData | null>;
};

export type GridColumn = { code: string; label: string; track: string };

export function FrameworkGrid({
  columns,
  rows,
  currentBrandId,
}: {
  columns: GridColumn[];
  rows: GridRow[];
  currentBrandId: string | null;
}) {
  const [expandedAll, setExpandedAll] = useState(false);

  // Insert a visual divider header between IC and M columns when both present.
  const tracks = Array.from(new Set(columns.map((c) => c.track)));

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
        <span className="text-xs text-slate-400">
          {rows.length} competenc{rows.length === 1 ? "y" : "ies"} · {columns.length} levels
        </span>
        <button onClick={() => setExpandedAll((e) => !e)} className="btn-ghost px-2 py-1 text-xs">
          {expandedAll ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            {tracks.length > 1 && (
              <tr>
                <th className="sticky left-0 z-10 bg-white"></th>
                {tracks.map((t) => (
                  <th
                    key={t}
                    colSpan={columns.filter((c) => c.track === t).length}
                    className="border-b border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400"
                  >
                    {t === "IC" ? "Individual Contributor" : "Manager"} track
                  </th>
                ))}
              </tr>
            )}
            <tr className="bg-slate-50">
              <th className="sticky left-0 z-10 w-56 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Competency
              </th>
              {columns.map((c) => (
                <th
                  key={c.code}
                  className="min-w-[180px] border-b border-l border-slate-200 px-3 py-2.5 text-left"
                >
                  <div className="text-xs font-bold text-slate-700">{c.code}</div>
                  <div className="text-[10px] font-normal text-slate-400">{c.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.competencyId} className={row.isFork ? "bg-amber-50/40" : ""}>
                <td className="sticky left-0 z-10 w-56 border-b border-slate-100 bg-white px-4 py-2.5 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-slate-800">{row.name}</span>
                    <ProvenanceBadge provenance={row.provenance} />
                    {row.brandName && (
                      <span className="text-[10px] text-slate-400">{row.brandName}</span>
                    )}
                    {row.overridesBaselineName && (
                      <span className="text-[10px] italic text-amber-600">
                        overrides baseline for this brand
                      </span>
                    )}
                    {row.description && (
                      <span className="text-[11px] leading-snug text-slate-400">{row.description}</span>
                    )}
                    {row.canFork && currentBrandId && (
                      <form action={forkCompetency} className="mt-1">
                        <input type="hidden" name="competencyId" value={row.competencyId} />
                        <input type="hidden" name="brandId" value={currentBrandId} />
                        <button className="text-[11px] font-medium text-brand-600 hover:underline">
                          Fork for brand →
                        </button>
                      </form>
                    )}
                  </div>
                </td>
                {columns.map((c) => (
                  <GridCell
                    key={c.code}
                    cell={row.cells[c.code] ?? null}
                    expandedAll={expandedAll}
                    canEdit={row.canEdit}
                    canPublish={row.canPublish}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
