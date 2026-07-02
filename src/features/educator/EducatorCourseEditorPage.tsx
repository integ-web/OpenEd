import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { starterDraft, type DraftCourse } from "./courseStore";
import { useEducatorCourses } from "./useEducatorCourses";

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function EducatorCourseEditorPage() {
  const { courseId } = useParams();
  const { getCourse, upsertCourse, submitCourse } = useEducatorCourses();
  const [course, setCourse] = useState<DraftCourse>(starterDraft);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void getCourse(courseId).then(setCourse);
  }, [courseId, getCourse]);

  const qaChecks = useMemo(
    () => [
      { label: "Audience and prerequisites are specific", pass: course.audience.trim().length > 20 },
      { label: "At least one lesson exists", pass: course.lessons.length > 0 },
      { label: "At least one source is mapped", pass: course.sources.length > 0 },
      { label: "Quiz question exists", pass: course.quiz.length > 0 },
      { label: "Rubric has at least two criteria", pass: course.rubric.length >= 2 },
      { label: "Artifact prompt creates learner proof", pass: course.artifactPrompt.trim().length > 20 },
      { label: "Tutor grounding limits are explicit", pass: course.tutorGrounding.trim().length > 20 },
    ],
    [course],
  );
  const ready = qaChecks.every((check) => check.pass);

  async function saveDraft() {
    const next = { ...course, updatedAt: new Date().toISOString() };
    await upsertCourse(next);
    setCourse(next);
    setSaved(true);
  }

  async function handleBasics(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCourse({
      ...course,
      title: String(data.get("title") ?? course.title),
      subtitle: String(data.get("subtitle") ?? ""),
      audience: String(data.get("audience") ?? ""),
      proofOutput: String(data.get("proofOutput") ?? ""),
      outcomes: splitLines(String(data.get("outcomes") ?? "")),
    });
    setSaved(false);
  }

  async function handleContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCourse({
      ...course,
      lessons: splitLines(String(data.get("lessons") ?? "")).map((title, index) => ({
        id: `lesson-${index + 1}`,
        title,
        type: index === 0 ? "Concept" : "Practice",
        minutes: 45,
      })),
      sources: splitLines(String(data.get("sources") ?? "")).map((line, index) => {
        const [title, url = "#"] = line.split("|").map((item) => item.trim());
        return { id: `source-${index + 1}`, title, url, lessonId: "lesson-1" };
      }),
      quiz: splitLines(String(data.get("quiz") ?? "")).map((line, index) => {
        const [prompt, answer = ""] = line.split("|").map((item) => item.trim());
        return { id: `quiz-${index + 1}`, prompt, answer };
      }),
      rubric: splitLines(String(data.get("rubric") ?? "")).map((label, index) => ({
        id: `criterion-${index + 1}`,
        label,
        maxScore: 4,
      })),
      artifactPrompt: String(data.get("artifactPrompt") ?? ""),
      tutorGrounding: String(data.get("tutorGrounding") ?? ""),
    });
    setSaved(false);
  }

  const [editorTab, setEditorTab] = useState<"basics" | "content" | "preview_qa">("basics");

  return (
    <section className="stack">
      <div className="section-heading">
        <p className="eyebrow">Course Editor</p>
        <h1>{course.title || "Untitled Course"}</h1>
        <p>{course.subtitle || "Provide a subtitle in the basics tab"}</p>
        <div className="inline-actions" style={{ marginTop: "1rem" }}>
          <button className="button secondary" type="button" onClick={() => void saveDraft()}>
            Save draft
          </button>
          <button className="button" type="button" disabled={!ready} onClick={() => void submitCourse(course.id)}>
            Submit for OpenEd Team review
          </button>
          <span className={`status-pill ${course.status === "draft" ? "warning" : "success"}`}>
            {course.status.replace("_", " ")}
          </span>
          {saved && (
            <span className="success-text" style={{ fontSize: "0.85rem", marginLeft: "0.5rem" }}>
              ✓ Saved successfully
            </span>
          )}
        </div>
      </div>

      <div className="tab-strip" role="tablist" aria-label="Editor sub-sections" style={{ marginBottom: "1.5rem" }}>
        <button
          type="button"
          className={editorTab === "basics" ? "tab active" : "tab"}
          onClick={() => setEditorTab("basics")}
        >
          1. Basics & Outcomes
        </button>
        <button
          type="button"
          className={editorTab === "content" ? "tab active" : "tab"}
          onClick={() => setEditorTab("content")}
        >
          2. Lessons & Mapped Content
        </button>
        <button
          type="button"
          className={editorTab === "preview_qa" ? "tab active" : "tab"}
          onClick={() => setEditorTab("preview_qa")}
        >
          3. Preview & QA Readiness ({qaChecks.filter((c) => c.pass).length}/{qaChecks.length})
        </button>
      </div>

      {editorTab === "basics" && (
        <form className="form-card" onSubmit={handleBasics}>
          <h2>Course Basics</h2>
          <p className="muted">Establish the core framework, target audience, and primary learning outcomes.</p>
          <label>
            Course Title
            <input name="title" defaultValue={course.title} placeholder="e.g. Systematic AI Evaluation" required />
          </label>
          <label>
            Subtitle
            <input
              name="subtitle"
              defaultValue={course.subtitle}
              placeholder="e.g. Scoping, testing, and verifying LLM outcomes"
            />
          </label>
          <label>
            Audience and Prerequisites
            <textarea
              name="audience"
              rows={4}
              defaultValue={course.audience}
              placeholder="Describe who this course is for and any foundational knowledge required."
              required
            />
          </label>
          <label>
            Proof Output Name
            <input
              name="proofOutput"
              defaultValue={course.proofOutput}
              placeholder="e.g. Red Team Log Certificate"
              required
            />
          </label>
          <label>
            Learning Outcomes (one per line)
            <textarea
              name="outcomes"
              rows={5}
              defaultValue={course.outcomes.join("\n")}
              placeholder="Outcome 1&#10;Outcome 2&#10;Outcome 3"
              required
            />
          </label>
          <button className="button" type="submit" style={{ justifySelf: "start" }}>
            Update Basics
          </button>
        </form>
      )}

      {editorTab === "content" && (
        <form className="form-card" onSubmit={handleContent}>
          <h2>Course Content & Mappings</h2>
          <p className="muted">
            Build lessons, map scholarly sources, create quizzes, and set rubrics for the AI coach and proof engine.
          </p>
          <label>
            Lessons (one title per line)
            <textarea
              name="lessons"
              rows={4}
              defaultValue={course.lessons.map((lesson) => lesson.title).join("\n")}
              placeholder="Lesson 1 Title&#10;Lesson 2 Title"
              required
            />
          </label>
          <label>
            Sources (one per line: Title | URL)
            <textarea
              name="sources"
              rows={4}
              defaultValue={course.sources.map((source) => `${source.title} | ${source.url}`).join("\n")}
              placeholder="Title of Source Paper | https://arxiv.org/abs/...&#10;Reference Book | https://..."
            />
          </label>
          <label>
            Quiz items (one per line: Prompt | Correct Answer Choice)
            <textarea
              name="quiz"
              rows={4}
              defaultValue={course.quiz.map((q) => `${q.prompt} | ${q.answer}`).join("\n")}
              placeholder="What is an outcome signal? | A metric demonstrating a system result"
            />
          </label>
          <label>
            Rubric Criteria (one criterion per line)
            <textarea
              name="rubric"
              rows={4}
              defaultValue={course.rubric.map((criterion) => criterion.label).join("\n")}
              placeholder="Clarity and Structure&#10;Source Backing and Evidence Quality"
            />
          </label>
          <label>
            Artifact Submission Assignment Prompt
            <textarea
              name="artifactPrompt"
              rows={4}
              defaultValue={course.artifactPrompt}
              placeholder="Detail what final artifact the learner must submit to prove mastery."
              required
            />
          </label>
          <label>
            Tutor Grounding Rules
            <textarea
              name="tutorGrounding"
              rows={4}
              defaultValue={course.tutorGrounding}
              placeholder="Explicit instructions limiting what the BYOK coach can answer."
              required
            />
          </label>
          <button className="button" type="submit" style={{ justifySelf: "start" }}>
            Update Content Mappings
          </button>
        </form>
      )}

      {editorTab === "preview_qa" && (
        <div className="editor-grid" style={{ alignItems: "start" }}>
          <article className="workspace-panel">
            <h2>Preview as Learner</h2>
            <p className="muted">
              This is how your course metadata currently resolves for students onboarding to the course.
            </p>
            <div
              style={{ marginTop: "1rem", padding: "16px", background: "var(--panel-strong)", borderRadius: "10px" }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{course.title || "Untitled"}</h3>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>{course.subtitle || "No subtitle provided."}</p>
              <div
                style={{ display: "flex", gap: "10px", marginTop: "1rem", fontSize: "0.8rem", color: "var(--muted)" }}
              >
                <span>
                  <strong>Lessons:</strong> {course.lessons.length}
                </span>
                <span>
                  <strong>Sources:</strong> {course.sources.length}
                </span>
                <span>
                  <strong>Quiz Items:</strong> {course.quiz.length}
                </span>
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <strong>Prerequisites & Target Audience:</strong>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>{course.audience || "No audience defined yet."}</p>
            </div>
          </article>

          <article className="workspace-panel">
            <h2>Publish-Readiness QA</h2>
            <p className="muted">To submit this course, all of the following quality checks must pass.</p>
            <ul className="check-list" style={{ marginTop: "1.5rem" }}>
              {qaChecks.map((check) => (
                <li
                  key={check.label}
                  style={{ display: "flex", alignItems: "start", gap: "0.75rem", padding: "8px 0" }}
                >
                  <span
                    className={`status-pill ${check.pass ? "success" : "warning"}`}
                    style={{ minHeight: "auto", padding: "2px 8px", fontSize: "0.75rem" }}
                  >
                    {check.pass ? "✓ Pass" : "⚠ Fix"}
                  </span>
                  <span style={{ fontSize: "0.92rem", textDecoration: check.pass ? "none" : "initial" }}>
                    {check.label}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      )}
    </section>
  );
}
