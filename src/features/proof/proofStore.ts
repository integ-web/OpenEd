export type ArtifactSubmission = {
  id: string;
  lessonId: string;
  artifactId: string;
  title: string;
  body: string;
  status: "submitted" | "revision_requested" | "accepted";
  scores: Array<{ criterionId: string; label: string; score: number; maxScore: number; feedback: string }>;
  reviewerNote?: string;
  updatedAt: string;
};

export type PortfolioProofItem = {
  id: string;
  submissionId: string;
  title: string;
  summary: string;
  createdAt: string;
};
