import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { FileCode2, FileDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useResume } from "@/hooks/use-resume";

const CV_PDF_URL = "/assets/CV_Tato_Khundadze.pdf";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: resume } = useResume();
  const hasBlog = (resume?.blog?.length ?? 0) > 0;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/publications", label: "Publications" },
    { path: "/teaching", label: "Teaching" },
    { path: "/experience", label: "Experience" },
    { path: "/contact", label: "Contact" },
    ...(hasBlog ? [{ path: "/blog", label: "Blog" }] : []),
  ];

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/"
            className="text-xl font-bold tracking-tight hover-elevate rounded-md px-2 py-1"
            data-testid="link-home"
          >
            Tato Khundadze
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                  isActive(item.path)
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild data-testid="button-download-cv">
              <a href={CV_PDF_URL} download target="_blank" rel="noopener noreferrer">
                <FileDown className="mr-2 h-4 w-4" />
                Download CV (PDF)
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild data-testid="button-download-cv-json">
              <a href="/data/resume.json" download="Tato_Khundadze_CV.json">
                <FileCode2 className="mr-2 h-4 w-4" />
                CV Data (JSON)
              </a>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 pt-2 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`block px-3 py-2 text-sm font-medium rounded-md hover-elevate ${
                  isActive(item.path)
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground"
                }`}
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                  data-testid="button-download-cv-mobile"
                >
                  <a href={CV_PDF_URL} download target="_blank" rel="noopener noreferrer">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download CV (PDF)
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="w-full" asChild data-testid="button-download-cv-json-mobile">
                  <a href="/data/resume.json" download="Tato_Khundadze_CV.json">
                    <FileCode2 className="mr-2 h-4 w-4" />
                    CV Data (JSON)
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
