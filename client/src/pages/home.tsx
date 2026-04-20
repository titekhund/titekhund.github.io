import { useResume } from "@/hooks/use-resume";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, BookOpen, FileDown, Rss } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: resume, isLoading } = useResume();
  const cvUrl = "/assets/CV_Tato_Khundadze.pdf";

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-16 w-3/4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-64 w-64 rounded-full mx-auto" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!resume) return null;

  const featuredPublications = resume.publications.slice(0, 3);
  const blogPosts = resume.blog ?? [];
  const featuredBlog = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4" data-testid="text-name">
                  {resume.name}
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-primary mb-2" data-testid="text-title">
                  {resume.title}
                </p>
                <p className="text-lg md:text-xl text-muted-foreground" data-testid="text-tagline">
                  {resume.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/publications"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }))}
                  data-testid="button-view-publications"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Publications
                </Link>
                <a
                  href={cvUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
                  data-testid="button-download-cv-pdf"
                >
                  <FileDown className="mr-2 h-5 w-5" />
                  Download CV (PDF)
                </a>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href={resume.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate rounded-md p-2"
                  aria-label="GitHub"
                  data-testid="link-github"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href={resume.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate rounded-md p-2"
                  aria-label="LinkedIn"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href={`mailto:${resume.email}`}
                  className="hover-elevate rounded-md p-2"
                  aria-label="Email"
                  data-testid="link-email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8" data-testid="heading-about">
            About
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl" data-testid="text-profile">
            {resume.profile}
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Education</h3>
              <div className="space-y-3">
                {resume.education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.programming.slice(0, 6).map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Recognition</h3>
              <div className="space-y-3">
                {resume.awards.slice(0, 2).map((award) => (
                  <div key={award.id}>
                    <p className="font-medium text-sm">{award.name}</p>
                    <p className="text-sm text-muted-foreground">{award.year}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" data-testid="heading-featured-publications">
              Featured Publications
            </h2>
            <Link 
              href="/publications"
              className={cn(buttonVariants({ variant: "ghost" }))}
              data-testid="button-all-publications"
            >
              View All
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-6">
            {featuredPublications.map((pub) => (
              <Card key={pub.id} className="p-6 hover-elevate transition-all">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" data-testid={`pub-title-${pub.id}`}>
                      {pub.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{pub.authors}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{pub.year}</Badge>
                    <Badge variant="outline">{pub.type}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{pub.venue}</p>
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline inline-flex items-center"
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
      </section>

      {featuredBlog.length > 0 && (
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" data-testid="heading-featured-blog">
                <Rss className="inline-block mr-2 h-7 w-7 align-[-4px]" />
                Latest from the Blog
              </h2>
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: "ghost" }))}
                data-testid="button-all-blog"
              >
                View All
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlog.map((post) => (
                <Card key={post.id} className="p-6 hover-elevate transition-all" data-testid={`blog-card-${post.id}`}>
                  <Badge variant="secondary" className="mb-3">{post.date}</Badge>
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2" data-testid={`blog-title-${post.id}`}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                  {post.link && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline inline-flex items-center"
                      data-testid={`blog-link-${post.id}`}
                    >
                      Read More
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
