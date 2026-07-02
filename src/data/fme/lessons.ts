export type FmeLesson = {
  id: string;
  moduleId: string;
  title: string;
  minutes: number;
  type: "Concept" | "Practice" | "Build";
  objective: string;
  transcript: string;
  practicePrompt: string;
};

export const fmeLessons: FmeLesson[] = [
  {
    id: "p1-l1",
    moduleId: "p1",
    title: "What makes an evaluation useful?",
    minutes: 38,
    type: "Concept",
    objective: "Separate evaluation activity from the product or policy decision it supports.",
    transcript:
      "A useful frontier model evaluation begins with a claim and a decision. The question is not whether a benchmark looks sophisticated, but whether the evidence changes what a responsible team should release, restrict, investigate, or stop.",
    practicePrompt: "Name one decision an evaluation could support and one signal that would change that decision.",
  },
  {
    id: "p1-l4",
    moduleId: "p1",
    title: "Outcome and trajectory metrics",
    minutes: 45,
    type: "Practice",
    objective: "Score both final answers and the path the model took to get there.",
    transcript:
      "Outcome metrics judge the final result. Trajectory metrics inspect intermediate behavior: tool calls, private data exposure, recovery attempts, constraint handling, and whether the model reached the right answer through an acceptable path. Serious evaluation leaves a trace.",
    practicePrompt:
      "Given a model that answers correctly after leaking private context into a tool call, decide what passes and what fails.",
  },
  {
    id: "p2-l1",
    moduleId: "p2",
    title: "Benchmark design and failure modes",
    minutes: 50,
    type: "Concept",
    objective: "Recognize when benchmark scores hide brittle or unsafe behavior.",
    transcript:
      "Benchmarks compress behavior into scores. They become dangerous when teams forget what was sampled, what was excluded, and how distribution shift changes the meaning of a score.",
    practicePrompt: "List two limitations that should accompany a benchmark result before a release review.",
  },
  {
    id: "p3-l1",
    moduleId: "p3",
    title: "Reading model trajectories",
    minutes: 55,
    type: "Build",
    objective: "Turn a model interaction trace into a decision-ready risk note.",
    transcript:
      "Trajectory review asks what happened along the way. Did the model seek clarification, overreach, call tools safely, recover from errors, and preserve constraints while completing the task?",
    practicePrompt: "Mark the moments in a trajectory where evaluator judgment should be recorded.",
  },
];

export function getFmeLesson(lessonId = "p1-l4") {
  return fmeLessons.find((lesson) => lesson.id === lessonId) ?? fmeLessons[1];
}
