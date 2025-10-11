import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/30 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link 
                href="/about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded-md px-2 py-1" 
                data-testid="footer-link-about"
              >
                About
              </Link>
              <Link 
                href="/projects"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded-md px-2 py-1" 
                data-testid="footer-link-projects"
              >
                Research Projects
              </Link>
              <Link 
                href="/publications"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded-md px-2 py-1" 
                data-testid="footer-link-publications"
              >
                Publications
              </Link>
              <Link 
                href="/teaching"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded-md px-2 py-1" 
                data-testid="footer-link-teaching"
              >
                Teaching
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:khunt758@newschool.edu"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded-md px-2 py-1"
                data-testid="footer-email"
              >
                khunt758@newschool.edu
              </a>
              <a
                href="https://titekhund.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded-md px-2 py-1"
                data-testid="footer-website"
              >
                titekhund.github.io
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/titekhund"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate rounded-md p-2"
                aria-label="GitHub"
                data-testid="footer-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/tato-khundadze-7b8732145"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate rounded-md p-2"
                aria-label="LinkedIn"
                data-testid="footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:khunt758@newschool.edu"
                className="hover-elevate rounded-md p-2"
                aria-label="Email"
                data-testid="footer-email-icon"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Tato Khundadze. All rights reserved.</p>
          <p className="mt-1">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
