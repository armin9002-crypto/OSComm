"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Boxes, Home, Library, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/paths", label: "Paths", icon: BookOpen },
  { href: "/library", label: "Library", icon: Library },
  { href: "/builder", label: "Builder", icon: Boxes },
  { href: "/progress", label: "Progress", icon: BarChart3 }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-line bg-ink/86 p-6 backdrop-blur xl:sticky xl:top-0 xl:block">
      <Brand />
      <nav className="mt-10 space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return <NavLink key={item.href} item={item} active={active} />;
        })}
      </nav>
      <div className="mt-10 rounded-lg border border-line bg-white/[0.04] p-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">Operating Principle</p>
        <p className="mt-3 text-sm leading-6 text-muted">
          The point of communication is not expression. It is transferred understanding.
        </p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/92 px-4 py-4 backdrop-blur xl:hidden">
      <div className="flex items-center justify-between">
        <Brand compact />
        <button
          className="rounded-md border border-line bg-white/5 p-2 text-white"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="mt-4 grid gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return <NavLink key={item.href} item={item} active={active} onClick={() => setOpen(false)} />;
          })}
        </nav>
      )}
    </header>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-sm font-semibold text-gold">
        OS
      </span>
      <span>
        <span className="block text-base font-semibold tracking-tight text-chalk">Communication OS</span>
        {!compact && <span className="text-xs uppercase tracking-[0.22em] text-muted/70">Mastery System</span>}
      </span>
    </Link>
  );
}

function NavLink({
  item,
  active,
  onClick
}: {
  item: (typeof navItems)[number];
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-3 text-sm transition",
        active
          ? "border border-gold/20 bg-gold/10 text-chalk shadow-quiet"
          : "text-muted hover:bg-white/[0.06] hover:text-chalk"
      )}
    >
      <Icon size={18} />
      {item.label}
    </Link>
  );
}
