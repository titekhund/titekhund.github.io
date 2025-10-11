# Design Guidelines: Academic Personal Website for Tato Khundadze

## Design Approach
**Selected Approach:** Design System with Academic Portfolio References  
**Justification:** Academic portfolio requiring clarity, credibility, and information hierarchy. Drawing inspiration from modern academic websites (MIT CSAIL, Stanford profiles) and Linear's typography with Material Design's structured approach.

**Key Design Principles:**
- Information hierarchy over visual flourish
- Scannable content with clear categorization
- Professional credibility through refined typography and generous whitespace
- Accessibility and readability as primary concerns

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Background: 0 0% 100% (pure white)
- Surface: 220 13% 97% (subtle warm gray for cards)
- Text Primary: 222 47% 11% (near-black with warmth)
- Text Secondary: 215 16% 47% (muted blue-gray)
- Primary Brand: 217 91% 60% (academic blue - professional, trustworthy)
- Accent: 142 76% 36% (forest green for links/highlights - distinct from primary)
- Border: 220 13% 91% (light separator)

**Dark Mode:**
- Background: 222 47% 11% (deep charcoal)
- Surface: 217 19% 18% (elevated dark blue-gray)
- Text Primary: 210 40% 98% (off-white)
- Text Secondary: 217 10% 64% (muted gray)
- Primary Brand: 217 91% 70% (lighter blue for contrast)
- Accent: 142 76% 46% (brighter green for visibility)
- Border: 217 19% 27% (subtle separator)

### B. Typography

**Font Stack:**
- Primary: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif
- Monospace (for code/tech): 'JetBrains Mono', 'Fira Code', Consolas, monospace

**Hierarchy:**
- H1 (Name/Hero): text-5xl md:text-6xl font-bold tracking-tight (60-72px)
- H2 (Section Titles): text-3xl md:text-4xl font-semibold tracking-tight (36-48px)
- H3 (Subsection/Card Titles): text-xl md:text-2xl font-semibold (24-30px)
- H4 (Publication Titles): text-lg font-medium (18-20px)
- Body: text-base leading-relaxed (16px, 1.75 line-height)
- Small (Meta/Dates): text-sm text-secondary (14px)
- Caption: text-xs text-secondary (12px)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 md:p-8
- Section spacing: py-16 md:py-24
- Card gaps: gap-6 md:gap-8
- Element margins: mb-4, mb-6, mb-8

**Container Strategy:**
- Max-width: max-w-6xl (1152px) for main content
- Max-width: max-w-4xl (896px) for text-heavy pages (Publications)
- Full-width: Header, Footer use full width with inner max-w-6xl

### D. Component Library

**Navigation:**
- Sticky header with backdrop blur (backdrop-blur-md bg-background/80)
- Desktop: Horizontal nav with hover underline animation
- Mobile: Hamburger menu with slide-in drawer
- Active state: Border-b-2 border-primary

**Hero Section:**
- Professional headshot (240x240px rounded-full) with subtle shadow
- Name in H1 with gradient text effect (from-primary to-accent)
- Two-line tagline: "PhD Candidate | Machine Learning in Macroeconomics"
- Social icons (GitHub, LinkedIn, Email) with hover lift effect
- CTA button: "View Publications" and "Download CV" (primary and outline variants)

**Cards (Publications/Projects):**
- Clean white/dark surface with subtle border
- Hover: Lift effect (translate-y-1) with increased shadow
- Badge system: Year badges (bg-primary/10 text-primary), Status badges (Working Paper, Published)
- External link icon for DOI/PDF links

**Lists (Teaching/Experience):**
- Timeline layout with left border accent
- Role/Course as heading, institution as subheading
- Bullet points with custom marker color (text-accent)
- Date ranges in small text (text-sm text-secondary)

**Section Headers:**
- Divider line before section (border-t border-border)
- Section number in accent color (optional: "01. Publications")
- Description text below title (text-secondary)

**Footer:**
- Three-column layout: Quick Links | Contact | Social
- Newsletter signup (optional, commented)
- Copyright with current year
- "Built with" attribution (Tailwind + ❤️)

### E. Images

**Hero Image:** Professional headshot/portrait
- Placement: Left side of hero section on desktop, centered on mobile
- Size: 240x240px circular crop
- Treatment: Subtle ring border (ring-4 ring-primary/10)

**Section Backgrounds:** None - maintain clean academic aesthetic
**Decorative Elements:** Minimal geometric shapes in section headers (optional SVG)

### F. Interactions & States

**Animations:** Extremely minimal
- Theme toggle: Smooth 200ms color transition
- Card hover: 200ms lift effect
- Link underline: 150ms width expansion
- Page transitions: None (instant navigation)

**Focus States:**
- Visible 2px outline (outline-2 outline-primary outline-offset-2)
- Skip-to-content link visible on focus

**Loading States:**
- Skeleton screens for JSON-loaded content (bg-surface animate-pulse)

## Special Considerations

**Accessibility:**
- All form inputs maintain dark mode consistency
- Minimum contrast ratio: 7:1 for text, 4.5:1 for UI
- Focus indicators never removed
- Semantic HTML5 throughout (section, article, nav, aside)

**Print Stylesheet:**
- Single-column layout
- Hide navigation, theme toggle, decorative elements
- Optimize for black/white printing
- Page break controls for sections

**SEO Meta Tags:**
- Structured data: schema.org Person + ScholarlyArticle for publications
- Open Graph images: Generate from headshot
- Twitter Cards: Summary type with large image

**Performance Targets:**
- Critical CSS inlined for above-fold
- Defer non-critical JS
- Lazy load images below fold
- Target: <2s LCP, <100ms FID