"use client";

import { useState } from "react";
import { createJobFamily } from "@/app/actions/library";
import { Modal } from "@/components/ui/Modal";
import { SubmitButton } from "@/components/ui/SubmitButton";

export function CreateJobFamilyForm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn-secondary" onClick={() => setOpen(true)}>
        + Job family
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Create job family" maxWidth="max-w-md">
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
            <SubmitButton pendingText="Creating…">Create</SubmitButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
