import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ParsedCV {
  name: string;
  title: string;
  tagline: string;
  email: string;
  website: string;
  social: {
    linkedin: string;
    github: string;
  };
  profile: string;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    year: string;
    details: string;
  }>;
  research: Array<{
    id: string;
    title: string;
    year: string;
    institution: string;
    summary: string;
    tech: string[];
  }>;
  publications: Array<{
    id: string;
    authors: string;
    title: string;
    venue: string;
    year: number;
    status: string;
    type: string;
    link?: string;
  }>;
  teaching: Array<{
    id: string;
    course: string;
    institution: string;
    year: string;
    role: string;
    level: string;
    description: string;
  }>;
  experience: Array<{
    id: string;
    title: string;
    organization: string;
    location: string;
    period: string;
    description: string;
    type: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  references: Array<{
    name: string;
    title: string;
    organization: string;
    email: string;
  }>;
}

function parseCV(cvText: string): ParsedCV {
  const lines = cvText.split('\n').map(line => line.trim());
  
  const cv: ParsedCV = {
    name: "",
    title: "",
    tagline: "",
    email: "",
    website: "",
    social: { linkedin: "", github: "" },
    profile: "",
    education: [],
    research: [],
    publications: [],
    teaching: [],
    experience: [],
    skills: [],
    references: []
  };

  let currentSection = "";
  let currentItem: any = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!line) continue;

    // Detect sections (require colon or exact match to avoid false positives like "Research Scientist")
    if (line.match(/^(EDUCATION|RESEARCH|PUBLICATIONS|TEACHING|EXPERIENCE|SKILLS|REFERENCES|PROFILE|CONTACT):?\s*$/i)) {
      // Push current item before changing sections
      if (currentItem) {
        if (currentSection === 'EDUCATION') cv.education.push(currentItem);
        else if (currentSection === 'RESEARCH') cv.research.push(currentItem);
        else if (currentSection === 'PUBLICATIONS') cv.publications.push(currentItem);
        else if (currentSection === 'TEACHING') cv.teaching.push(currentItem);
        else if (currentSection === 'EXPERIENCE') cv.experience.push(currentItem);
        else if (currentSection === 'REFERENCES') cv.references.push(currentItem);
      }
      
      currentSection = line.toUpperCase().replace(':', '');
      currentItem = null;
      continue;
    }

    // Parse based on current section
    switch (currentSection) {
      case 'CONTACT':
        if (line.includes('@')) cv.email = line.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || "";
        if (line.includes('linkedin.com')) cv.social.linkedin = line;
        else if (line.includes('github.com')) cv.social.github = line;
        else if (line.match(/https?:\/\//) && !cv.website) cv.website = line;
        break;

      case 'PROFILE':
        cv.profile += (cv.profile ? " " : "") + line;
        break;

      case 'EDUCATION':
        if (line.match(/^(Ph\.?D|M\.?A|B\.?S|Masters?|Bachelors?)/i)) {
          if (currentItem) cv.education.push(currentItem);
          currentItem = {
            degree: line,
            institution: "",
            location: "",
            year: "",
            details: ""
          };
        } else if (currentItem) {
          if (!currentItem.institution) currentItem.institution = line;
          else if (!currentItem.year && line.match(/\d{4}/)) currentItem.year = line;
          else currentItem.details += (currentItem.details ? " " : "") + line;
        }
        break;

      case 'RESEARCH':
        if (line.startsWith('Tech:')) {
          if (currentItem) {
            currentItem.tech = line.replace('Tech:', '').split(',').map(s => s.trim());
          }
        } else if (!currentItem) {
          // Start a new research item with the first non-Tech line
          const yearMatch = line.match(/\((\d{4}(?:-\d{4})?)\)/);
          const year = yearMatch ? yearMatch[1] : "";
          const title = line.replace(/\s*\(\d{4}(?:-\d{4})?\)\s*/, '').trim();
          
          currentItem = {
            id: `research-${cv.research.length + 1}`,
            title: title || line,
            year: year,
            institution: "",
            summary: "",
            tech: []
          };
        } else if (currentItem && !currentItem.institution && line.match(/(University|Institute|Lab|School|College)/i)) {
          currentItem.institution = line;
        } else if (currentItem) {
          currentItem.summary += (currentItem.summary ? " " : "") + line;
        }
        break;

      case 'PUBLICATIONS':
        if (line.match(/^\d+\.|^•|^-/) || line.includes('(')) {
          if (currentItem) cv.publications.push(currentItem);
          const yearMatch = line.match(/\((\d{4})\)/);
          currentItem = {
            id: `pub-${cv.publications.length + 1}`,
            authors: "",
            title: line.replace(/^\d+\.|^•|^-/, '').trim(),
            venue: "",
            year: yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear(),
            status: "Published",
            type: "Journal Article"
          };
        } else if (currentItem && !currentItem.authors) {
          currentItem.authors = line;
        } else if (currentItem && !currentItem.venue) {
          currentItem.venue = line;
        }
        break;

      case 'TEACHING':
        if (line.match(/^[A-Z]/)) {
          if (currentItem) cv.teaching.push(currentItem);
          currentItem = {
            id: `teach-${cv.teaching.length + 1}`,
            course: line,
            institution: "",
            year: "",
            role: "Instructor",
            level: "Graduate",
            description: ""
          };
        } else if (currentItem && !currentItem.institution) {
          currentItem.institution = line;
        } else if (currentItem && line.match(/\d{4}/)) {
          currentItem.year = line;
        } else if (currentItem) {
          currentItem.description += (currentItem.description ? " " : "") + line;
        }
        break;

      case 'EXPERIENCE':
        if (line.match(/^[A-Z]/) && !line.match(/^\d/)) {
          if (currentItem) cv.experience.push(currentItem);
          currentItem = {
            id: `exp-${cv.experience.length + 1}`,
            title: line,
            organization: "",
            location: "",
            period: "",
            description: "",
            type: "Research"
          };
        } else if (currentItem && !currentItem.organization) {
          currentItem.organization = line;
        } else if (currentItem && line.match(/\d{4}/)) {
          currentItem.period = line;
        } else if (currentItem) {
          currentItem.description += (currentItem.description ? " " : "") + line;
        }
        break;

      case 'SKILLS':
        if (line.includes(':')) {
          const [category, items] = line.split(':');
          cv.skills.push({
            category: category.trim(),
            items: items.split(',').map(s => s.trim())
          });
        }
        break;

      case 'REFERENCES':
        if (line.match(/^[A-Z][a-z]+ [A-Z]/)) {
          if (currentItem) cv.references.push(currentItem);
          currentItem = {
            name: line,
            title: "",
            organization: "",
            email: ""
          };
        } else if (currentItem && line.includes('@')) {
          currentItem.email = line.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || "";
        } else if (currentItem && !currentItem.title) {
          currentItem.title = line;
        } else if (currentItem && !currentItem.organization) {
          currentItem.organization = line;
        }
        break;
    }
  }

  // Push last item
  if (currentItem) {
    if (currentSection === 'EDUCATION') cv.education.push(currentItem);
    else if (currentSection === 'RESEARCH') cv.research.push(currentItem);
    else if (currentSection === 'PUBLICATIONS') cv.publications.push(currentItem);
    else if (currentSection === 'TEACHING') cv.teaching.push(currentItem);
    else if (currentSection === 'EXPERIENCE') cv.experience.push(currentItem);
    else if (currentSection === 'REFERENCES') cv.references.push(currentItem);
  }

  // Extract name and title from first few lines if not in CONTACT
  if (!cv.name && lines[0]) cv.name = lines[0];
  if (!cv.title && lines[1]) cv.title = lines[1];
  if (!cv.tagline && lines[2]) cv.tagline = lines[2];

  return cv;
}

