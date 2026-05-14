# Communication OS

Communication OS is a polished MVP learning system for mastering communication, public speaking, persuasion, structure, clarity, confidence, and presentation thinking. It is designed as a principle library and mastery tracker rather than a recording, transcription, or course marketplace product.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local mock data
- `localStorage` progress persistence
- No authentication, backend, payments, audio recording, speech-to-text, or voice analysis

## Folder Structure

- `src/app`: App Router routes for dashboard, paths, library, lessons, quizzes, builder, and progress
- `src/components`: Reusable layout, navigation, cards, progress, and interactive client components
- `src/data`: Seed data for learning paths, lessons, principles, quiz questions, framework templates, progress, and badges
- `src/lib`: Progress, XP, mastery, formatting, and storage helpers
- `src/types`: Shared TypeScript domain models

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Architecture Notes

The app uses typed mock data as the product source of truth. Client components read and write progress through a small `localStorage` layer, then calculate XP, streaks, unlock state, completion percentages, mastery scores, badges, and level progression with reusable helpers.

Routes are intentionally modular:

- `/` dashboard
- `/paths` path catalog
- `/paths/[pathId]` path detail
- `/lessons/[lessonId]` lesson detail
- `/quiz` knowledge check
- `/library` principle library
- `/principles/[principleId]` principle detail
- `/builder` framework builder
- `/progress` mastery tracker

## Future Enhancements

- Spaced repetition review queue
- Saved framework drafts and export
- Deeper lesson sequencing by role or goal
- Advanced search across lessons and principles
- Team facilitation packs for managers and speakers
- Optional sync layer while keeping the product usable offline-first
