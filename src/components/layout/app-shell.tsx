import type { ReactNode } from "react";
import { MobileNav, Sidebar } from "@/components/layout/nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen xl:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <MobileNav />
        <main className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 xl:py-8">
          <div className="premium-grid pointer-events-none fixed inset-0 -z-10" />
          <div className="animate-fade-up">
          {children}
          </div>
        </main>
      </div>
    </div>
  );
}
