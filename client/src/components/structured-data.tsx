import { useEffect } from "react";
import { useResume } from "@/hooks/use-resume";

export function StructuredData() {
  const { data: resume } = useResume();

  useEffect(() => {
    if (!resume) return;

    // Person Schema
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: resume.name,
      jobTitle: resume.title,
      description: resume.tagline,
      email: resume.email,
      url: resume.website,
      sameAs: [
        resume.social.linkedin,
        resume.social.github,
      ],
      alumniOf: resume.education.map(edu => ({
        "@type": "EducationalOrganization",
        name: edu.institution,
      })),
      knowsAbout: [
        "Economics",
        "Machine Learning",
        "Macroeconomics",
        "Deep Reinforcement Learning",
        "Economic Modeling",
        "Data Science",
      ],
    };

    // Publications Schema
    const publicationsSchema = resume.publications.map(pub => ({
      "@context": "https://schema.org",
      "@type": pub.type.includes("Journal") ? "ScholarlyArticle" : "Article",
      headline: pub.title,
      author: pub.authors.split(",").map(name => ({
        "@type": "Person",
        name: name.trim(),
      })),
      datePublished: pub.year.toString(),
      publisher: {
        "@type": "Organization",
        name: pub.venue,
      },
      url: pub.link || undefined,
    }));

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: window.location.origin + "/",
        },
      ],
    };

    // Create script elements
    const personScript = document.createElement("script");
    personScript.type = "application/ld+json";
    personScript.text = JSON.stringify(personSchema);
    
    const publicationsScript = document.createElement("script");
    publicationsScript.type = "application/ld+json";
    publicationsScript.text = JSON.stringify(publicationsSchema);

    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);

    document.head.appendChild(personScript);
    document.head.appendChild(publicationsScript);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.head.removeChild(personScript);
      document.head.removeChild(publicationsScript);
      document.head.removeChild(breadcrumbScript);
    };
  }, [resume]);

  return null;
}
