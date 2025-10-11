Tato Khundadze — Academic & Research Website

A modern, accessible academic portfolio showcasing research in economics, machine learning, and policy, including publications, projects, teaching, and professional experience.
Built with React, TypeScript, and Tailwind CSS for performance, accessibility, and clean design.

🎓 About

This website serves as the digital home of Tato Khundadze, a PhD Candidate in Economics at The New School for Social Research (NSSR) in New York.
His research focuses on the intersection of AI and macroeconomics, with applications in deep reinforcement learning, scientific machine learning, and sustainable finance.

The site consolidates:

Working papers and publications (e.g., Frontiers in AI, SSRN)

Conference presentations

Teaching materials (Advanced Econometrics, Machine Learning for Economists)

Interactive projects using scientific ML and AI in economic policy design

🚀 Features

Responsive Design – Seamless across desktop, tablet, and mobile

Dark Mode – System-aware with manual toggle

SEO & Metadata – Optimized for Google Scholar and LinkedIn sharing

Accessibility – WCAG AA compliance, keyboard navigation

Print-Friendly CV – Clean export for PDF CVs or academic bios

JSON-Driven Content – All research data and profile details editable from one JSON file

Optimized Performance – Fast load and rendering using Vite + React 18

🧠 Tech Stack

Frontend: React 18 + TypeScript + Tailwind CSS

Build Tool: Vite

Deployment: GitHub Pages via GitHub Actions

Development Server: Express (Node.js)

Data Source: /public/data/resume.json

📁 Project Structure
client/
 ├─ src/
 │   ├─ components/      # Reusable UI (cards, headers, sections)
 │   ├─ pages/           # Pages (Home, Research, Teaching, CV)
 │   ├─ hooks/           # Custom React hooks
 │   ├─ lib/             # Utilities, providers
 │   └─ App.tsx          # Main app component
public/
 ├─ data/resume.json     # ⭐ Source of truth for content
 ├─ sitemap.xml          # SEO sitemap
 └─ robots.txt           # Search engine rules
server/                  # Express dev server
README.md

📝 Editing Content

All academic content is managed in /public/data/resume.json.

Example — Add a New Research Project
{
  "id": "research-goodwin",
  "title": "Discovering Nonlinear Goodwin Dynamics via Sparse Identification (SINDy)",
  "year": "2024",
  "institution": "The New School for Social Research",
  "summary": "Applies sparse model discovery and conformal prediction to macroeconomic cycle analysis.",
  "tech": ["Python", "PySINDy", "SVR", "Ridge Regression"]
}

Example — Add a New Publication
{
  "id": "pub-ai-macro",
  "authors": "Khundadze, T.",
  "title": "Deep Reinforcement Learning in Sustainable Fiscal Policy",
  "venue": "Frontiers in Artificial Intelligence",
  "year": 2025,
  "status": "In Press",
  "type": "Journal Article",
  "link": "https://doi.org/..."
}

Example — Add Teaching Experience
{
  "id": "exp-nssr",
  "role": "Teaching Assistant — Advanced Econometrics I",
  "organization": "The New School for Social Research",
  "location": "New York, USA",
  "startDate": "2023",
  "endDate": "2024",
  "details": [
    "Guided students through Stata and Python-based econometric applications.",
    "Developed course materials linking econometrics with reinforcement learning."
  ]
}

🧩 Customization
Colors

client/src/index.css

:root {
  --primary: 217 91% 60%;
  --accent: 142 76% 36%;
  --background: 0 0% 100%;
}

Fonts

client/index.html

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

🧪 Development
Prerequisites

Node 18 +

npm or yarn

Local Run
npm install
npm run dev


Open http://localhost:5000

Production Build
npm run build


Output: /dist

🌐 Deployment
GitHub Pages (Recommended)

GitHub Actions workflow builds and deploys automatically.
Set Settings → Pages → Source = GitHub Actions.

Other Options

Netlify: npm run build && netlify deploy --prod --dir=dist

Vercel: vercel --prod

Replit: push to main → Deploy

📊 SEO & Analytics

Schema.org structured data for Person and ScholarlyArticle

Google Analytics or Plausible Analytics optional integration

Sitemap + robots.txt ready for Google Scholar indexing

🎯 Performance Targets
Metric	Goal
Lighthouse Performance	≥ 90
Accessibility	≥ 95
SEO	≥ 90
LCP	< 2.5 s
FID	< 100 ms
CLS	< 0.1
🐛 Troubleshooting

Resume not loading → verify valid JSON in resume.json

Dark mode issue → clear localStorage

Build errors → rm -rf node_modules && npm install

📄 License

Open source for educational and personal use.

📞 Contact

Tato Khundadze
PhD Candidate in Economics, NSSR (New York)
📧 khunt758@newschool.edu

🌐 https://titekhund.github.io

Built with ❤️ using React, TypeScript, Tailwind CSS, and Vite.
