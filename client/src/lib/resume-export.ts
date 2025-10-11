import { jsPDF } from "jspdf";
import type { ResumeData } from "@/hooks/use-resume";

interface Section {
  title: string;
  entries: string[];
}

export function downloadResumePdf(resume: ResumeData, filename = "Tato_Khundadze_CV.pdf") {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  const baseLineHeight = 16;

  let cursorY = margin;

  const ensureSpace = (heightNeeded: number) => {
    if (cursorY + heightNeeded > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
    }
  };

  const writeLines = (
    lines: string[],
    options?: { fontSize?: number; bold?: boolean; leading?: number; indent?: number }
  ) => {
    const fontSize = options?.fontSize ?? 11;
    const leading = options?.leading ?? baseLineHeight;
    const indent = options?.indent ?? 0;

    doc.setFontSize(fontSize);
    doc.setFont("helvetica", options?.bold ? "bold" : "normal");

    lines.forEach((line) => {
      ensureSpace(leading);
      doc.text(line, margin + indent, cursorY);
      cursorY += leading;
    });
  };

  const addSection = ({ title, entries }: Section) => {
    if (!entries.length) return;

    ensureSpace(baseLineHeight * 2);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(title.toUpperCase(), margin, cursorY);
    cursorY += baseLineHeight + 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    entries.forEach((entry) => {
      const segments = entry
        .split("\n")
        .map((segment) => segment.trim())
        .filter((segment) => segment.length > 0);

      segments.forEach((segment) => {
        const isBullet = segment.startsWith("•");
        const indent = isBullet ? 12 : 0;
        const wrapped = doc.splitTextToSize(segment, contentWidth - indent);
        writeLines(wrapped, { leading: baseLineHeight, indent });
      });

      cursorY += 6;
    });

    cursorY += 4;
  };

  const sections: Section[] = [
    {
      title: "Profile",
      entries: [resume.profile],
    },
    {
      title: "Education",
      entries: resume.education.map((edu) => {
        const details = [edu.institution, edu.location].filter(Boolean).join(" • ");
        const suffix = [edu.year, edu.details].filter(Boolean).join(" — ");
        return `${edu.degree}${details ? ` — ${details}` : ""}${suffix ? ` (${suffix})` : ""}`;
      }),
    },
    {
      title: "Research Projects",
      entries: resume.research.map((project) => {
        const summary = project.summary ? ` — ${project.summary}` : "";
        const tech = project.tech?.length ? ` [${project.tech.join(", ")}]` : "";
        return `${project.title} (${project.year})${summary}${tech}`;
      }),
    },
    {
      title: "Publications",
      entries: resume.publications.map((pub) => {
        const venueParts = [pub.venue, pub.type, pub.status].filter(Boolean).join(" • ");
        const link = pub.link ? ` — ${pub.link}` : "";
        return `${pub.authors} (${pub.year}). ${pub.title}${venueParts ? ` — ${venueParts}` : ""}${link}`;
      }),
    },
    {
      title: "Teaching",
      entries: resume.teaching.map((teach) => {
        const context = [teach.institution, teach.term].filter(Boolean).join(" • ");
        const desc = teach.description ? ` — ${teach.description}` : "";
        return `${teach.course} (${teach.role})${context ? ` — ${context}` : ""}${desc}`;
      }),
    },
    {
      title: "Professional Experience",
      entries: resume.experience.map((exp) => {
        const period = [exp.startDate, exp.endDate].filter(Boolean).join(" – ");
        const header = `${exp.role} — ${exp.organization}`;
        const location = exp.location ? ` (${exp.location})` : "";
        const bullets = exp.details?.length ? `\n  • ${exp.details.join("\n  • ")}` : "";
        return `${header}${location}${period ? ` — ${period}` : ""}${bullets}`;
      }),
    },
    {
      title: "Skills",
      entries: [
        `Languages: ${resume.skills.languages.join(", ")}`,
        `Programming: ${resume.skills.programming.join(", ")}`,
        `Other: ${resume.skills.other.join(", ")}`,
      ],
    },
    {
      title: "Courses",
      entries: resume.courses.map((course) => `${course.name} — ${course.institution} (${course.year})`),
    },
    {
      title: "Awards",
      entries: resume.awards.map((award) => {
        const extras = [award.amount, award.description].filter(Boolean).join(" | ");
        return `${award.name} — ${award.organization} (${award.year})${extras ? ` — ${extras}` : ""}`;
      }),
    },
    {
      title: "References",
      entries: resume.references.map((ref) => {
        const org = [ref.organization, ref.title].filter(Boolean).join(" • ");
        return `${ref.name}${org ? ` — ${org}` : ""}${ref.email ? ` — ${ref.email}` : ""}`;
      }),
    },
  ];

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  writeLines([resume.name], { fontSize: 24, bold: true, leading: 28 });

  doc.setFont("helvetica", "normal");
  writeLines([
    `${resume.title}`,
    resume.tagline,
    `${resume.email} • ${resume.website}`,
    `${resume.social.linkedin} • ${resume.social.github}`,
  ], { fontSize: 11, leading: 16 });

  cursorY += 12;

  sections.forEach(addSection);

  doc.save(filename);
}
