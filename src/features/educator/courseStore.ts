export type DraftCourseStatus = "draft" | "submitted" | "changes_requested" | "approved" | "rejected";

export type DraftCourse = {
  id: string;
  title: string;
  subtitle: string;
  proofOutput: string;
  audience: string;
  outcomes: string[];
  lessons: Array<{ id: string; title: string; type: string; minutes: number }>;
  sources: Array<{ id: string; title: string; url: string; lessonId: string }>;
  quiz: Array<{ id: string; prompt: string; answer: string }>;
  rubric: Array<{ id: string; label: string; maxScore: number }>;
  artifactPrompt: string;
  tutorGrounding: string;
  status: DraftCourseStatus;
  reviewNote?: string;
  updatedAt: string;
};

export const starterDraft: DraftCourse = {
  id: "ai-red-teaming",
  title: "AI Red Teaming Foundations",
  subtitle: "Systematic red teaming for safe AI evaluation",
  proofOutput: "Red team report and campaign design",
  audience: "ML engineers and AI safety researchers who run evaluations.",
  outcomes: [
    "Design a scoped red team campaign.",
    "Write safe evaluation prompts without enabling misuse.",
    "Structure a report with evidence and mitigations.",
  ],
  lessons: [{ id: "m1-l1", title: "Scoping a red team campaign", type: "Practice", minutes: 60 }],
  sources: [
    { id: "src-1", title: "OpenAI Preparedness Framework", url: "https://openai.com/safety/", lessonId: "m1-l1" },
  ],
  quiz: [
    { id: "quiz-1", prompt: "What should a red team scope define first?", answer: "The decision and harm boundary." },
  ],
  rubric: [
    { id: "scope", label: "Clear scope and constraints", maxScore: 4 },
    { id: "evidence", label: "Evidence-backed findings", maxScore: 4 },
    { id: "mitigation", label: "Actionable mitigations", maxScore: 4 },
  ],
  artifactPrompt: "Submit a short red team campaign plan with scope, test cases, evidence, and mitigations.",
  tutorGrounding: "Tutor may answer from course lessons, approved sources, rubric, and artifact prompt only.",
  status: "changes_requested",
  reviewNote: "Add a non-example for the artifact and improve source coverage before resubmission.",
  updatedAt: new Date().toISOString(),
};
