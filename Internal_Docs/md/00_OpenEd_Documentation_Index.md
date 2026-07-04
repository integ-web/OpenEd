# OpenEd Documentation Index

## Purpose

This pack formalizes OpenEd v1 as an independent AI-native learning platform built from the Frontier Model Evaluations prototype. The FME course remains the first flagship course and the proof vehicle. OpenEd itself is broader: a learner app, an educator studio, and an assessment/proof engine.

The docs are designed to remove ambiguity before engineering work begins. They cover product scope, user roles, design direction, learner experience, educator workflows, assessment philosophy, AI tutor architecture, risk, metrics, market validation, and the migration path from the current FME prototype.

## Core product thesis

OpenEd is a free learner-first platform where every serious course is source-mapped, AI-tutor-assisted, practice-driven, assessment-aware, and proof-producing.

The learning loop is:

```text
Goal -> diagnostic -> learning path -> lesson -> AI tutor -> practice -> artifact -> feedback -> SkillProof portfolio -> next learning step
```

## V1 user types

OpenEd v1 has exactly three user categories:

| User type | Why they exist in v1 |
|---|---|
| OpenEd Team | Maintain quality, safety, publishing, IAM, moderation, analytics, and platform trust. |
| Students / Learners | Learn for free, ask doubts, practice, submit artifacts, and build proof. |
| Educators | Create source-mapped courses with lessons, sources, quizzes, rubrics, and artifacts. |

Not v1: employers, universities, organization admins, paid cohorts, enterprise portals, placement teams, and external graders.

## Bundle map

| Bundle | Documents |
|---|---|
| Strategy and validation | 01, 02, 03, 04, 05, 16, 17, 24, 25 |
| Product and UX | 06, 07, 08, 09, 10, 11, 12, 15, 23 |
| Technical and operations | 13, 14, 18, 19, 20, 21, 22 |

## Document list

1. 01_Context_and_Strategy.md
2. 02_Problem_Solution.md
3. 03_Idea_Validation_and_User_Research.md
4. 04_Market_Research_and_Competitive_Landscape.md
5. 05_VRIO_and_Moat_Analysis.md
6. 06_Users_Roles_and_IAM.md
7. 07_User_Journey_and_Experience.md
8. 08_Design_System_and_Experience_Principles.md
9. 09_Features_and_Scope.md
10. 10_Learner_App_Product_Spec.md
11. 11_Educator_Studio_Product_Spec.md
12. 12_Assessment_and_Proof_Engine.md
13. 13_AI_Tutor_Product_and_Technical_Spec.md
14. 14_Human_AI_Expert_Operating_Model.md
15. 15_Accessibility_Inclusivity_and_Adoption.md
16. 16_Impact_and_EdTech_Fix.md
17. 17_Roadmap_and_Future_Progress.md
18. 18_PRD_OpenEd_v1.md
19. 19_Technical_Architecture_and_Data_Model.md
20. 20_KPIs_and_Metrics.md
21. 21_Risks_Externalities_and_Failure_Modes.md
22. 22_Trust_Safety_and_Content_QA.md
23. 23_FME_Prototype_Extraction_and_Migration_Plan.md
24. 24_GTM_Monetization_and_Operations.md
25. 25_Reference_and_Bibliography.md

## How to use this pack

- Use docs 01-05 to align the founding strategy.
- Use docs 06-12 to design the product and Figma flows.
- Use docs 13-22 to guide engineering, IAM, AI tutor, metrics, and risk controls.
- Use doc 23 to refactor the FME prototype into OpenEd.
- Use doc 24 for investor and business model conversations.
- Use doc 25 as the living references list.

## Immediate execution sequence

1. Freeze v1 scope and user roles.
2. Extract the FME runtime into generic OpenEd course runtime components.
3. Implement auth, profiles, enrollments, progress, and role-based access.
4. Make the learner app work end-to-end with FME.
5. Add Educator Studio v0 for course creation and publish-readiness QA.
6. Add Assessment and Proof Engine v0 for quizzes, artifacts, rubrics, and SkillProof portfolios.
7. Rebuild the AI tutor as a course-grounded tutor, not a generic chatbot.
8. Fix the design system: light-first, calmer dark theme, richer visual excitement, responsive across phone, tablet, desktop.


---

## Source notes

This document is grounded in the current OpenEd/FME project context and the following reference set where applicable:

- Uploaded Frontier Model Evaluations prototype code bundle, latest inspected bundle: Design System for Frontier Model Evaluation (5).zip.
- Uploaded Frontier Model Evaluations 51-hour curriculum and Module 1 foundations files.
- Coursera, Udemy, DataCamp, Moodle, Khanmigo, Duolingo public documentation and product pages.
- Supabase Auth and Row Level Security documentation.
- OpenAI API key safety guidance, MDN Web APIs, and YouTube IFrame Player API documentation.
- Bloom's 2 sigma problem, intelligent tutoring systems research, CourseAssist, LearnLM-Tutor, DCCI, and UNESCO guidance for generative AI in education.

Document version: OpenEd v1 planning pack, 2026-06-17.
