import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Publication {
  id: string;
  authors: string;
  title: string;
  venue: string;
  year: number;
  status: string;
  type: string;
  link?: string;
}

interface ResumeData {
  name: string;
  email: string;
  website: string;
  tagline: string;
  publications: Publication[];
}

function escapeXml(unsafe: string): string {
  if (typeof unsafe !== "string") return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRSS() {
  const resumePath = path.join(__dirname, "../client/src/data/resume.json");
  const resumeData: ResumeData = JSON.parse(fs.readFileSync(resumePath, "utf-8"));
  
  const normalizedBaseUrl = (resumeData.website || "https://titekhund.github.io").replace(/\/$/, "");
  const buildDate = new Date().toUTCString();
  
  const rssItems = resumeData.publications
    .sort((a, b) => b.year - a.year)
    .map(pub => `
    <item>
      <title>${escapeXml(pub.title)}</title>
      <link>${escapeXml(pub.link || `${normalizedBaseUrl}/publications#${pub.id}`)}</link>
      <guid>${escapeXml(pub.link || `${normalizedBaseUrl}/publications#${pub.id}`)}</guid>
      <pubDate>${new Date(pub.year, 0, 1).toUTCString()}</pubDate>
      <description>${escapeXml(`${pub.authors} (${pub.year}). ${pub.title}. ${pub.venue}. ${pub.status}`)}</description>
      <author>${escapeXml(resumeData.email)} (${escapeXml(resumeData.name)})</author>
      <category>${escapeXml(pub.type)}</category>
    </item>`).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(resumeData.name)} - Publications</title>
    <link>${escapeXml(normalizedBaseUrl)}/publications</link>
    <description>${escapeXml(resumeData.tagline)}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${escapeXml(normalizedBaseUrl)}/feed.xml" rel="self" type="application/rss+xml" />${rssItems}
  </channel>
</rss>`;

  const outputPath = path.join(__dirname, "../public/feed.xml");
  fs.writeFileSync(outputPath, rss, "utf-8");
  console.log(`✅ RSS feed generated at ${outputPath}`);
}

generateRSS();
