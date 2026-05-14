import type { Category, LearningPath, Principle } from "@/types";

export type LessonSpec = {
  id: string;
  pathId: string;
  title: string;
  category: Category;
  readTime: number;
  preview: string;
  insight: string;
  practice: string;
  example: string;
  mistake: string;
  takeaway: string;
  reflection: string;
};

export type PrincipleSeed = Omit<Principle, "relatedLessonIds"> & {
  lessonHints: string[];
};

export type PathSeed = LearningPath;
