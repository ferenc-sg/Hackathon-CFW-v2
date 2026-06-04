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

type ActorInfo = { id: string; name: string; role: string; brand: string };

export function Sidebar({
  actor,
  users,
  canAdmin,
}: {
  actor: ActorInfo | null;
  users: ActorInfo[];
  canAdmin: boolean;
}) {
  const pathname = usePathname();

  const nav: { section: string; items: NavItem[] }[] = [
    {
      section: "My career",
      items: [
        { href: "/", label: "My profile", icon: <UserIcon /> },
        { href: "/leveling", label: "Leveling", icon: <LadderIcon /> },
        { href: "/performance", label: "Performance assessment", icon: <ChartIcon />, placeholder: true },
      ],
    },
    {
      section: "Operate",
      items: [
        { href: "/library", label: "Framework library", icon: <GridIcon /> },
        ...(canAdmin ? [{ href: "/admin", label: "Admin", icon: <ShieldIcon /> }] : []),
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    // Admin owns the People profile pages too.
    if (href === "/admin") return pathname.startsWith("/admin") || pathname.startsWith("/people");
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="px-5 py-5">
        {/* saas.group logo — swap public/saas-group-logo.svg with the official asset to update. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/saas-group-logo.svg" alt="saas.group" className="h-7 w-auto" />
        <div className="mt-2 text-xs text-slate-500">Career Framework · CFMS</div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {nav.map((group) => (
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

function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10" cy="6.5" r="3.2" />
      <path d="M3.5 17c0-3 2.9-5 6.5-5s6.5 2 6.5 5" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M10 2.5l6 2.2v4.6c0 3.6-2.5 6.6-6 7.7-3.5-1.1-6-4.1-6-7.7V4.7l6-2.2Z" strokeLinejoin="round" />
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
