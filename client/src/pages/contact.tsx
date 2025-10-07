import { useResume } from "@/hooks/use-resume";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Globe, Github, Linkedin, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Contact() {
  const { data: resume, isLoading } = useResume();

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="heading-contact">
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Feel free to reach out for collaborations, research opportunities, or inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${resume.email}`}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    data-testid="contact-email"
                  >
                    {resume.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Website</p>
                  <a
                    href={resume.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    data-testid="contact-website"
                  >
                    {resume.website.replace('https://', '')}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <p className="text-sm font-medium text-muted-foreground mb-4">Connect on Social</p>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" asChild data-testid="contact-github">
                  <a
                    href={resume.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild data-testid="contact-linkedin">
                  <a
                    href={resume.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild data-testid="contact-email-icon">
                  <a
                    href={`mailto:${resume.email}`}
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Academic References</h2>
            <div className="space-y-6">
              {resume.references.map((ref, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold" data-testid={`ref-name-${idx}`}>
                      {ref.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {ref.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {ref.organization}
                    </p>
                    <a
                      href={`mailto:${ref.email}`}
                      className="text-sm text-accent hover:underline mt-1 inline-block"
                      data-testid={`ref-email-${idx}`}
                    >
                      {ref.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-card/50">
          <h2 className="text-2xl font-semibold mb-4">Research Interests</h2>
          <p className="text-muted-foreground leading-relaxed">
            I'm particularly interested in collaborations involving machine learning applications
            in macroeconomic modeling, deep reinforcement learning for economic policy, and
            data-driven approaches to understanding economic dynamics. If you're working on
            similar projects or have opportunities in these areas, I'd love to hear from you.
          </p>
        </Card>
      </div>
    </div>
  );
}
