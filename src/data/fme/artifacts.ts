export const fmeArtifacts = [
  {
    id: "artifact-p1-l4",
    lessonId: "p1-l4",
    title: "Evaluation trace note",
    prompt:
      "Write a short decision-ready note that separates outcome quality, trajectory safety, and the release decision.",
    template: "Claim:\nOutcome signal:\nTrajectory signal:\nDecision implication:",
  },
];

export function getArtifactForLesson(lessonId: string) {
  return fmeArtifacts.find((artifact) => artifact.lessonId === lessonId);
}
