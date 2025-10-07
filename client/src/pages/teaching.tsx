import { useResume } from "@/hooks/use-resume";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Teaching() {
  const { data: resume, isLoading } = useResume();

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="heading-teaching">
            Teaching Experience
          </h1>
          <p className="text-lg text-muted-foreground">
            Courses taught across econometrics, statistics, machine learning, and economic theory
            at leading institutions.
          </p>
        </div>

        <div className="space-y-6">
          {resume.teaching.map((course) => (
            <Card key={course.id} className="p-6 hover-elevate transition-all" data-testid={`course-${course.id}`}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                    <div>
                      <h2 className="text-xl font-semibold mb-1" data-testid={`course-title-${course.id}`}>
                        {course.course}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {course.role} • {course.institution}
                      </p>
                    </div>
                    <Badge variant="secondary">{course.term}</Badge>
                  </div>

                  {course.description && (
                    <p className="text-sm text-muted-foreground mt-3">
                      {course.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Courses & Certifications */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-8" data-testid="heading-certifications">
            Professional Development
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resume.courses.map((course) => (
              <Card key={course.id} className="p-6">
                <h3 className="font-semibold mb-2" data-testid={`cert-title-${course.id}`}>
                  {course.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {course.institution}
                </p>
                <Badge variant="outline" className="mt-3">
                  {course.year}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
