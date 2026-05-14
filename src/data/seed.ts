import type { Badge, UserProgress } from "@/types";
export { frameworkTemplates } from "@/data/frameworks";
export { learningPaths } from "@/data/paths";
export { lessons } from "@/data/lessons";
export { principles } from "@/data/principles";
export { quizQuestions } from "@/data/quizzes";

export const badges: Badge[] = [
  { id: "clarity-builder", title: "Clarity Builder", description: "Completed your first foundational lesson.", requirement: "Complete one lesson" },
  { id: "structure-thinker", title: "Structure Thinker", description: "Demonstrated progress in structure and story.", requirement: "Complete three lessons" },
  { id: "persuasion-apprentice", title: "Persuasion Apprentice", description: "Passed a persuasion knowledge check.", requirement: "Answer a persuasion quiz correctly" },
  { id: "executive-communicator", title: "Executive Communicator", description: "Reached level 4 with executive mastery progress.", requirement: "Earn 700 XP" },
  { id: "cognitive-strategist", title: "Cognitive Strategist", description: "Built fluency in psychology-based communication.", requirement: "Complete psychology lessons" },
  { id: "story-architect", title: "Story Architect", description: "Completed a framework draft.", requirement: "Complete one framework" }
];

export const initialProgress: UserProgress = {
  xp: 260,
  streak: 4,
  completedLessonIds: ["attention-lost", "clarity-vs-complexity"],
  completedQuizIds: [],
  quizAttempts: [],
  completedFrameworkIds: [],
  earnedBadgeIds: ["clarity-builder"],
  lastActivityDate: new Date().toISOString()
};
