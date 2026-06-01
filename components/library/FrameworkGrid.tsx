"use client";

import { useState } from "react";
import { GridCell, type CellData } from "./GridCell";
import { ProvenanceBadge } from "@/components/Badges";
import { CompetencyForm } from "./CompetencyForm";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { forkCompetency, publishCompetency } from "@/app/actions/library";

export type GridRow = {
  competencyId: string;
  name: string;
  description: string | null;
  provenance: string;
  brandName: string | null;
  canEdit: boolean;
  canPublish: boolean;
  isFork: boolean;
  isDraft: boolean;
  overridesBaselineName?: string;
  canFork: boolean;
  draftData?: {
    name: string;
    description: string | null;
    jobFamilyId: string | null;
    perLevel: Record<string, string[]>;
  };
  cells: Record<string, CellData | null>;
};

export type GridColumn = { code: string; label: string; track: string };

export function FrameworkGrid({
  columns,
  rows,
  currentBrandId,
  families,
}: {
  columns: GridColumn[];
  rows: GridRow[];
  currentBrandId: string | null;
  families: { id: string; name: string }[];
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const levelOpts = columns.map((c) => ({ code: c.code, label: c.label }));
  const allOpen = rows.length > 0 && rows.every((r) => openIds.has(r.competencyId));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setOpenIds(allOpen ? new Set() : new Set(rows.map((r) => r.competencyId)));
  }

  const tracks = Array.from(new Set(columns.map((c) => c.track)));

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
        <span className="text-xs text-slate-400">
          {rows.length} competenc{rows.length === 1 ? "y" : "ies"} · {columns.length} levels
        </span>
        <button onClick={toggleAll} className="btn-ghost px-2 py-1 text-xs">
          {allOpen ? "Collapse all" : "Expand all"}
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
              <th className="sticky left-0 z-10 w-64 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
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
            {rows.map((row) => {
              const open = openIds.has(row.competencyId);
              return (
                <tr key={row.competencyId} className={row.isFork ? "bg-amber-50/40" : ""}>
                  <td className="sticky left-0 z-10 w-64 border-b border-slate-100 bg-white px-4 py-2.5 align-top">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => toggle(row.competencyId)}
                        className="flex items-start gap-1.5 text-left text-sm font-medium text-slate-800 hover:text-slate-950"
                      >
                        <span className="mt-0.5 text-slate-400">{open ? "▾" : "▸"}</span>
                        <span>{row.name}</span>
                      </button>
                      <div className="flex flex-wrap items-center gap-1 pl-5">
                        <ProvenanceBadge provenance={row.provenance} />
                        {row.isDraft && (
                          <span className="badge bg-[#FDE8E3] text-[#C44220]" title="Unpublished draft">
                            ● Draft
                          </span>
                        )}
                      </div>
                      {row.brandName && <span className="pl-5 text-[10px] text-slate-400">{row.brandName}</span>}
                      {row.overridesBaselineName && (
                        <span className="pl-5 text-[10px] italic text-[#C44220]">
                          overrides baseline for this brand
                        </span>
                      )}
                      {open && row.description && (
                        <span className="pl-5 text-[11px] leading-snug text-slate-400">{row.description}</span>
                      )}

                      <div className="flex flex-wrap gap-2 pl-5">
                        {row.canFork && currentBrandId && (
                          <form action={forkCompetency}>
                            <input type="hidden" name="competencyId" value={row.competencyId} />
                            <input type="hidden" name="brandId" value={currentBrandId} />
                            <SubmitButton className="text-[11px] font-medium text-brand-600 hover:underline" pendingText="Forking…">
                              Fork for brand →
                            </SubmitButton>
                          </form>
                        )}
                        {row.isDraft && row.canEdit && row.draftData && (
                          <CompetencyForm
                            mode="edit"
                            triggerLabel="Edit draft"
                            triggerClassName="text-[11px] font-medium text-brand-600 hover:underline"
                            families={families}
                            levels={levelOpts}
                            competencyId={row.competencyId}
                            initial={row.draftData}
                          />
                        )}
                        {row.isDraft && row.canPublish && (
                          <form action={publishCompetency}>
                            <input type="hidden" name="competencyId" value={row.competencyId} />
                            <SubmitButton className="text-[11px] font-medium text-[#0e7d51] hover:underline" pendingText="Publishing…">
                              Publish
                            </SubmitButton>
                          </form>
                        )}
                      </div>
                    </div>
                  </td>
                  {columns.map((c) => (
                    <GridCell
                      key={c.code}
                      cell={row.cells[c.code] ?? null}
                      open={open}
                      canEdit={row.canEdit}
                      canPublish={row.canPublish}
                      draftMode={row.isDraft}
                    />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
