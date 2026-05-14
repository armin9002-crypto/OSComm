import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full border border-white/5 bg-black/28", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-sage via-signal to-gold shadow-[0_0_24px_rgba(208,173,106,0.24)] transition-all duration-700"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
