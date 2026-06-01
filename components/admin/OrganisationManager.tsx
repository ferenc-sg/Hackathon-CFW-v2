"use client";

import { useState } from "react";
import { createBrand, renameBrand, archiveBrand } from "@/app/actions/admin";

type Brand = { id: string; name: string; userCount: number };

export function OrganisationManager({ brands }: { brands: Brand[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Brand / Team</th>
              <th className="px-5 py-3 font-medium">Members</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {brands.map((b) => (
              <tr key={b.id} className="align-middle">
                <td className="px-5 py-3">
                  {editingId === b.id ? (
                    <form
                      action={async (fd) => {
                        await renameBrand(fd);
                        setEditingId(null);
                      }}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="brandId" value={b.id} />
                      <input name="name" defaultValue={b.name} className="input !w-auto py-1" required />
                      <button className="btn-primary px-2 py-1 text-xs">Save</button>
                      <button type="button" onClick={() => setEditingId(null)} className="btn-ghost px-2 py-1 text-xs">
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <span className="font-medium text-slate-800">{b.name}</span>
                  )}
                </td>
                <td className="px-5 py-3 text-slate-600">{b.userCount}</td>
                <td className="px-5 py-3 text-right">
                  {editingId !== b.id && (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingId(b.id)} className="btn-ghost px-2 py-1 text-xs">
                        Edit
                      </button>
                      <form action={archiveBrand}>
                        <input type="hidden" name="brandId" value={b.id} />
                        <button
                          className="btn-ghost px-2 py-1 text-xs text-[#C44220] disabled:opacity-40"
                          disabled={b.userCount > 0}
                          title={b.userCount > 0 ? "Reassign members before removing" : "Remove brand"}
                        >
                          Remove
                        </button>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-slate-400">No brands yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <form action={createBrand} className="flex gap-2">
        <input name="name" placeholder="New brand / team name…" className="input" required />
        <button className="btn-primary whitespace-nowrap">+ Add brand</button>
      </form>
    </div>
  );
}
