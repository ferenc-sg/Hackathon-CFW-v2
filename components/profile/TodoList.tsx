"use client";

import { useState } from "react";
import { toggleTodo, addTodo } from "@/app/actions/profile";

type Todo = {
  id: string;
  title: string;
  triggerType: string;
  completedAt: string | null;
};

const TRIGGER_LABEL: Record<string, string> = {
  ONBOARDING: "Onboarding",
  CYCLE: "Cycle",
  MANUAL: "Manual",
};

export function TodoList({
  todos,
  profileUserId,
  canComplete,
  canAdd,
}: {
  todos: Todo[];
  profileUserId: string;
  canComplete: boolean;
  canAdd: boolean;
}) {
  const [showCompleted, setShowCompleted] = useState(false);
  const open = todos.filter((t) => !t.completedAt);
  const done = todos.filter((t) => t.completedAt);

  return (
    <div className="space-y-3">
      {open.length === 0 && done.length === 0 && (
        <p className="text-sm text-slate-400">No to-dos.</p>
      )}

      <ul className="space-y-2">
        {open.map((t) => (
          <li key={t.id} className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2">
            {canComplete ? (
              <form action={toggleTodo}>
                <input type="hidden" name="todoId" value={t.id} />
                <button
                  type="submit"
                  aria-label="Mark complete"
                  className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300 hover:border-brand-500"
                />
              </form>
            ) : (
              <span className="h-5 w-5 rounded-full border-2 border-slate-200" />
            )}
            <span className="flex-1 text-sm text-slate-700">{t.title}</span>
            <span className="badge bg-slate-100 text-slate-500">{TRIGGER_LABEL[t.triggerType]}</span>
          </li>
        ))}
      </ul>

      {canAdd && (
        <form action={addTodo} className="flex gap-2 pt-1">
          <input type="hidden" name="userId" value={profileUserId} />
          <input name="title" placeholder="Add a to-do…" className="input" required />
          <button type="submit" className="btn-secondary whitespace-nowrap">
            Add
          </button>
        </form>
      )}

      {done.length > 0 && (
        <div className="pt-1">
          <button
            onClick={() => setShowCompleted((s) => !s)}
            className="text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            {showCompleted ? "▾" : "▸"} Completed ({done.length})
          </button>
          {showCompleted && (
            <ul className="mt-2 space-y-2">
              {done.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  {canComplete ? (
                    <form action={toggleTodo}>
                      <input type="hidden" name="todoId" value={t.id} />
                      <button
                        type="submit"
                        aria-label="Mark incomplete"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0e7d51] text-white"
                      >
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
                          <path d="M6.5 10.6 3.9 8l-1 1 3.6 3.6 7-7-1-1z" />
                        </svg>
                      </button>
                    </form>
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-300" />
                  )}
                  <span className="flex-1 text-sm text-slate-400 line-through">{t.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
