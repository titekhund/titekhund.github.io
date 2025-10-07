import { useResume } from "@/hooks/use-resume";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Experience() {
  const { data: resume, isLoading } = useResume();

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="heading-experience">
            Work Experience
          </h1>
          <p className="text-lg text-muted-foreground">
            Professional experience spanning academic research, policy consulting,
            and data analysis at leading institutions.
          </p>
        </div>

        <div className="space-y-8">
          {resume.experience.map((exp) => (
            <Card key={exp.id} className="p-6 hover-elevate transition-all" data-testid={`experience-${exp.id}`}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h2 className="text-xl font-semibold mb-1" data-testid={`exp-role-${exp.id}`}>
                        {exp.role}
                      </h2>
                      <p className="text-muted-foreground">
                        {exp.organization}
                      </p>
                      {exp.location && (
                        <p className="text-sm text-muted-foreground">
                          {exp.location}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary">
                      {exp.startDate} - {exp.endDate}
                    </Badge>
                  </div>

                  {exp.details && exp.details.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-accent mr-2 mt-1">•</span>
                          <span className="flex-1">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Awards & Recognition */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-8" data-testid="heading-awards">
            Awards & Scholarships
          </h2>
          <div className="space-y-6">
            {resume.awards.map((award) => (
              <Card key={award.id} className="p-6" data-testid={`award-${award.id}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2" data-testid={`award-name-${award.id}`}>
                      {award.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {award.organization}
                    </p>
                    {award.description && (
                      <p className="text-sm text-muted-foreground">
                        {award.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{award.year}</Badge>
                    {award.amount && (
                      <p className="text-sm font-semibold text-primary mt-2">
                        {award.amount}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
