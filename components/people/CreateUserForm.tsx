"use client";

import { useState } from "react";
import { createUser } from "@/app/actions/profile";
import { Role, ROLE_LABELS } from "@/lib/enums";
import { Modal } from "@/components/ui/Modal";
import { SubmitButton } from "@/components/ui/SubmitButton";

type Opt = { id: string; name: string };

export function CreateUserForm({
  brands,
  families,
  managers,
}: {
  brands: Opt[];
  families: Opt[];
  managers: Opt[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        + New user
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Register a new user" maxWidth="max-w-lg">
        <form
          action={async (fd) => {
            await createUser(fd);
            setOpen(false);
          }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Name</label>
              <input name="name" className="input mt-1" required />
            </div>
            <div>
              <label className="label">Email</label>
              <input name="email" type="email" className="input mt-1" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Brand / Team</label>
              <select name="brandId" className="input mt-1" required>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Permission level</label>
              <select name="role" className="input mt-1" defaultValue={Role.TEAM_MEMBER}>
                {Object.values(Role).map((r) => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Job family</label>
              <select name="jobFamilyId" className="input mt-1" defaultValue="">
                <option value="">— none —</option>
                {families.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Manager</label>
              <select name="managerId" className="input mt-1" defaultValue="">
                <option value="">— none —</option>
                {managers.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Only people with the Manager role can be assigned as a manager. Competencies are
            auto-assigned from the Library via the read contract; onboarding to-dos are created
            automatically.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <SubmitButton pendingText="Creating…">Create user</SubmitButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
