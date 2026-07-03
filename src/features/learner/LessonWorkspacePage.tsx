import { BookOpen, FileText, PlayCircle, Sparkles, Wrench } from "lucide-react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArtifactForLesson,
  getFmeLesson,
  getQuizForLesson,
  getRubricForArtifact,
  getSourcesForLesson,
} from "../../data/fme";
import { useProof } from "../proof/useProof";
import { groundedTutorReply, hasBrowserKey } from "../tutor/byokStore";
import { useTutorPreferences } from "../tutor/useTutorPreferences";
import { useFmeProgress } from "./useFmeProgress";

export function LessonWorkspacePage() {
  const { lessonId } = useParams();
  const lesson = getFmeLesson(lessonId);
  const sources = getSourcesForLesson(lesson.id);
  const quiz = getQuizForLesson(lesson.id);
  const artifact = getArtifactForLesson(lesson.id);
  const rubric = artifact ? getRubricForArtifact(artifact.id) : undefined;
  const { progress, savePractice, completeQuiz, submitArtifact } = useFmeProgress();
  const [activeTab, setActiveTab] = useState<"learn" | "sources" | "practice" | "build">("learn");
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [artifactText, setArtifactText] = useState(progress.artifacts[lesson.id] ?? artifact?.template ?? "");
  const [tutorInput, setTutorInput] = useState("");
  const [tutorMessages, setTutorMessages] = useState<Array<{ role: "learner" | "tutor"; text: string }>>([
    {
      role: "tutor",
      text: `I can help with ${lesson.title}. I will stay grounded in this lesson, your artifact state, and mapped sources.`,
    },
  ]);
  const { preferences: byok } = useTutorPreferences();
  const keyReady = hasBrowserKey() || byok.provider === "mock";
  const { submitArtifact: submitProofArtifact } = useProof();

  function handlePractice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    savePractice(lesson.id, String(data.get("practice") ?? ""));
  }

  function handleArtifact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitArtifact(lesson.id, artifactText);
    void submitProofArtifact(lesson.id, artifactText);
  }

  const [isTutorTyping, setIsTutorTyping] = useState(false);
  
  async function askTutor(prompt: string) {
    const newHistory = [...tutorMessages, { role: "learner" as const, text: prompt }];
    setTutorMessages(newHistory);
    setTutorInput("");
    setIsTutorTyping(true);

    try {
      const { askRealTutor } = await import("../tutor/tutorApi");
      const reply = await askRealTutor(
        prompt,
        lesson.title,
        sources.map((source) => source.title),
        tutorMessages, // old history
        byok
      );
      setTutorMessages([...newHistory, { role: "tutor", text: reply }]);
    } catch (err) {
      setTutorMessages([...newHistory, { role: "tutor", text: "Tutor error: Please check your BYOK settings and API key." }]);
    } finally {
      setIsTutorTyping(false);
    }
  }

  return (
    <section className="lesson-shell">
      <div className="lesson-main">
        <p className="eyebrow">FME lesson {lesson.id}</p>
        <h1>{lesson.title}</h1>
        <div className="tab-strip" role="tablist" aria-label="Lesson workspace areas">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "learn"}
            className={activeTab === "learn" ? "tab active" : "tab"}
            onClick={() => setActiveTab("learn")}
          >
            <PlayCircle size={15} /> Learn
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "sources"}
            className={activeTab === "sources" ? "tab active" : "tab"}
            onClick={() => setActiveTab("sources")}
          >
            <BookOpen size={15} /> Sources ({sources.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "practice"}
            className={activeTab === "practice" ? "tab active" : "tab"}
            onClick={() => setActiveTab("practice")}
          >
            <Wrench size={15} /> Practice
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "build"}
            className={activeTab === "build" ? "tab active" : "tab"}
            onClick={() => setActiveTab("build")}
          >
            <FileText size={15} /> Build {artifact ? "Artifact" : ""}
          </button>
        </div>

        {activeTab === "learn" && (
          <>
            <article className="workspace-panel">
              <h2>Objective</h2>
              <p>{lesson.objective}</p>
              <h2>Transcript</h2>
              <p>{lesson.transcript}</p>
              <div className="source-chip-row" style={{ marginTop: "1rem" }}>
                <span>{sources.length} mapped sources</span>
                <span>Artifact: {artifact?.title ?? "Lesson note"}</span>
              </div>
            </article>

            <article className="workspace-panel">
              <h2>Video reference</h2>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  borderRadius: "12px",
                  background: "var(--panel-strong)",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    padding: "20px",
                  }}
                >
                  <PlayCircle size={48} style={{ color: "var(--blue)", marginBottom: "10px" }} />
                  <p style={{ margin: 0, fontWeight: 600 }}>Lesson Video Playback Placeholder</p>
                  <p style={{ margin: 0, fontSize: "0.85rem" }}>
                    The transcript below serves as the canonical content for this local workspace.
                  </p>
                </div>
              </div>
            </article>

            {quiz && (
              <article className="workspace-panel">
                <h2>Check Understanding (Quiz)</h2>
                <p>{quiz.prompt}</p>
                <div className="choice-list">
                  {quiz.choices.map((choice, index) => (
                    <button
                      key={choice}
                      className={quizAnswer === index ? "choice selected" : "choice"}
                      type="button"
                      onClick={() => {
                        setQuizAnswer(index);
                        if (index === quiz.answerIndex) completeQuiz(lesson.id);
                      }}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
                {quizAnswer !== null && (
                  <p
                    style={{ marginTop: "1rem" }}
                    className={quizAnswer === quiz.answerIndex ? "success-text" : "form-error"}
                  >
                    {quizAnswer === quiz.answerIndex
                      ? quiz.feedback
                      : "Not quite. Recheck how outcome and trajectory signals differ."}
                  </p>
                )}
              </article>
            )}
          </>
        )}

        {activeTab === "sources" && (
          <article className="workspace-panel">
            <h2>Source Drawer</h2>
            <p>Mapped primary sources and papers to support lesson concepts.</p>
            <div className="source-list">
              {sources.map((source) => (
                <a key={source.id} className="source-card" href={source.url} target="_blank" rel="noreferrer">
                  <strong>{source.title}</strong>
                  <span>
                    {source.organization} · {source.type} · {source.required ? "Required" : "Optional"}
                  </span>
                </a>
              ))}
              {sources.length === 0 && <p className="muted">No sources are mapped to this lesson.</p>}
            </div>
          </article>
        )}

        {activeTab === "practice" && (
          <form className="workspace-panel" onSubmit={handlePractice}>
            <h2>Practice Task</h2>
            <p>{lesson.practicePrompt}</p>
            <textarea
              name="practice"
              rows={5}
              defaultValue={progress.practice[lesson.id] ?? ""}
              placeholder="Write your evaluator judgment..."
              aria-label="Practice judgment"
            />
            <button className="button" type="submit" style={{ marginTop: "1rem" }}>
              Save practice response
            </button>
          </form>
        )}

        {activeTab === "build" &&
          (artifact ? (
            <form className="workspace-panel" onSubmit={handleArtifact}>
              <h2>Build artifact: {artifact.title}</h2>
              <p>{artifact.prompt}</p>
              <textarea
                rows={8}
                value={artifactText}
                onChange={(event) => setArtifactText(event.target.value)}
                aria-label="Build artifact text"
              />
              {rubric && (
                <div
                  style={{ marginTop: "1rem", padding: "12px", background: "var(--panel-strong)", borderRadius: "8px" }}
                >
                  <strong>Rubric Criteria:</strong>
                  <ul style={{ margin: "5px 0 0 0", paddingLeft: "20px" }}>
                    {rubric.criteria.map((criterion) => (
                      <li key={criterion.id} className="muted" style={{ fontSize: "0.85rem" }}>
                        {criterion.label} (Points: {criterion.maxScore})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button className="button" type="submit" style={{ marginTop: "1rem" }}>
                Submit artifact for review
              </button>
            </form>
          ) : (
            <article className="workspace-panel">
              <h2>Build</h2>
              <p className="muted">
                No build artifact is required for this lesson. Complete the practice tasks or check mapped sources to
                reinforce learning.
              </p>
            </article>
          ))}
      </div>
      <aside className="tutor-panel">
        <Sparkles size={18} />
        <h2>Grounded mock tutor</h2>
        <p>
          {keyReady ? `${byok.provider} / ${byok.model}` : "Add a browser-only key or switch to mock mode."} This sprint
          keeps tutor responses in mock mode with source grounding. BYOK keys are never stored in Supabase.
        </p>
        <div className="prompt-grid">
          {["Explain simply", "Quiz me", "Help with artifact", "Cite sources", "Show visual anchor"].map((prompt) => (
            <button key={prompt} className="tab" type="button" onClick={() => askTutor(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
        <div className="message-list" aria-live="polite">
          {tutorMessages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={message.role === "learner" ? "message learner-message" : "message tutor-message"}
            >
              {message.text}
            </div>
          ))}
        </div>
        <form
          className="tutor-compose"
          onSubmit={(event) => {
            event.preventDefault();
            if (tutorInput.trim()) askTutor(tutorInput);
          }}
        >
          <input
            value={tutorInput}
            onChange={(event) => setTutorInput(event.target.value)}
            placeholder="Ask from lesson context..."
          />
          <button className="button secondary" type="submit">
            Ask
          </button>
        </form>
      </aside>
    </section>
  );
}
