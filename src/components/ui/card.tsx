import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-lg border border-line bg-panel/72 p-5 shadow-quiet backdrop-blur transition duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/18 before:to-transparent hover:-translate-y-0.5 hover:border-white/20 hover:bg-panel/88",
        className
      )}
    >
      {children}
    </section>
  );
}
