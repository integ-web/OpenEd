# OpenEd Trust, Safety, and Content QA Document

## Purpose

Trust is central to OpenEd. A free learning platform can degrade quickly if it accepts low-quality courses, unsafe content, broken sources, generic AI-generated lessons, or misleading proof.

## Trust pillars

1. Source transparency.
2. Course quality review.
3. Educator accountability.
4. AI tutor safety.
5. Assessment integrity.
6. Learner privacy.
7. Moderation and reporting.

## Course QA rubric

### Content completeness

- Course has clear audience.
- Course has prerequisites.
- Course has learning outcomes.
- Every lesson has objective.
- Every lesson has summary.
- Every lesson has practice or knowledge check.
- Every module has artifact or assessment.

### Source quality

- Claims have sources where needed.
- Sources are relevant.
- Sources are not fabricated.
- Sources are marked required/optional.
- Advanced resources are separated.
- Broken links are flagged.

### Assessment quality

- Quizzes have explanations.
- Wrong answers have feedback.
- Rubrics have criteria and descriptors.
- Artifacts have examples/non-examples.
- Proof claims are not overstated.

### AI tutor readiness

- Lesson has tutor context.
- Suggested prompts exist.
- Restricted topics are flagged.
- Tutor should know when to refuse/escalate.

### Accessibility

- Video has transcript/summary.
- Diagrams have text summaries.
- Contrast passes.
- Mobile layout works.
- Language is not unnecessarily complex.

## Course publishing states

```text
draft -> qa_ready -> submitted -> in_review -> changes_requested -> approved -> published -> monitored -> archived
```

## Moderation policy

Report types:

- Incorrect course content.
- Broken source.
- Harmful or unsafe content.
- Tutor hallucination.
- Cheating request.
- Harassment/abuse.
- IP/copyright concern.
- Privacy concern.

Severity:

| Severity | Response |
|---|---|
| Low | Batch review. |
| Medium | Review within 72 hours. |
| High | Review within 24 hours. |
| Critical | Immediate restriction or temporary removal. |

## Safety-sensitive content

OpenEd can host serious courses on technical or sensitive topics, but must use safe teaching methods.

For high-risk domains:

- Use abstracted/sandboxed examples.
- Avoid operational harmful steps.
- Use defensive framing.
- Add source and safety review.
- Restrict tutor behavior.
- Escalate to OpenEd Team review.

## AI tutor safety controls

- Source-grounded mode.
- Refusal for unsafe requests.
- No direct answer during locked assessment.
- Report answer button.
- Tutor failure log.
- Prompt injections handled as untrusted user content.

## Privacy controls

- No BYOK key storage on server.
- Optional local browser storage with warning.
- No sensitive learner data in tutor logs by default.
- Private artifacts remain private unless shared.
- Admin access is audited.

## Content QA automation

Automated checks can flag:

- Missing objective.
- Missing source.
- Broken link.
- Duplicate lesson text.
- No quiz feedback.
- No rubric.
- Missing transcript.
- Unsupported claim language.
- Unsafe terms requiring human review.

Automation should not be final authority. It supports OpenEd Team review.

## Quality badge model

Course badges:

- Source-mapped.
- Tutor-ready.
- Artifact-based.
- Rubric-reviewed.
- Accessibility-checked.
- OpenEd reviewed.

Do not create misleading badges such as "job guaranteed" or "expert certified" without evidence.

## Trust failure modes

| Failure | Mitigation |
|---|---|
| Fake sources | Source verification and reviewer checks. |
| Generic AI lessons | Duplicate/generic text detection and quality review. |
| Harmful course content | Restricted-topic policies and human review. |
| Tutor hallucination | Source grounding and report workflow. |
| Misleading certificate | Proof ladder and transparent evidence. |
| Educator abuse | Reporting, suspension, audit logs. |


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
