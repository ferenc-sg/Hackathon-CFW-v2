"use client";

import { useRef } from "react";
import { setActor } from "@/app/actions/session";
import { ROLE_LABELS, type Role } from "@/lib/enums";

type Option = { id: string; name: string; role: string; brand: string };

export function ActorSwitcher({ users, currentId }: { users: Option[]; currentId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={setActor} className="space-y-1.5">
      <label className="label">Acting as (demo)</label>
      <select
        name="userId"
        defaultValue={currentId}
        onChange={() => formRef.current?.requestSubmit()}
        className="input"
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} — {ROLE_LABELS[u.role as Role] ?? u.role} · {u.brand}
          </option>
        ))}
      </select>
    </form>
  );
}
