"use client";

import { useState } from "react";
import { saveDraft, publishExpectation, discardDraft } from "@/app/actions/library";

export type CellData = {
  id: string;
  bullets: string[];
  draftBullets: string[] | null;
  status: string;
  version: number;
};

export function GridCell({
  cell,
  expandedAll,
  canEdit,
  canPublish,
}: {
  cell: CellData | null;
  expandedAll: boolean;
  canEdit: boolean;
  canPublish: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const open = expanded || expandedAll;

  if (!cell) {
    return <td className="border border-slate-100 bg-slate-50/50 px-3 py-2 align-top text-xs text-slate-300">—</td>;
  }

  const hasDraft = cell.draftBullets !== null;

  return (
    <td className="border border-slate-100 px-3 py-2 align-top">
      <div className="flex items-start justify-between gap-1">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-left text-[11px] font-medium text-slate-400 hover:text-slate-600"
        >
          {open ? "▾" : "▸"} {cell.bullets.length} {cell.bullets.length === 1 ? "point" : "points"}
        </button>
        {hasDraft && (
          <span className="badge bg-yellow-100 text-yellow-800" title="Unpublished draft pending">
            ● draft
          </span>
        )}
      </div>

      {open && (
        <div className="mt-1.5 space-y-2">
          {!editing && (
            <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-slate-700">
              {cell.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}

          {hasDraft && !editing && (
            <div className="rounded-md border border-yellow-200 bg-yellow-50 p-2">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-yellow-700">
                Pending draft (preview)
              </div>
              <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-yellow-900">
                {cell.draftBullets!.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {canPublish && (
                <div className="mt-2 flex gap-2">
                  <form action={publishExpectation}>
                    <input type="hidden" name="expectationId" value={cell.id} />
                    <button className="btn-primary px-2 py-1 text-xs">Publish</button>
                  </form>
                  <form action={discardDraft}>
                    <input type="hidden" name="expectationId" value={cell.id} />
                    <button className="btn-ghost px-2 py-1 text-xs">Discard</button>
                  </form>
                </div>
              )}
            </div>
          )}

          {editing && (
            <form
              action={async (fd) => {
                await saveDraft(fd);
                setEditing(false);
              }}
              className="space-y-1.5"
            >
              <input type="hidden" name="expectationId" value={cell.id} />
              <textarea
                name="bullets"
                rows={Math.max(4, (cell.draftBullets ?? cell.bullets).length + 1)}
                defaultValue={(cell.draftBullets ?? cell.bullets).join("\n")}
                className="input text-xs leading-relaxed"
                placeholder="One bullet per line"
              />
              <div className="flex gap-2">
                <button className="btn-primary px-2 py-1 text-xs">Save draft</button>
                <button type="button" onClick={() => setEditing(false)} className="btn-ghost px-2 py-1 text-xs">
                  Cancel
                </button>
              </div>
            </form>
          )}

          {canEdit && !editing && (
            <button onClick={() => setEditing(true)} className="text-[11px] font-medium text-brand-600 hover:underline">
              Edit
            </button>
          )}

          <div className="text-[10px] text-slate-300">v{cell.version}</div>
        </div>
      )}
    </td>
  );
}
