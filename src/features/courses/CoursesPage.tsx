import { ArrowRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { fmeCourse } from "../../data/fme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">Course Catalog</p>
        <h1 className="text-3xl font-bold tracking-tight mb-2">OpenEd courses</h1>
        <p className="text-muted-foreground">FME is seeded as a demo preview while the platform remains broader than one runtime.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col border-primary/20 shadow-md">
          <CardHeader>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">{fmeCourse.eyebrow}</p>
            <CardTitle>{fmeCourse.title}</CardTitle>
            <CardDescription className="text-foreground">{fmeCourse.promise}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex gap-4 text-sm text-muted-foreground font-medium">
              <span>{fmeCourse.hours} hours</span>
              <span>{fmeCourse.lessons} lessons</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/courses/fme">
                View course <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col bg-muted/50 border-dashed justify-center items-center text-center p-6">
          <LockKeyhole className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <CardTitle className="mb-2">More courses coming soon</CardTitle>
          <CardDescription>
            New courses will be source-mapped, QA reviewed, and approved by the OpenEd Team before publishing through the Educator Studio.
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}
