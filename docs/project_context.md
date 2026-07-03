# OpenEd Project Context & Deep Analysis

This document serves as the master context file for the OpenEd v1 stabilization and completion effort. It consolidates the deep analysis conducted on the codebase, the reference materials, and the final implementation plan.

## 1. Project Background & Pivot
The project started as a 51-hour **Frontier Model Evaluations (FME)** course, but evolved into **OpenEd**, a free AI-native learning platform. FME is now the first flagship course on this platform.

**V1 Scope & User Types:**
1. **Learner**: Discover, learn, practice, submit artifacts, build SkillProof portfolios.
2. **Educator**: Create source-mapped courses with quizzes, rubrics, and artifacts.
3. **OpenEd Team**: Manage quality, safety, publishing, IAM, moderation, and trust.

## 2. Current Codebase State (Deep Analysis)

### File Structure & Architecture
The app at `c:\Users\Madhvi Gupta\Documents\OpenEd` is a clean, feature-sliced React 18 + TypeScript + Vite application. It uses React Router v6, a Supabase client with a mock fallback, and a custom CSS token-based design system.

### Working Features (UI-Only / Mock Mode)
- Auth (login/signup) with mock fallback.
- Learner Dashboard, Lesson Workspace, Quiz system, Artifact builder.
- Educator Dashboard, Course creation wizard, Course editor.
- Team Dashboard & Review queue.
- BYOK settings UI (key management in localStorage).

### Critical Gaps & Issues (P0 & P1)
1. **Missing Content**: The course content data (`src/data/fme/*`) is a tiny demo seed. It contains only 4 lessons, 3 sources, 1 quiz, and 1 artifact, compared to the required 40 lessons across 6 phases. 100% of the lesson content cards (8-block structure) and golden datasets are missing.
2. **BYOK (Bring Your Own Key) Tutor**: The BYOK system is a fully built UI that successfully saves keys to `localStorage` or `sessionStorage`. However, it currently relies on a **mock keyword-based responder** (`groundedTutorReply`) and does not make actual HTTP calls to real LLM providers (OpenAI, Anthropic, Gemini).
3. **Persistence**: Core product state (progress, educator courses, proofs, team audit) relies entirely on `localStorage` instead of Supabase.
4. **Security**: Role escalation is possible because the role switcher is public and users can self-select privileged roles during signup. Supabase profile creation and RLS policies are incomplete or insecure.
5. **Educator Studio & Proof Engine**: These are currently functional UI shells, but lack deep persistence and nested editing (cannot truly build and save a multi-lesson course or persist rubric grading).

## 3. Implementation Plan

The following plan is currently being executed to finalize OpenEd:

### Phase 1: Security, Auth & Dependency Hardening
- Upgrade `react-router-dom` (to 6.30.4) and `vite` (to 6.4.3).
- Remove the public role switcher (restrict to dev-mode only).
- Default all public signups to the `learner` role.
- Apply Supabase migrations to securely create profiles (`auth.users` trigger), harden `current_opened_role()`, and strictly enforce RLS policies preventing users from updating their own roles.

### Phase 2: Supabase Persistence Migration
- Refactor the repository layer (`progressRepository.ts`, `courseRepository.ts`, `proofRepository.ts`, `teamRepository.ts`, `tutorPreferencesRepository.ts`) to fully utilize the connected Supabase instance, replacing the temporary `localStorage` fallback where appropriate.

### Phase 3: Course Content Hydration
- Expand the FME data in `src/data/fme/` to the full 51-hour, 6-phase curriculum.
- Populate 40 lessons, 46 sources, 40 quizzes, 40 artifacts, and corresponding rubrics.
- Add missing data structures: `glossary.ts`, `datasets.ts`, `pacing.ts`, `troubleshooting.ts`, and `mediaplan.ts`.

### Phase 4: Educator Studio & Proof Engine Realization
- Build out real nested editing capabilities in `EducatorCourseEditorPage.tsx` to allow adding lessons, sources, and quizzes to the database.
- Complete the artifact review and grading flow in `ProofReviewPage.tsx`, ensuring portfolio items are generated upon accepted proofs.

### Phase 5: BYOK Real API Integration
- Cross-check and upgrade the BYOK Tutor logic. 
- Retain the strict policy: **Keys stay in local browser storage and are never sent to a database server.**
- Implement actual HTTP integration layers to call the LLM provider APIs directly from the client browser.

## 4. Environment Configuration
Supabase has been configured for the project with the following credentials (provided by user for agent connection):
- URL: `https://cydtwvohpqzrodxfptkn.supabase.co`
- Keys: Stored in the project's `.env` file.