function main() {
  const args = process.argv.slice(2);
  const inputFile = args[0] || "cv.txt";
  const outputFile = args[1] || "client/src/data/resume.json";

  try {
    const cvPath = path.resolve(inputFile);
    if (!fs.existsSync(cvPath)) {
      console.error(`❌ Input file not found: ${cvPath}`);
      console.log('\nUsage: npx tsx scripts/parse-cv.ts <input-cv.txt> [output.json]');
      console.log('\nExample:');
      console.log('  npx tsx scripts/parse-cv.ts my-cv.txt');
      console.log('  npx tsx scripts/parse-cv.ts my-cv.txt custom-resume.json');
      process.exit(1);
    }

    const cvText = fs.readFileSync(cvPath, "utf-8");
    const parsedCV = parseCV(cvText);

    const outputPath = path.resolve(outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(parsedCV, null, 2), "utf-8");

    console.log(`✅ CV parsed successfully!`);
    console.log(`📄 Input: ${cvPath}`);
    console.log(`💾 Output: ${outputPath}`);
    console.log(`\n📊 Parsed data:`);
    console.log(`  - Name: ${parsedCV.name}`);
    console.log(`  - Education: ${parsedCV.education.length} items`);
    console.log(`  - Research: ${parsedCV.research.length} items`);
    console.log(`  - Publications: ${parsedCV.publications.length} items`);
    console.log(`  - Teaching: ${parsedCV.teaching.length} items`);
    console.log(`  - Experience: ${parsedCV.experience.length} items`);
    console.log(`  - Skills: ${parsedCV.skills.length} categories`);
    console.log(`\n⚠️  Note: Please review and manually adjust the generated JSON as needed.`);
  } catch (error) {
    console.error("❌ Error parsing CV:", error);
    process.exit(1);
  }
}

main();
