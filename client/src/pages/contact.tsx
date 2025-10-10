import { useResume } from "@/hooks/use-resume";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Globe, Github, Linkedin, User, Send } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { data: resume, isLoading } = useResume();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6"
            data-testid="contact-form"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  data-testid="input-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  data-testid="input-email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="What is this regarding?"
                data-testid="input-subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="Your message..."
                rows={6}
                data-testid="textarea-message"
              />
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Note:</strong> To enable this contact form, replace <code className="bg-background px-1 rounded">YOUR_FORM_ID</code> in the form action with your Formspree form ID. 
                Get one free at <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">formspree.io</a>.
              </p>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              data-testid="button-submit"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>

        <Card className="p-8 bg-card/50 mt-8">
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
