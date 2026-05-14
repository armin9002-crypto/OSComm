import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  detail,
  icon: Icon
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="min-h-32">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-chalk">{value}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
        </div>
        <span className="rounded-md border border-gold/20 bg-gold/10 p-2 text-gold">
          <Icon size={18} />
        </span>
      </div>
    </Card>
  );
}
