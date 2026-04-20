import { useResume } from "@/hooks/use-resume";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Rss } from "lucide-react";

export default function Blog() {
  const { data: resume, isLoading } = useResume();

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!resume) return null;

  const posts = resume.blog ?? [];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 inline-flex items-center gap-3" data-testid="heading-blog">
            <Rss className="h-9 w-9" />
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Notes, essays, and updates on AI, machine learning, and economics.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground" data-testid="text-blog-empty">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 hover-elevate transition-all" data-testid={`blog-post-${post.id}`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <h2 className="text-2xl font-semibold leading-tight" data-testid={`blog-post-title-${post.id}`}>
                    {post.title}
                  </h2>
                  <Badge variant="secondary">{post.date}</Badge>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.summary}
                </p>
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline inline-flex items-center"
                    data-testid={`blog-post-link-${post.id}`}
                  >
                    Read More
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
