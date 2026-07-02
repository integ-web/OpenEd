export const fmeRubrics = [
  {
    id: "rubric-p1-l4",
    artifactId: "artifact-p1-l4",
    title: "Trace note rubric",
    criteria: [
      { id: "claim", label: "Names the evaluated claim", maxScore: 4 },
      { id: "outcome", label: "Separates outcome signal from trajectory signal", maxScore: 4 },
      { id: "decision", label: "Connects evidence to a decision", maxScore: 4 },
    ],
  },
];

export function getRubricForArtifact(artifactId: string) {
  return fmeRubrics.find((rubric) => rubric.artifactId === artifactId);
}
