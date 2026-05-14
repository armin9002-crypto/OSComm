import type { Lesson, LearningPath, Principle } from "@/types";
import type { LessonSpec, PrincipleSeed } from "./types";
import { paths as foundationsPaths, lessonSpecs as foundationsLessonSpecs, principleSeeds as foundationsPrincipleSeeds } from "./foundations";
import { paths as structurePaths, lessonSpecs as structureLessonSpecs, principleSeeds as structurePrincipleSeeds } from "./structure";
import { paths as psychologyPaths, lessonSpecs as psychologyLessonSpecs, principleSeeds as psychologyPrincipleSeeds } from "./psychology";
import { paths as persuasionPaths, lessonSpecs as persuasionLessonSpecs, principleSeeds as persuasionPrincipleSeeds } from "./persuasion";
import { paths as deliveryPaths, lessonSpecs as deliveryLessonSpecs, principleSeeds as deliveryPrincipleSeeds } from "./delivery";
import { paths as executivePaths, lessonSpecs as executiveLessonSpecs, principleSeeds as executivePrincipleSeeds } from "./executive";
import { principleSeeds as rhetoricPrincipleSeeds } from "./rhetoric";

export { quizQuestions } from "./assessments";
export { frameworkTemplates } from "./frameworks";

export const learningPaths: LearningPath[] = [
  ...foundationsPaths,
  ...structurePaths,
  ...psychologyPaths,
  ...persuasionPaths,
  ...deliveryPaths,
  ...executivePaths
];

const lessonSpecs: LessonSpec[] = [
  ...foundationsLessonSpecs,
  ...structureLessonSpecs,
  ...psychologyLessonSpecs,
  ...persuasionLessonSpecs,
  ...deliveryLessonSpecs,
  ...executiveLessonSpecs
];

const principleSeeds: PrincipleSeed[] = [
  ...foundationsPrincipleSeeds,
  ...structurePrincipleSeeds,
  ...psychologyPrincipleSeeds,
  ...persuasionPrincipleSeeds,
  ...deliveryPrincipleSeeds,
  ...executivePrincipleSeeds,
  ...rhetoricPrincipleSeeds
];

const baseLessons: Lesson[] = lessonSpecs.map((lesson, index) => ({
  id: lesson.id,
  pathId: lesson.pathId,
  title: lesson.title,
  category: lesson.category,
  readTime: lesson.readTime,
  preview: lesson.preview,
  content: [
    lesson.insight,
    `Practice: ${lesson.practice}`,
    "Use the idea as a design constraint, not as a speaking trick. The goal is to make the listener's next mental move easier, more accurate, and more useful."
  ],
  whyItMatters: `This matters because ${lesson.insight.charAt(0).toLowerCase()}${lesson.insight.slice(1)}`,
  realWorldExample: lesson.example,
  commonMistake: lesson.mistake,
  keyTakeaway: lesson.takeaway,
  reflectionPrompt: lesson.reflection,
  relatedPrincipleIds: [],
  xp: 90 + (index % 4) * 15
}));

export const principles: Principle[] = principleSeeds.map(({ lessonHints, ...principle }) => ({
  ...principle,
  relatedLessonIds: lessonHints
}));

const lessonPrincipleMap = new Map<string, string[]>();
principles.forEach((principle) => {
  principle.relatedLessonIds.forEach((lessonId) => {
    lessonPrincipleMap.set(lessonId, [...(lessonPrincipleMap.get(lessonId) ?? []), principle.id]);
  });
});

export const lessons: Lesson[] = baseLessons.map((lesson) => ({
  ...lesson,
  relatedPrincipleIds: (lessonPrincipleMap.get(lesson.id) ?? principles.filter((principle) => principle.category === lesson.category).slice(0, 3).map((principle) => principle.id)).slice(0, 5)
}));
