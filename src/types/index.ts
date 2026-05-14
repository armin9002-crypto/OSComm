export type Category =
  | "Structure"
  | "Psychology"
  | "Persuasion"
  | "Delivery"
  | "Executive"
  | "Storytelling"
  | "Rhetoric"
  | "Foundations";

export type Difficulty = "Foundational" | "Intermediate" | "Advanced";
export type LessonStatus = "locked" | "available" | "complete";

export type LearningPath = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: Category;
  estimatedHours: number;
  lessonIds: string[];
  milestones: string[];
};

export type Lesson = {
  id: string;
  pathId: string;
  title: string;
  category: Category;
  readTime: number;
  preview: string;
  content: string[];
  whyItMatters: string;
  realWorldExample: string;
  commonMistake: string;
  keyTakeaway: string;
  reflectionPrompt: string;
  relatedPrincipleIds: string[];
  xp: number;
};

export type Principle = {
  id: string;
  title: string;
  summary: string;
  category: Category;
  difficulty: Difficulty;
  detail: string;
  application: string;
  relatedLessonIds: string[];
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: Category;
  xp: number;
};

export type FrameworkTemplate = {
  id: string;
  title: string;
  description: string;
  bestFor: string;
  xp: number;
  sections: {
    id: string;
    label: string;
    guidance: string;
    placeholder: string;
  }[];
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  requirement: string;
};

export type UserProgress = {
  xp: number;
  streak: number;
  completedLessonIds: string[];
  completedQuizIds: string[];
  quizAttempts: {
    quizId: string;
    score: number;
    total: number;
    completedAt: string;
  }[];
  completedFrameworkIds: string[];
  earnedBadgeIds: string[];
  lastActivityDate: string;
};
