import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { FileCode2, FileDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useResume } from "@/hooks/use-resume";
import { downloadResumePdf } from "@/lib/resume-export";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: resume, isLoading: isResumeLoading } = useResume();
  const { toast } = useToast();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/publications", label: "Publications" },
    { path: "/teaching", label: "Teaching" },
    { path: "/experience", label: "Experience" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleDownloadResume = () => {
    if (!resume) {
      toast({
        title: "Resume not ready",
        description: "Please wait a moment and try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      downloadResumePdf(resume);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Failed to generate resume PDF", error);
      toast({
        title: "Download failed",
        description: "We couldn't generate the CV PDF. Please try again later.",
        variant: "destructive",
      });
    }
  };

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
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadResume}
              disabled={isResumeLoading}
              data-testid="button-download-cv"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download CV (PDF)
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
                  onClick={handleDownloadResume}
                  disabled={isResumeLoading}
                  data-testid="button-download-cv-mobile"
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Download CV (PDF)
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
