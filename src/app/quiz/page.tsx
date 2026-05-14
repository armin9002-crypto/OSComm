"use client";

import { CheckCircle2, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { quizQuestions } from "@/data/seed";
import type { Category } from "@/types";
import { useProgress } from "@/lib/hooks";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

const categories: Category[] = ["Foundations", "Structure", "Storytelling", "Psychology", "Persuasion", "Delivery", "Executive", "Rhetoric"];

export default function QuizPage() {
  const { recordQuiz } = useProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const visibleQuestions = useMemo(
    () =>
      quizQuestions.filter((question) => {
        const matchesCategory = category === "All" || question.category === category;
        const matchesQuery = [question.prompt, question.scenario, question.explanation, ...question.options]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      }),
    [category, query]
  );

  const score = useMemo(
    () => visibleQuestions.filter((question) => answers[question.id] === question.correctIndex).length,
    [answers, visibleQuestions]
  );
  const totalXp = visibleQuestions.reduce((sum, question) => sum + question.xp, 0);

  function submit() {
    setSubmitted(true);
    recordQuiz(`knowledge-check-${category.toString().toLowerCase()}`, score, visibleQuestions.length, Math.round(totalXp * (score / visibleQuestions.length)));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <>
      <PageHeader
        eyebrow="Knowledge Check"
        title="Test judgment, not trivia."
        description={`${quizQuestions.length} scenario-based questions test communication judgment across clarity, cognitive load, executive readiness, persuasion, rhetoric, and delivery.`}
      />

      <Card className="mb-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              reset();
            }}
            placeholder="Search questions, scenarios, or explanations"
            className="w-full rounded-md border border-line bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-gold/50"
          />
          <div className="flex flex-wrap gap-2">
            {(["All", ...categories] as const).map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCategory(item);
                  reset();
                }}
                className={`rounded-md border px-3 py-2 text-sm transition ${
                  category === item ? "border-gold/60 bg-gold/15 text-gold" : "border-line bg-white/[0.03] text-white/58 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">{visibleQuestions.length} questions in this set</p>
      </Card>

      <div className="space-y-5">
        {visibleQuestions.map((question, index) => (
          <Card key={question.id}>
            <p className="text-sm text-white/42">Question {index + 1} · {question.category}</p>
            <h2 className="mt-3 text-xl font-semibold text-chalk">{question.prompt}</h2>
            {question.scenario && <p className="mt-3 text-sm leading-6 text-muted">{question.scenario}</p>}
            <div className="mt-5 grid gap-3">
              {question.options.map((option, optionIndex) => {
                const selected = answers[question.id] === optionIndex;
                const correct = submitted && question.correctIndex === optionIndex;
                const wrong = submitted && selected && !correct;
                return (
                  <button
                    key={option}
                    disabled={submitted}
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                    className={`rounded-lg border p-4 text-left text-sm leading-6 transition ${
                      correct
                        ? "border-sage/60 bg-sage/15 text-white"
                        : wrong
                          ? "border-rose-300/60 bg-rose-300/10 text-white"
                          : selected
                            ? "border-gold/60 bg-gold/10 text-white"
                            : "border-line bg-white/[0.03] text-white/62 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {submitted && <p className="mt-4 text-sm leading-6 text-muted">{question.explanation}</p>}
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        {submitted ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-chalk">Score: {score}/{visibleQuestions.length}</h2>
              <p className="mt-2 text-sm text-muted">XP awarded based on score. Review the explanations, then try again when useful.</p>
            </div>
            <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-4 py-3 text-sm text-white transition hover:bg-white/8">
              <RotateCcw size={17} />
              Reset
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted">{Object.keys(answers).length}/{visibleQuestions.length} answered</p>
            <button
              disabled={visibleQuestions.length === 0 || Object.keys(answers).length !== visibleQuestions.length}
              onClick={submit}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-gold disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-white/45"
            >
              <CheckCircle2 size={17} />
              Submit answers
            </button>
          </div>
        )}
      </Card>
    </>
  );
}
