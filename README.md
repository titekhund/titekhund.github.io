# Tato Khundadze - Personal Academic Website

A modern, accessible personal website showcasing academic research, publications, teaching experience, and professional background. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Dark Mode**: System-aware dark/light theme with manual toggle
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, and schema.org structured data
- **Accessibility**: WCAG AA compliant with skip links, ARIA labels, and keyboard navigation
- **Print-Friendly**: Optimized print stylesheet for CV export
- **Fast Performance**: Optimized for Core Web Vitals (LCP, FID, CLS)
- **JSON-Driven Content**: All content managed through a single JSON file

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components (Home, Projects, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and providers
│   │   └── App.tsx         # Main app component
│   └── index.html          # HTML entry point
├── public/
│   ├── data/
│   │   └── resume.json     # ⭐ Content source of truth
│   ├── sitemap.xml         # SEO sitemap
│   └── robots.txt          # Search engine directives
├── server/                 # Express server for development
└── README.md              # This file
```

## 📝 Editing Content

### Updating Your Resume Data

All website content is stored in `/public/data/resume.json`. Edit this file to update your information:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "tagline": "Your tagline",
  "email": "your.email@example.com",
  ...
}
```

### Adding a New Publication

1. Open `/public/data/resume.json`
2. Find the `publications` array
3. Add a new entry:

```json
{
  "id": "pub-new",
  "authors": "Author Names",
  "title": "Publication Title",
  "venue": "Journal/Conference Name",
  "year": 2025,
  "status": "Published",
  "type": "Journal Article",
  "link": "https://doi.org/..."
}
```

### Adding a New Research Project

1. Open `/public/data/resume.json`
2. Find the `research` array
3. Add a new entry:

```json
{
  "id": "research-new",
  "title": "Project Title",
  "year": "2025",
  "institution": "Institution Name",
  "summary": "Brief description of the research project",
  "tech": ["Technology 1", "Technology 2"]
}
```

### Adding New Experience

1. Open `/public/data/resume.json`
2. Find the `experience` array
3. Add a new entry:

```json
{
  "id": "exp-new",
  "role": "Your Role",
  "organization": "Organization Name",
  "location": "City, Country",
  "startDate": "2025",
  "endDate": "Present",
  "details": [
    "Achievement or responsibility 1",
    "Achievement or responsibility 2"
  ]
}
```

## 🎨 Customizing Design

### Colors

Edit color variables in `client/src/index.css`:

```css
:root {
  --primary: 217 91% 60%;      /* Main brand color */
  --accent: 142 76% 36%;       /* Accent/link color */
  --background: 0 0% 100%;     /* Background color */
  ...
}
```

### Fonts

Update font imports in `client/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Then update the CSS variable in `client/src/index.css`:

```css
--font-sans: 'YourFont', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

## 🚀 Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5000 in your browser

### Building for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## 📦 Deployment

### Deploy to Replit

This project is already configured for Replit deployment:

1. Push your changes to the repository
2. Click the "Deploy" button in Replit
3. Your site will be live at `https://your-repl.replit.app`

### Deploy to GitHub Pages

1. **Build the project**:
```bash
npm run build
```

2. **Create a GitHub repository** and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Set Source to "GitHub Actions"
   - Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. **Update URLs**: Replace `https://titekhund.github.io/` in:
   - `/public/data/resume.json`
   - `/public/sitemap.xml`
   - `client/index.html` meta tags

5. Your site will be live at `https://yourusername.github.io/your-repo/`

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

## 🔧 Advanced Customization

### Single-Page vs Multi-Page

The site is currently built as a multi-page React application. To convert to a true single-page layout:

1. Edit `client/src/pages/home.tsx` to include all sections
2. Update navigation in `client/src/components/header.tsx` to use anchor links (#about, #projects, etc.)
3. Remove separate route components

### Adding a New Page

1. Create a new component in `client/src/pages/your-page.tsx`:

```tsx
export default function YourPage() {
  const { data: resume } = useResume();
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h1>Your Page Title</h1>
        {/* Your content */}
      </div>
    </div>
  );
}
```

2. Add route in `client/src/App.tsx`:

```tsx
import YourPage from "@/pages/your-page";

// In Router component:
<Route path="/your-page" component={YourPage} />
```

3. Add navigation link in `client/src/components/header.tsx`

### Contact Form Integration

To add a functional contact form with Formspree:

1. Sign up at https://formspree.io
2. Create a new form and get your form ID
3. Update the contact page with:

```tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

## 📊 SEO & Analytics

### SEO Features Included

- ✅ Meta descriptions and keywords
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ schema.org structured data (Person, ScholarlyArticle)
- ✅ Sitemap.xml for search engines
- ✅ Robots.txt configuration
- ✅ Semantic HTML5 structure

### Adding Analytics

Uncomment and configure analytics in `client/index.html`:

**Google Analytics**:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Plausible Analytics** (privacy-friendly):
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 🎯 Performance Targets

This website is optimized for:

- **Lighthouse Performance**: ≥ 90
- **Lighthouse Accessibility**: ≥ 95
- **Lighthouse SEO**: ≥ 90
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

## 🐛 Troubleshooting

### Resume data not loading

- Check that `/public/data/resume.json` exists and is valid JSON
- Verify the file is being served correctly at `/data/resume.json`
- Check browser console for errors

### Dark mode not persisting

- Ensure `localStorage` is enabled in your browser
- Check that the theme toggle component is properly connected

### Build errors

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)
- Verify all dependencies are installed: `npm install`

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements, consider sharing them back!

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact: khunt758@newschool.edu

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Replit
