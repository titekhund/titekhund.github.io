import { useResume } from "@/hooks/use-resume";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, GraduationCap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function About() {
  const { data: resume, isLoading } = useResume();

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-48 w-full mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" data-testid="heading-about">
            About Me
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground" data-testid="text-bio">
              {resume.profile}
            </p>
          </div>
        </div>

        {/* Education */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight" data-testid="heading-education">
              Education
            </h2>
          </div>

          <div className="space-y-6">
            {resume.education.map((edu, idx) => (
              <Card key={idx} className="p-6" data-testid={`education-${idx}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" data-testid={`edu-degree-${idx}`}>
                      {edu.degree}
                    </h3>
                    <p className="text-muted-foreground mb-1">
                      {edu.institution}
                    </p>
                    {edu.location && (
                      <p className="text-sm text-muted-foreground">
                        {edu.location}
                      </p>
                    )}
                    {edu.details && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {edu.details}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {edu.year}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight" data-testid="heading-skills">
              Skills & Expertise
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.languages.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Programming & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.programming.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Other Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.other.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Professional Development */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-8" data-testid="heading-courses">
            Professional Development
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resume.courses.map((course) => (
              <Card key={course.id} className="p-6" data-testid={`course-${course.id}`}>
                <h3 className="font-semibold text-lg mb-2" data-testid={`course-name-${course.id}`}>
                  {course.name}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {course.institution}
                </p>
                <Badge variant="outline">{course.year}</Badge>
              </Card>
            ))}
          </div>
        </section>

        {/* Awards & Recognition */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight" data-testid="heading-awards-about">
              Awards & Recognition
            </h2>
          </div>

          <div className="space-y-6">
            {resume.awards.map((award) => (
              <Card key={award.id} className="p-6" data-testid={`award-about-${award.id}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" data-testid={`award-name-about-${award.id}`}>
                      {award.name}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {award.organization}
                    </p>
                    {award.description && (
                      <p className="text-sm text-muted-foreground">
                        {award.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {award.year}
                    </Badge>
                    {award.amount && (
                      <p className="text-sm font-semibold text-primary">
                        {award.amount}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
