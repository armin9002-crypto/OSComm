"use client";

import { CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { frameworkTemplates } from "@/data/seed";
import { useProgress } from "@/lib/hooks";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

export default function BuilderPage() {
  const { progress, completeFramework } = useProgress();
  const [templateId, setTemplateId] = useState(frameworkTemplates[0].id);
  const [values, setValues] = useState<Record<string, string>>({});
  const template = frameworkTemplates.find((item) => item.id === templateId) ?? frameworkTemplates[0];
  const completed = progress?.completedFrameworkIds.includes(template.id) ?? false;

  const filledCount = useMemo(
    () => template.sections.filter((section) => values[section.id]?.trim()).length,
    [template.sections, values]
  );

  function selectTemplate(id: string) {
    setTemplateId(id);
    setValues({});
  }

  return (
    <>
      <PageHeader
        eyebrow="Framework Builder"
        title="Assemble the message before polishing the words."
        description="Choose a communication framework, fill each strategic block, and preview the finished structure in real time."
      />

      <div className="grid gap-6 xl:grid-cols-[0.36fr_0.64fr]">
        <Card className="h-fit">
          <h2 className="text-xl font-semibold text-white">Frameworks</h2>
          <div className="mt-5 space-y-3">
            {frameworkTemplates.map((item) => (
              <button
                key={item.id}
                onClick={() => selectTemplate(item.id)}
                className={`w-full rounded-lg border p-4 text-left transition ${
                  template.id === item.id ? "border-gold/60 bg-gold/10" : "border-line bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <p className="font-medium text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">{item.bestFor}</p>
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">{template.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/58">{template.description}</p>
              </div>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold">{template.xp} XP</span>
            </div>
          </Card>

          <div className="grid gap-4">
            {template.sections.map((section) => (
              <Card key={section.id}>
                <label className="block">
                  <span className="text-lg font-semibold text-white">{section.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-white/55">{section.guidance}</span>
                  <textarea
                    value={values[section.id] ?? ""}
                    onChange={(event) => setValues((current) => ({ ...current, [section.id]: event.target.value }))}
                    placeholder={section.placeholder}
                    className="mt-4 min-h-28 w-full resize-y rounded-md border border-line bg-black/25 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-gold/50"
                  />
                </label>
              </Card>
            ))}
          </div>

          <Card>
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Live Preview</h2>
                <p className="mt-2 text-sm text-white/50">{filledCount}/{template.sections.length} sections completed</p>
              </div>
              <button
                disabled={filledCount !== template.sections.length || completed}
                onClick={() => completeFramework(template.id, template.xp)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-gold disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-white/45"
              >
                <CheckCircle2 size={17} />
                {completed ? "XP awarded" : "Complete framework"}
              </button>
            </div>
            <div className="mt-6 space-y-4 rounded-lg border border-line bg-black/25 p-5">
              {template.sections.map((section) => (
                <div key={section.id}>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{section.label}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-white/72">
                    {values[section.id] || section.placeholder}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
