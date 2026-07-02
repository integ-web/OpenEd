export const fmeSources = [
  {
    id: "s1",
    lessonId: "p1-l4",
    title: "Holistic Evaluation of Language Models",
    organization: "Stanford CRFM",
    type: "Framework",
    url: "https://crfm.stanford.edu/helm/latest/",
    required: true,
  },
  {
    id: "s2",
    lessonId: "p1-l4",
    title: "Model evaluation for extreme risks",
    organization: "Research reference",
    type: "Paper",
    url: "https://arxiv.org/",
    required: true,
  },
  {
    id: "s3",
    lessonId: "p1-l4",
    title: "Tool-use trace review checklist",
    organization: "OpenEd FME",
    type: "Checklist",
    url: "#",
    required: false,
  },
];

export function getSourcesForLesson(lessonId: string) {
  return fmeSources.filter((source) => source.lessonId === lessonId);
}
