"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActorSwitcher } from "./ActorSwitcher";
import { ROLE_LABELS, type Role } from "@/lib/enums";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  placeholder?: boolean;
};

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Operate",
    items: [
      { href: "/", label: "Dashboard", icon: <HomeIcon /> },
      { href: "/library", label: "Framework Library", icon: <GridIcon /> },
      { href: "/people", label: "People", icon: <UsersIcon /> },
      { href: "/leveling", label: "Leveling", icon: <LadderIcon /> },
    ],
  },
  {
    section: "Coming soon",
    items: [
      {
        href: "/performance",
        label: "Performance assessment",
        icon: <ChartIcon />,
        placeholder: true,
      },
    ],
  },
];

type ActorInfo = { id: string; name: string; role: string; brand: string };

export function Sidebar({
  actor,
  users,
}: {
  actor: ActorInfo | null;
  users: ActorInfo[];
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7B6FCC] font-bold text-white">
          CF
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-slate-900">Career Framework</div>
          <div className="text-xs text-slate-500">saas.group · CFMS</div>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {NAV.map((group) => (
          <div key={group.section}>
            <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {group.section}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-[#EDE9FC] text-[#5B52B0]"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className={active ? "text-[#7B6FCC]" : "text-slate-400"}>
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {item.placeholder && (
                        <span className="rounded bg-[#EDE9FC] px-1.5 py-0.5 text-[10px] font-medium text-[#5B52B0]">
                          Soon
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-3 border-t border-slate-200 px-4 py-4">
        {actor && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
              {actor.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-medium text-slate-900">{actor.name}</div>
              <div className="truncate text-xs text-slate-500">
                {ROLE_LABELS[actor.role as Role] ?? actor.role}
              </div>
            </div>
          </div>
        )}

        {actor && <ActorSwitcher users={users} currentId={actor.id} />}
      </div>
    </aside>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 9l7-6 7 6v8a1 1 0 0 1-1 1h-3v-5H7v5H4a1 1 0 0 1-1-1V9Z" strokeLinejoin="round" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="7" cy="6" r="3" />
      <path d="M2 17c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" strokeLinecap="round" />
      <path d="M13 4.2A3 3 0 0 1 13 10M14 12.8c2.2.5 4 2.2 4 4.2" strokeLinecap="round" />
    </svg>
  );
}
function LadderIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 2v16M14 2v16M6 6h8M6 10h8M6 14h8" strokeLinecap="round" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 3v14h14" strokeLinecap="round" />
      <path d="M6 13l3-4 3 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
