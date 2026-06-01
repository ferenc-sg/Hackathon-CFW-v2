"use client";

import { useState } from "react";
import { saveDraft, publishExpectation, discardDraft } from "@/app/actions/library";
import { SubmitButton } from "@/components/ui/SubmitButton";

export type CellData = {
  id: string;
  bullets: string[];
  draftBullets: string[] | null;
  status: string;
  version: number;
};

// A single level cell. Visibility is driven by the row's `open` state (toggled
// from the competency name); when the row is collapsed the cell is blank.
export function GridCell({
  cell,
  open,
  canEdit,
  canPublish,
  draftMode,
}: {
  cell: CellData | null;
  open: boolean;
  canEdit: boolean;
  canPublish: boolean;
  draftMode: boolean;
}) {
  const [editing, setEditing] = useState(false);

  if (!open) {
    return <td className="border border-slate-100 align-top" />;
  }
  if (!cell) {
    return <td className="border border-slate-100 bg-slate-50/50 px-3 py-2 align-top text-xs text-slate-300">—</td>;
  }

  const hasDraft = cell.draftBullets !== null;

  return (
    <td className="border border-slate-100 px-3 py-2 align-top">
      <div className="space-y-2">
        {!editing && (
          <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-slate-700">
            {cell.bullets.length === 0 && <li className="list-none text-slate-300">—</li>}
            {cell.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {hasDraft && !editing && !draftMode && (
          <div className="rounded-md border border-[#F04E23]/20 bg-[#FDE8E3] p-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#C44220]">
              Pending draft (preview)
            </div>
            <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-[#2E2B27]">
              {cell.draftBullets!.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            {canPublish && (
              <div className="mt-2 flex gap-2">
                <form action={publishExpectation}>
                  <input type="hidden" name="expectationId" value={cell.id} />
                  <SubmitButton className="btn-primary px-2 py-1 text-xs" pendingText="Publishing…">Publish</SubmitButton>
                </form>
                <form action={discardDraft}>
                  <input type="hidden" name="expectationId" value={cell.id} />
                  <SubmitButton className="btn-ghost px-2 py-1 text-xs" pendingText="…">Discard</SubmitButton>
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

        {canEdit && !draftMode && !editing && (
          <button onClick={() => setEditing(true)} className="text-[11px] font-medium text-brand-600 hover:underline">
            Edit
          </button>
        )}
      </div>
    </td>
  );
}
