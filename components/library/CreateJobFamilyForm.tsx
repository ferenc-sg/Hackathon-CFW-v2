"use client";

import { useState } from "react";
import { createJobFamily } from "@/app/actions/library";

export function CreateJobFamilyForm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn-secondary" onClick={() => setOpen(true)}>
        + Job family
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="card w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Create job family</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            <form
              action={async (fd) => {
                await createJobFamily(fd);
                setOpen(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="label">Name</label>
                <input name="name" className="input mt-1" placeholder="e.g. Data Science" required />
              </div>
              <div>
                <label className="label">Description (optional)</label>
                <textarea name="description" rows={2} className="input mt-1" />
              </div>
              <p className="text-xs text-slate-400">
                Created with no functional competencies yet — add and publish them from the grid.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
