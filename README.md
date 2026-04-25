## Tato Khundadze — Academic & Research Website

A personal research hub for Tato Khundadze, PhD Candidate in Economics at The New School for Social Research. The site highlights work at the intersection of economics, machine learning, and policy, and bundles publications, talks, teaching, and interactive projects into one place.

- **Live site:** https://tatokhundadze.com
- **Tech:** React 18, TypeScript, Tailwind CSS, Vite, GitHub Pages

---

### 📚 What’s inside
- Working papers, publications, and conference talks (Frontiers in AI, SSRN, APSA, and more)
- Teaching materials for courses such as Advanced Econometrics and Machine Learning for Economists
- Interactive demos that apply scientific ML to macroeconomic policy design
- A printable CV view for quick sharing with collaborators and committees

### ✨ Highlights
- **Responsive & accessible** design that plays nicely with dark mode and keyboard navigation
- **Fast builds** courtesy of Vite + React 18
- **SEO ready** with structured data, sitemaps, and tuned metadata for Google Scholar and LinkedIn
- **Single source of truth**: all content lives in `public/data/resume.json`
- **Export-friendly** layouts for academic CVs and bios

### 🧠 Core stack
| Area | Tools |
| --- | --- |
| Frontend | React 18, TypeScript, Tailwind CSS |
| Build | Vite |
| Deployment | GitHub Pages (GitHub Actions workflow) |
| Dev server | Express (for local API mocks) |
| Content | `public/data/resume.json` |

---

### � Quick start
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the site locally**
   ```bash
   npm run dev
   ```
   The Vite dev server exposes the client on the configured port (default `http://localhost:5173`).
3. **Create a production build**
   ```bash
   npm run build
   ```
   Bundled assets land in `dist/`.
4. **Optional preview**
   ```bash
   npm run preview
   ```

> **Prerequisites:** Node.js 18+ and npm (or your preferred package manager).

---

### 📝 Editing content
All academic metadata is driven by `public/data/resume.json`. Update that file to change publications, teaching entries, or contact details.

```json
{
  "id": "research-goodwin",
  "title": "Discovering Nonlinear Goodwin Dynamics via Sparse Identification (SINDy)",
  "year": "2024",
  "institution": "The New School for Social Research",
  "summary": "Applies sparse model discovery and conformal prediction to macroeconomic cycle analysis.",
  "tech": ["Python", "PySINDy", "SVR", "Ridge Regression"]
}
```

Use similar shapes to add publications, projects, teaching roles, or media appearances. The UI updates automatically after a rebuild.

---

### 🎨 Customize the look
- **Colors:** tweak CSS variables in `client/src/index.css`
  ```css
  :root {
    --primary: 217 91% 60%;
    --accent: 142 76% 36%;
    --background: 0 0% 100%;
  }
  ```
- **Fonts:** adjust Google Fonts imports in `client/index.html`
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
  ```

---

### 🗂️ Project layout (abridged)
```
client/
  src/
    components/   # Reusable UI (cards, sections, navigation)
    pages/        # Route-level pages (home, research, teaching, CV, etc.)
    hooks/        # Custom React hooks
    lib/          # Helpers, providers, analytics config
    App.tsx       # Entry point
public/
  data/resume.json  # Primary content store
  robots.txt         # Search engine rules
  sitemap.xml        # SEO sitemap
server/              # Express utilities for local development
```

---

### 🌐 Deployment notes
- GitHub Actions (`.github/workflows/pages.yml`) builds with Node 20, runs `npm ci` + `npm run build`, and publishes to GitHub Pages.
- Confirm **Settings → Pages → Source** is set to GitHub Actions so new commits deploy automatically.
- Alternate hosting (Netlify, Vercel, Replit) works by pointing to the `dist/` output.

---

### � SEO & analytics
- `robots.txt` and `sitemap.xml` ship in `public/`
- Structured data includes `Person` and `ScholarlyArticle` schemas
- Hook up Google Analytics, Plausible, or your tool of choice via the analytics config in `client/src/components/analytics.tsx`

---

### � Tips & troubleshooting
- JSON content not loading? Validate `public/data/resume.json` formatting.
- Dark mode stuck? Clear local storage or toggle using the header switch.
- Build hiccups? Remove `node_modules`, reinstall, and re-run `npm run build`.

---

### 📄 License & contact
- Open for educational and personal reuse—credit appreciated.
- Questions or collaboration ideas? Reach out:
  - **Email:** tato.khundadze@gmail.com
  - **Website:** https://tatokhundadze.com

Built with ❤️ by Tato Khundadze using React, TypeScript, Tailwind CSS, and Vite.
