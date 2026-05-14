import type { Category } from "@/types";

const colorByCategory: Record<Category, string> = {
  Foundations: "border-sage/30 bg-sage/10 text-sage",
  Structure: "border-signal/30 bg-signal/10 text-signal",
  Psychology: "border-teal-300/30 bg-teal-300/10 text-teal-200",
  Persuasion: "border-gold/30 bg-gold/10 text-gold",
  Delivery: "border-rose-300/30 bg-rose-300/10 text-rose-200",
  Executive: "border-violet-300/30 bg-violet-300/10 text-violet-200",
  Storytelling: "border-amber-200/30 bg-amber-200/10 text-amber-100",
  Rhetoric: "border-copper/30 bg-copper/10 text-orange-200"
};

export function CategoryPill({ category }: { category: Category }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs ${colorByCategory[category]}`}>
      {category}
    </span>
  );
}
