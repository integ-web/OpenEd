export const fmeQuizzes = [
  {
    id: "q-p1-l4-1",
    lessonId: "p1-l4",
    prompt:
      "A model gives the correct final answer but violates a tool-use constraint. What should the evaluator record?",
    choices: [
      "The task passed because the answer was correct.",
      "The outcome passed, but trajectory safety failed.",
      "The model should be graded only by user satisfaction.",
      "The evaluation is invalid because tools were involved.",
    ],
    answerIndex: 1,
    feedback: "Correct: outcome and trajectory metrics can diverge, and the trace matters.",
  },
];

export function getQuizForLesson(lessonId: string) {
  return fmeQuizzes.find((quiz) => quiz.lessonId === lessonId);
}
