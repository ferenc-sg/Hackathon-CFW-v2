"use client";

import { useState } from "react";
import { createCompetency, updateCompetency } from "@/app/actions/library";
import { Modal } from "@/components/ui/Modal";
import { SubmitButton } from "@/components/ui/SubmitButton";

type LevelOpt = { code: string; label: string };
type FamilyOpt = { id: string; name: string };

export function CompetencyForm({
  mode,
  triggerLabel,
  triggerClassName = "btn-secondary",
  families,
  levels,
  defaultFamilyId = "",
  competencyId,
  initial,
}: {
  mode: "create" | "edit";
  triggerLabel: string;
  triggerClassName?: string;
  families: FamilyOpt[];
  levels: LevelOpt[];
  defaultFamilyId?: string;
  competencyId?: string;
  initial?: {
    name: string;
    description: string | null;
    jobFamilyId: string | null;
    perLevel: Record<string, string[]>;
  };
}) {
  const [open, setOpen] = useState(false);
  const action = mode === "create" ? createCompetency : updateCompetency;

  return (
    <>
      <button className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={mode === "create" ? "New competency" : "Edit draft competency"}
        maxWidth="max-w-2xl"
      >
            <form
              action={async (fd) => {
                await action(fd);
                setOpen(false);
              }}
              className="space-y-4"
            >
              {mode === "edit" && <input type="hidden" name="competencyId" value={competencyId} />}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="label">Competency name</label>
                  <input name="name" defaultValue={initial?.name ?? ""} className="input mt-1" required />
                </div>
                <div>
                  <label className="label">Job family</label>
                  <select
                    name="jobFamilyId"
                    defaultValue={initial?.jobFamilyId ?? defaultFamilyId}
                    className="input mt-1"
                    required
                    disabled={mode === "edit"}
                  >
                    <option value="">Select a job family…</option>
                    {families.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                  {mode === "edit" && (
                    <input type="hidden" name="jobFamilyId" value={initial?.jobFamilyId ?? ""} />
                  )}
                </div>
              </div>

              <div>
                <label className="label">Description (optional)</label>
                <textarea name="description" rows={2} defaultValue={initial?.description ?? ""} className="input mt-1" />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Level descriptions — one expectation per line
                </p>
                {levels.map((l) => (
                  <div key={l.code}>
                    <label className="label">
                      {l.code} · {l.label}
                    </label>
                    <textarea
                      name={`bullets_${l.code}`}
                      rows={3}
                      defaultValue={(initial?.perLevel?.[l.code] ?? []).join("\n")}
                      className="input mt-1 text-sm leading-relaxed"
                      placeholder="One expectation per line"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <SubmitButton name="publish" value="" className="btn-secondary" pendingText="Saving…">
                  Save draft
                </SubmitButton>
                <SubmitButton name="publish" value="1" className="btn-primary" pendingText="Publishing…">
                  Publish
                </SubmitButton>
              </div>
            </form>
      </Modal>
    </>
  );
}
