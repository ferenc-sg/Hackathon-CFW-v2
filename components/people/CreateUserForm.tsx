"use client";

import { useState } from "react";
import { createUser } from "@/app/actions/profile";
import { Role, ROLE_LABELS } from "@/lib/enums";

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
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="card w-full max-w-lg p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Register a new user</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
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
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Permission level</label>
                  <select name="role" className="input mt-1" defaultValue={Role.TEAM_MEMBER}>
                    {Object.values(Role).map((r) => (
                      <option key={r} value={r}>
                        {ROLE_LABELS[r]}
                      </option>
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
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Manager</label>
                  <select name="managerId" className="input mt-1" defaultValue="">
                    <option value="">— none —</option>
                    {managers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Competencies are auto-assigned from the Library via the read contract; onboarding
                to-dos are created automatically.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create user
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
