import { BookOpen, FileText, PlayCircle, Sparkles, Wrench, Send, CheckCircle2 } from "lucide-react";
import { FormEvent, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getArtifactForLesson,
  getFmeLesson,
  getQuizForLesson,
  getRubricForArtifact,
  getSourcesForLesson,
} from "../../data/fme";
import { useProof } from "../proof/useProof";
import { hasBrowserKey } from "../tutor/byokStore";
import { useTutorPreferences } from "../tutor/useTutorPreferences";
import { useFmeProgress } from "./useFmeProgress";

import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Badge } from "../../components/ui/badge";

export function LessonWorkspacePage() {
  const { lessonId } = useParams();
  const lesson = getFmeLesson(lessonId);
  const sources = getSourcesForLesson(lesson.id);
  const quiz = getQuizForLesson(lesson.id);
  const artifact = getArtifactForLesson(lesson.id);
  const rubric = artifact ? getRubricForArtifact(artifact.id) : undefined;
  
  const { progress, savePractice, completeQuiz, submitArtifact } = useFmeProgress();
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [artifactText, setArtifactText] = useState(progress.artifacts[lesson.id] ?? artifact?.template ?? "");
  
  const [tutorInput, setTutorInput] = useState("");
  const [tutorMessages, setTutorMessages] = useState<Array<{ role: "learner" | "tutor"; text: string }>>([
    {
      role: "tutor",
      text: `I can help with ${lesson.title}. I am grounded in this lesson's objective: "${lesson.objective}". Ask me anything!`,
    },
  ]);
  const [isTutorTyping, setIsTutorTyping] = useState(false);
  
  const { preferences: byok } = useTutorPreferences();
  const keyReady = hasBrowserKey() || byok.provider === "mock";
  const { submitArtifact: submitProofArtifact } = useProof();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [tutorMessages]);

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
        tutorMessages,
        byok
      );
      setTutorMessages([...newHistory, { role: "tutor", text: reply }]);
    } catch (err) {
      setTutorMessages([...newHistory, { role: "tutor", text: "Tutor error: Please check your BYOK settings." }]);
    } finally {
      setIsTutorTyping(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Lesson {lesson.id}</p>
            <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
            <p className="text-muted-foreground">{lesson.objective}</p>
          </div>

          <Tabs defaultValue="learn" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="learn"><PlayCircle className="w-4 h-4 mr-2" /> Learn</TabsTrigger>
              <TabsTrigger value="sources"><BookOpen className="w-4 h-4 mr-2" /> Sources</TabsTrigger>
              <TabsTrigger value="practice"><Wrench className="w-4 h-4 mr-2" /> Practice</TabsTrigger>
              <TabsTrigger value="build"><FileText className="w-4 h-4 mr-2" /> Build</TabsTrigger>
            </TabsList>
            
            <TabsContent value="learn" className="mt-6 space-y-6">
              <Card>
                <div className="aspect-video bg-muted flex items-center justify-center rounded-t-lg relative">
                  <PlayCircle className="w-16 h-16 text-muted-foreground/50" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary">Play Lesson Video</Button>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Transcript</h3>
                  <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                    {lesson.transcript}
                  </div>
                </CardContent>
              </Card>

              {quiz && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Check Understanding</CardTitle>
                    <CardDescription>{quiz.prompt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {quiz.choices.map((choice, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setQuizAnswer(index);
                            if (index === quiz.answerIndex) completeQuiz(lesson.id);
                          }}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            quizAnswer === index 
                              ? index === quiz.answerIndex 
                                ? 'border-primary bg-primary/5' 
                                : 'border-destructive bg-destructive/5'
                              : 'hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              quizAnswer === index 
                                ? index === quiz.answerIndex ? 'border-primary text-primary' : 'border-destructive text-destructive'
                                : 'border-muted-foreground'
                            }`}>
                              {quizAnswer === index && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                            <span className="text-sm">{choice}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {quizAnswer !== null && (
                      <p className={`mt-4 text-sm font-medium ${quizAnswer === quiz.answerIndex ? "text-primary" : "text-destructive"}`}>
                        {quizAnswer === quiz.answerIndex ? quiz.feedback : "Not quite. Try reviewing the transcript."}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="sources" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Source Drawer</CardTitle>
                  <CardDescription>Mapped primary sources and papers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sources.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No sources are mapped to this lesson.</p>
                  ) : (
                    sources.map((source) => (
                      <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="block p-4 rounded-lg border hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{source.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{source.organization} · {source.type}</p>
                          </div>
                          <Badge variant={source.required ? "default" : "secondary"}>
                            {source.required ? "Required" : "Optional"}
                          </Badge>
                        </div>
                      </a>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="mt-6">
              <Card>
                <form onSubmit={handlePractice}>
                  <CardHeader>
                    <CardTitle>Practice Task</CardTitle>
                    <CardDescription>{lesson.practicePrompt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      name="practice"
                      rows={6}
                      defaultValue={progress.practice[lesson.id] ?? ""}
                      placeholder="Write your evaluator judgment..."
                      className="resize-none"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Practice Response</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="build" className="mt-6">
              {artifact ? (
                <Card>
                  <form onSubmit={handleArtifact}>
                    <CardHeader>
                      <CardTitle>Build Artifact: {artifact.title}</CardTitle>
                      <CardDescription>{artifact.prompt}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Textarea
                        rows={10}
                        value={artifactText}
                        onChange={(e) => setArtifactText(e.target.value)}
                        className="font-mono text-sm resize-y"
                      />
                      
                      {rubric && (
                        <div className="p-4 bg-muted rounded-lg border">
                          <h4 className="font-semibold text-sm mb-3">Rubric Criteria</h4>
                          <ul className="space-y-2">
                            {rubric.criteria.map((c) => (
                              <li key={c.id} className="text-sm text-muted-foreground flex justify-between">
                                <span>• {c.label}</span>
                                <span className="font-medium">{c.maxScore} pts</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Submit for Review</Button>
                    </CardFooter>
                  </form>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No build artifact required for this lesson.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Tutor Right Rail */}
      <div className="w-80 lg:w-96 border-l bg-card flex flex-col hidden md:flex">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">AI Coach</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {keyReady ? `Connected via ${byok.provider}` : "Add a BYOK key in settings."} Fully grounded in current lesson context.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {tutorMessages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'learner' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                m.role === 'learner' 
                  ? 'bg-primary text-primary-foreground rounded-br-none' 
                  : 'bg-muted text-foreground rounded-bl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTutorTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg p-3 text-sm bg-muted text-foreground rounded-bl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-background">
          <div className="flex flex-wrap gap-2 mb-4">
            {["Explain simply", "Quiz me", "Cite sources"].map((prompt) => (
              <Badge key={prompt} variant="secondary" className="cursor-pointer hover:bg-secondary/80" onClick={() => askTutor(prompt)}>
                {prompt}
              </Badge>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (tutorInput.trim()) askTutor(tutorInput); }} className="flex gap-2">
            <Input 
              value={tutorInput}
              onChange={(e) => setTutorInput(e.target.value)}
              placeholder="Ask the AI Coach..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isTutorTyping || !tutorInput.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
