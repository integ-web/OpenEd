import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type DraftCourse } from "./courseStore";
import { useEducatorCourses } from "./useEducatorCourses";

export function CourseCreationPage() {
  const navigate = useNavigate();
  const { upsertCourse } = useEducatorCourses();
  const [step, setStep] = useState(0);
  const steps = ["Basics", "Outcomes", "First lesson", "Proof"];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title") ?? "Untitled course");
    const id =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "draft-course";
    const course: DraftCourse = {
      id,
      title,
      subtitle: String(data.get("subtitle") ?? ""),
      proofOutput: String(data.get("proofOutput") ?? ""),
      audience: String(data.get("audience") ?? ""),
      outcomes: [
        String(data.get("outcome1") ?? ""),
        String(data.get("outcome2") ?? ""),
        String(data.get("outcome3") ?? ""),
      ].filter(Boolean),
      lessons: [
        { id: "lesson-1", title: String(data.get("lessonTitle") ?? "First lesson"), type: "Concept", minutes: 45 },
      ],
      sources: [],
      quiz: [],
      rubric: [],
      artifactPrompt: String(data.get("artifactPrompt") ?? ""),
      tutorGrounding: "Tutor may use approved lessons, sources, quiz feedback, rubric, and artifact prompt.",
      status: "draft",
      updatedAt: new Date().toISOString(),
    };
    await upsertCourse(course);
    navigate(`/educator/courses/${course.id}/edit`);
  }

  return (
    <section className="stack">
      <div className="section-heading">
        <p className="eyebrow">Course Creation Wizard</p>
        <h1>Create a draft course</h1>
        <p>Quality starts with audience, outcomes, source-mapped lessons, assessment, and proof.</p>
      </div>
      <div className="tab-strip" aria-label="Wizard steps">
        {steps.map((label, index) => (
          <button
            key={label}
            className={step === index ? "tab active" : "tab"}
            type="button"
            onClick={() => setStep(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <form className="form-card wide" onSubmit={handleSubmit}>
        {step === 0 && (
          <>
            <label>
              Course title
              <input name="title" placeholder="AI Red Teaming Foundations" required />
            </label>
            <label>
              Subtitle
              <input name="subtitle" placeholder="Systematic red teaming for safe AI evaluation" />
            </label>
            <label>
              Audience
              <textarea name="audience" rows={4} placeholder="Who should take this course?" required />
            </label>
          </>
        )}
        {step === 1 && (
          <>
            <label>
              Outcome 1<input name="outcome1" placeholder="Design a scoped evaluation campaign" required />
            </label>
            <label>
              Outcome 2<input name="outcome2" placeholder="Use sources and evidence responsibly" />
            </label>
            <label>
              Outcome 3<input name="outcome3" placeholder="Create a proof-producing artifact" />
            </label>
          </>
        )}
        {step === 2 && (
          <>
            <label>
              First lesson title
              <input name="lessonTitle" placeholder="Scoping the evaluation" required />
            </label>
            <label>
              Source URL
              <input name="sourceUrl" placeholder="https://..." />
            </label>
          </>
        )}
        {step === 3 && (
          <>
            <label>
              Proof output
              <input name="proofOutput" placeholder="Evaluation trace note" required />
            </label>
            <label>
              Artifact prompt
              <textarea name="artifactPrompt" rows={5} placeholder="What should learners submit?" required />
            </label>
          </>
        )}
        <div className="inline-actions">
          <button className="button secondary" type="button" onClick={() => setStep(Math.max(0, step - 1))}>
            Back
          </button>
          {step < steps.length - 1 ? (
            <button className="button" type="button" onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>
              Next
            </button>
          ) : (
            <button className="button" type="submit">
              Create draft
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
