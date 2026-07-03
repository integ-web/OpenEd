import { ArrowRight, BookOpen, Sparkles, Layout, ShieldCheck, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-background px-4 py-16">
      <div className="max-w-4xl text-center space-y-8">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">Frontier Model Evaluation</p>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Learn to prove frontier AI is safe enough to ship
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A 51-hour video-first course on threat models, benchmarks, red teaming, harnesses, evidence, and release
          decisions for frontier AI systems.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/courses/fme">
              Start learning <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link to="/courses/fme">Preview the course</Link>
          </Button>
        </div>
      </div>

      {/* Feature grid below hero */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <PlayCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">6-Phase Video Path</h3>
          <p className="text-sm text-muted-foreground">
            Structured Coursera-style video learning focusing on evaluator training.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">AI Coach</h3>
          <p className="text-sm text-muted-foreground">
            A built-in BYOK AI tutor that helps you understand threat models and evaluate artifacts.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">Artifact Portfolio</h3>
          <p className="text-sm text-muted-foreground">
            Every phase produces tangible evidence for a capstone release decision.
          </p>
        </div>
      </div>
    </div>
  );
}
