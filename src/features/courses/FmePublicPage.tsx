import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fmeCourse, fmeModules } from "../../data/fme";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

export function FmePublicPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">{fmeCourse.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{fmeCourse.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{fmeCourse.promise}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/learn/courses/fme">
                Start learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/settings/byok">Set up BYOK</Link>
            </Button>
          </div>
        </div>

        <Card className="bg-card shadow-lg">
          <CardContent className="p-6 md:p-8 space-y-6">
            <h3 className="font-semibold text-xl mb-4">Course Curriculum</h3>
            <div className="space-y-4">
              {fmeModules.map((phase) => (
                <div key={phase.id} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-foreground">{phase.title}</span>
                    <span className="text-muted-foreground font-mono">{phase.id.toUpperCase()}</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
