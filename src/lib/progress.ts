import { badges, initialProgress, learningPaths, lessons } from "@/data/seed";
import type { Category, LessonStatus, UserProgress } from "@/types";
import { percent } from "@/lib/utils";

const progressKey = "communication-os-progress";

export function getLevel(xp: number) {
  return Math.max(1, Math.floor(xp / 250) + 1);
}

export function getLevelProgress(xp: number) {
  return Math.round(((xp % 250) / 250) * 100);
}

export function getPathProgress(pathId: string, progress: UserProgress) {
  const path = learningPaths.find((item) => item.id === pathId);
  if (!path) {
    return 0;
  }

  const completed = path.lessonIds.filter((id) => progress.completedLessonIds.includes(id));
  return percent(completed.length, path.lessonIds.length);
}

export function getLessonStatus(pathId: string, lessonId: string, progress: UserProgress): LessonStatus {
  if (progress.completedLessonIds.includes(lessonId)) {
    return "complete";
  }

  const path = learningPaths.find((item) => item.id === pathId);
  const lessonIndex = path?.lessonIds.indexOf(lessonId) ?? -1;

  if (lessonIndex <= 0) {
    return "available";
  }

  const previousLessonId = path?.lessonIds[lessonIndex - 1];
  return previousLessonId && progress.completedLessonIds.includes(previousLessonId) ? "available" : "locked";
}

export function getNextLesson(progress: UserProgress) {
  return lessons.find((lesson) => getLessonStatus(lesson.pathId, lesson.id, progress) === "available") ?? lessons[0];
}

export function getMasteryByCategory(progress: UserProgress) {
  const categories: Category[] = ["Structure", "Psychology", "Persuasion", "Delivery", "Executive"];

  return categories.map((category) => {
    const categoryLessons = lessons.filter((lesson) => lesson.category === category);
    const completed = categoryLessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length;
    const quizBonus = progress.quizAttempts.filter((attempt) => attempt.score / attempt.total >= 0.75).length * 3;

    return {
      category,
      value: Math.min(100, percent(completed, Math.max(categoryLessons.length, 1)) + quizBonus)
    };
  });
}

export function getMasteryScore(progress: UserProgress) {
  const mastery = getMasteryByCategory(progress);
  return Math.round(mastery.reduce((sum, item) => sum + item.value, 0) / mastery.length);
}

export function getEarnedBadges(progress: UserProgress) {
  const earned = new Set(progress.earnedBadgeIds);

  if (progress.completedLessonIds.length >= 1) earned.add("clarity-builder");
  if (progress.completedLessonIds.length >= 3) earned.add("structure-thinker");
  if (progress.quizAttempts.some((attempt) => attempt.score / attempt.total >= 0.75)) earned.add("persuasion-apprentice");
  if (progress.xp >= 700) earned.add("executive-communicator");
  if (progress.completedLessonIds.some((id) => lessons.find((lesson) => lesson.id === id)?.category === "Psychology")) earned.add("cognitive-strategist");
  if (progress.completedFrameworkIds.length >= 1) earned.add("story-architect");

  return badges.filter((badge) => earned.has(badge.id));
}

export function normalizeProgress(progress: UserProgress): UserProgress {
  return {
    ...initialProgress,
    ...progress,
    earnedBadgeIds: getEarnedBadges(progress).map((badge) => badge.id)
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") {
    return initialProgress;
  }

  try {
    const stored = window.localStorage.getItem(progressKey);
    return stored ? normalizeProgress(JSON.parse(stored) as UserProgress) : initialProgress;
  } catch {
    return initialProgress;
  }
}

export function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(progressKey, JSON.stringify(normalizeProgress(progress)));
}

export function addXp(progress: UserProgress, xp: number): UserProgress {
  return normalizeProgress({
    ...progress,
    xp: progress.xp + xp,
    streak: Math.max(progress.streak, 1),
    lastActivityDate: new Date().toISOString()
  });
}
