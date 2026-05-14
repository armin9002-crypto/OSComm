"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { principles } from "@/data/seed";
import type { Category } from "@/types";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { CategoryPill } from "@/components/category-pill";

const filters: Category[] = ["Foundations", "Structure", "Storytelling", "Psychology", "Persuasion", "Delivery", "Executive", "Rhetoric"];

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");

  const filtered = useMemo(
    () =>
      principles.filter((principle) => {
        const matchesQuery = [principle.title, principle.summary, principle.detail]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === "All" || principle.category === category;
        return matchesQuery && matchesCategory;
      }),
    [query, category]
  );

  return (
    <>
      <PageHeader
        eyebrow="Principle Library"
        title="A searchable index of communication leverage."
        description={`${principles.length} principles across structure, psychology, persuasion, delivery, executive communication, rhetoric, and story. Use the library when you need a principle, not a script.`}
      />

      <Card className="mb-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search principles, examples, or concepts"
              className="w-full rounded-md border border-line bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-gold/50"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {(["All", ...filters] as const).map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-md border px-3 py-2 text-sm transition ${
                  category === item ? "border-gold/60 bg-gold/15 text-gold" : "border-line bg-white/[0.03] text-white/58 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">{filtered.length} principles shown</p>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((principle) => (
          <Link key={principle.id} href={`/principles/${principle.id}`} className="group block">
            <Card className="h-full">
              <div className="flex items-center justify-between gap-3">
                <CategoryPill category={principle.category} />
                <span className="text-xs text-white/42">{principle.difficulty}</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-chalk transition group-hover:text-gold">{principle.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{principle.summary}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/35">{principle.relatedLessonIds.length} related lessons</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
