import { useResume } from "@/hooks/use-resume";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Publications() {
  const { data: resume, isLoading } = useResume();
  const [filter, setFilter] = useState<string>("all");

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!resume) return null;

  const publicationTypes = ["all", ...Array.from(new Set(resume.publications.map(p => p.type)))];
  const filteredPublications = filter === "all" 
    ? resume.publications 
    : resume.publications.filter(p => p.type === filter);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="heading-publications">
            Publications
          </h1>
          <p className="text-lg text-muted-foreground">
            Academic publications, working papers, and policy reports spanning macroeconomics,
            machine learning, and economic policy analysis.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {publicationTypes.map((type) => (
            <Badge
              key={type}
              variant={filter === type ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => setFilter(type)}
              data-testid={`filter-${type}`}
            >
              {type === "all" ? "All Publications" : type}
            </Badge>
          ))}
        </div>

        <div className="space-y-6">
          {filteredPublications.map((pub) => (
            <Card key={pub.id} className="p-6 hover-elevate transition-all" data-testid={`publication-${pub.id}`}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex gap-2">
                  <Badge variant="secondary">{pub.year}</Badge>
                  <Badge variant="outline">{pub.type}</Badge>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-semibold mb-3 leading-tight" data-testid={`pub-title-${pub.id}`}>
                {pub.title}
              </h2>

              <p className="text-sm text-muted-foreground mb-2">{pub.authors}</p>
              
              {pub.venue && (
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  {pub.venue}
                </p>
              )}

              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline inline-flex items-center font-medium"
                  data-testid={`pub-link-${pub.id}`}
                >
                  View Publication
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
