"use client";

import { useState, useTransition } from "react";
import { createCycle, activateCycle, closeCycle } from "@/app/actions/self-levelling";

type Cycle = {
  id: string;
  label: string;
  startsAt: Date | string;
  endsAt: Date | string;
  isActive: boolean;
};

export function CycleManager({ cycles }: { cycles: Cycle[] }) {
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [activate, setActivate] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [creating, startCreate] = useTransition();
  const [activating, startActivate] = useTransition();
  const [closing, startClose] = useTransition();

  function fmt(d: Date | string) {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function handleCreate() {
    setError(null);
    startCreate(async () => {
      const fd = new FormData();
      fd.set("label", label);
      fd.set("startsAt", startsAt);
      fd.set("endsAt", endsAt);
      fd.set("activate", String(activate));
      try {
        await createCycle(fd);
        setLabel(""); setStartsAt(""); setEndsAt(""); setActivate(true);
        setShowForm(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to create cycle.");
      }
    });
  }

  function handleActivate(cycleId: string) {
    startActivate(async () => {
      const fd = new FormData();
      fd.set("cycleId", cycleId);
      await activateCycle(fd);
    });
  }

  function handleClose(cycleId: string) {
    startClose(async () => {
      const fd = new FormData();
      fd.set("cycleId", cycleId);
      await closeCycle(fd);
    });
  }

  return (
    <div className="card overflow-hidden mb-6">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Levelling Cycles</h3>
          <p className="text-xs text-slate-500 mt-0.5">HR admin · manage cycles visible to all users</p>
        </div>
        <button
          type="button"
          onClick={() => { setShowForm(!showForm); setError(null); }}
          className="btn-primary text-xs py-1 px-2.5"
        >
          {showForm ? "Cancel" : "+ New cycle"}
        </button>
      </div>

      {showForm && (
        <div className="px-5 py-4 border-b border-slate-200 bg-white space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-3 space-y-1">
              <label className="label">Cycle name</label>
              <input
                className="input"
                placeholder="e.g. H2 2026 — Performance Cycle"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="label">Start date</label>
              <input type="date" className="input" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="label">End date</label>
              <input type="date" className="input" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} />
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="rounded border-slate-300"
                  checked={activate}
                  onChange={(e) => setActivate(e.target.checked)}
                />
                Activate immediately
              </label>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCreate}
              disabled={creating || !label || !startsAt || !endsAt}
              className="btn-primary"
            >
              {creating ? "Creating…" : "Create cycle"}
            </button>
          </div>
        </div>
      )}

      {cycles.length === 0 ? (
        <div className="px-5 py-6 text-center text-sm text-slate-400">No cycles yet.</div>
      ) : (
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-2.5 font-medium">Name</th>
              <th className="px-5 py-2.5 font-medium">Period</th>
              <th className="px-5 py-2.5 font-medium">Status</th>
              <th className="px-5 py-2.5 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cycles.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-800">{c.label}</td>
                <td className="px-5 py-3 text-slate-500">
                  {fmt(c.startsAt)} – {fmt(c.endsAt)}
                </td>
                <td className="px-5 py-3">
                  {c.isActive ? (
                    <span className="badge bg-emerald-100 text-emerald-700">Active</span>
                  ) : (
                    <span className="badge bg-slate-100 text-slate-500">Inactive</span>
                  )}
                </td>
                <td className="px-5 py-3 text-right space-x-2">
                  {!c.isActive && (
                    <button
                      type="button"
                      onClick={() => handleActivate(c.id)}
                      disabled={activating}
                      className="btn-secondary text-xs py-1 px-2.5"
                    >
                      Activate
                    </button>
                  )}
                  {c.isActive && (
                    <button
                      type="button"
                      onClick={() => handleClose(c.id)}
                      disabled={closing}
                      className="btn-ghost text-xs py-1 px-2.5 text-slate-500"
                    >
                      Close cycle
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
