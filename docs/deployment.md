# OpenEd v1 Deployment Notes

## Environment

Set these client-safe variables for the Vite app:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Never expose a Supabase service-role key in the frontend.

## Supabase

Apply migrations from `supabase/migrations` in order. The first migration creates:

- `profiles` with roles: `learner`, `educator`, `opened_team`
- Course, lesson, source, progress, quiz, artifact, rubric, portfolio, review, moderation, tutor, and BYOK-preference tables
- RLS policies for learner-owned records, educator course ownership, and OpenEd Team review operations

BYOK keys are intentionally not represented in the schema. The frontend stores keys only in browser session or local storage after explicit learner choice.

## Build

```text
npm install
npm run build
```

Deploy the generated `dist` folder to the hosting target. Configure rewrites so all routes serve `index.html`.

## Smoke Test

- `/`, `/courses`, `/courses/fme` load publicly.
- `/learn`, `/educator`, `/team` are protected.
- Switch mock role to verify role guards.
- Submit an FME artifact, review it in `/educator/proof-review`, and confirm the portfolio updates.
- Submit an educator course for review and decide it in `/team/review-queue`.
