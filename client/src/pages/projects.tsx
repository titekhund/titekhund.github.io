import { useResume } from "@/hooks/use-resume";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Projects() {
  const { data: resume, isLoading } = useResume();

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="heading-projects">
            Research Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Current and ongoing research projects exploring machine learning applications
            in macroeconomic modeling and economic dynamics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resume.research.map((project) => (
            <Card key={project.id} className="p-8 hover-elevate transition-all" data-testid={`project-${project.id}`}>
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" className="text-sm">
                  {project.year}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {project.institution}
                </Badge>
              </div>

              <h2 className="text-2xl font-semibold mb-4 leading-tight" data-testid={`project-title-${project.id}`}>
                {project.title}
              </h2>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.summary}
              </p>

              <div>
                <p className="text-sm font-medium mb-2">Technologies & Methods</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
