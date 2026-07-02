# OpenEd

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://integ-web.github.io/OpenEd/)

OpenEd is a free AI-native learning platform where courses are source-mapped, tutor-assisted, practice-driven, artifact-based, and proof-producing.

FME, Frontier Model Evaluations, is the first flagship course direction inside OpenEd. The current runtime ships as a demo preview, not the full course.

## V1 Scope

OpenEd v1 includes three user types:

- Learner
- Educator
- OpenEd Team

V1 includes:

- Public landing and course catalog
- Learner App
- FME course runtime
- Educator Studio
- Assessment and Proof Engine
- BYOK AI Tutor
- OpenEd Team Console
- Supabase auth/profile/RLS foundation

V1 intentionally excludes university portals, organization portals, employer dashboards, payments, social feeds, and full proctoring.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Supabase client
- CSS token/theme layer

## Getting Started

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Environment

Copy `.env.example` to `.env` and set:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

If these variables are absent in local development, the app uses a mock auth fallback. Never expose a Supabase service role key in the frontend.

## Key Routes

- `/` public landing
- `/courses` course catalog
- `/courses/fme` public FME preview
- `/login` and `/signup`
- `/learn` learner dashboard
- `/learn/courses/fme` FME runtime overview
- `/learn/courses/fme/lesson/:lessonId` lesson workspace
- `/learn/portfolio` SkillProof portfolio
- `/educator` Educator Studio
- `/educator/courses/new` course creation wizard
- `/educator/proof-review` artifact review
- `/team` OpenEd Team Console
- `/team/review-queue` course review queue
- `/settings/byok` BYOK setup

## Project Structure

```text
src/
  app/                 route shell, providers, router
  data/fme/            FME seed data
  features/auth/       login/signup UI
  features/learner/    learner app and progress
  features/educator/   educator studio workflows
  features/proof/      assessment/proof engine
  features/team/       OpenEd Team console
  features/tutor/      BYOK and tutor state
  shared/theme/        visual tokens and app CSS
supabase/migrations/   schema and RLS foundation
reference/figma-drops/ archived Figma exports for reference
docs/                  deployment notes
```

## Supabase

Apply migrations from `supabase/migrations` in order. The first migration creates the v1 foundation tables and RLS policies for profiles, courses, lessons, sources, progress, quizzes, artifacts, rubrics, portfolio items, reviews, moderation reports, tutor sessions, and BYOK preferences without keys.

BYOK keys are never stored in Supabase. The app stores them only in browser session storage or local storage after explicit user choice.
