# Tato Khundadze - Personal Academic Website

## Overview

This is a modern, responsive personal academic portfolio website built for Tato Khundadze, a PhD candidate in Economics at The New School. The site showcases academic research, publications, teaching experience, and professional background. It's designed as a JSON-driven, static single-page application with multiple route-based views, optimized for SEO, accessibility, and performance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18** with TypeScript for component-based UI
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** (React Query) for data fetching and state management
- **Tailwind CSS** for styling with a custom design system

**Design System:**
- Based on **shadcn/ui** component library (Radix UI primitives + Tailwind)
- Custom theme with light/dark mode support
- Academic-focused design with emphasis on readability and information hierarchy
- Color palette optimized for professional credibility (academic blue primary, forest green accent)
- Typography: Inter font family for clean, modern appearance

**Component Structure:**
- Page components (`/pages/*`) handle route-level views
- Reusable UI components (`/components/*`) for consistent interface elements
- Custom hooks (`/hooks/*`) for shared logic (theme management, mobile detection, data fetching)
- Structured data component for SEO schema.org markup

**Data Flow:**
- Single source of truth: `/public/data/resume.json` contains all portfolio content
- Custom `useResume` hook fetches and caches JSON data via TanStack Query
- Content is dynamically rendered from JSON, allowing easy updates without code changes

**Key Features:**
- Fully responsive design (mobile-first approach)
- System-aware dark/light theme with manual toggle and localStorage persistence
- Print-optimized stylesheet for CV export
- Accessibility: WCAG AA compliant with skip links, ARIA labels, keyboard navigation
- SEO optimization: Open Graph, Twitter Cards, structured data (schema.org Person/Article)

### Backend Architecture

**Development Server:**
- **Express.js** server for local development
- Vite middleware integration for HMR (Hot Module Replacement)
- Minimal API surface - primarily serves static assets and handles Vite dev server

**Production Build:**
- Static site generation via Vite build process
- Output: `/dist/public` directory containing optimized HTML, CSS, JS
- No runtime backend required - pure client-side application

**Database Consideration:**
- Current implementation includes Drizzle ORM configuration with PostgreSQL schema
- Database setup is present but not actively used (likely for future features)
- User authentication schema exists but is not implemented in current application

**Routing Strategy:**
- Client-side routing with Wouter (lightweight, hook-based)
- Routes: Home, About, Projects, Publications, Teaching, Experience, Contact
- 404 Not Found page for unmatched routes

### Content Management

**JSON-Driven Content:**
- Centralized data model in `/public/data/resume.json`
- Structured sections: name, title, education, research, publications, teaching, experience, skills
- Enables non-technical content updates without touching code

**Content Structure:**
```typescript
{
  name, title, tagline, email, website, social,
  profile, education[], research[], publications[],
  teaching[], experience[], skills[]
}
```

### Performance Optimizations

- Vite's code splitting and tree shaking
- TanStack Query caching with `staleTime: Infinity`
- Lazy loading with React.lazy for route-based code splitting
- Optimized fonts with Google Fonts preconnect
- Skeleton loading states for better perceived performance

### Analytics (Optional)

**Privacy-Friendly Analytics Integration:**
- Configured for Plausible Analytics and Simple Analytics
- Disabled by default - configure in `client/src/lib/analytics-config.ts`
- Automatic page view tracking on route changes
- GDPR-compliant, cookieless tracking
- Lightweight scripts (<3KB)
- No personal data collection

**Setup:**
1. Choose provider in `analytics-config.ts` (Plausible or Simple Analytics)
2. Update domain configuration
3. Deploy - tracking starts automatically

See `docs/ANALYTICS.md` for complete setup instructions.

### Accessibility Features

- Semantic HTML5 structure
- Skip to main content link for keyboard users
- Focus management and visible focus indicators
- ARIA labels and roles throughout
- Color contrast meeting WCAG AA standards
- Screen reader friendly navigation

## External Dependencies

### UI Component Libraries
- **@radix-ui/** - Headless UI primitives for accessible components (accordion, dialog, dropdown, etc.)
- **lucide-react** - Icon library for consistent iconography
- **class-variance-authority** - Type-safe component variant management
- **tailwindcss** - Utility-first CSS framework
- **cmdk** - Command palette component

### Data Fetching & State
- **@tanstack/react-query** - Server state management and caching
- **wouter** - Lightweight client-side routing

### Form Handling
- **react-hook-form** - Form state and validation
- **@hookform/resolvers** - Validation schema resolvers
- **zod** - TypeScript-first schema validation
- **drizzle-zod** - Drizzle ORM Zod schema generation

### Development Tools
- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - React plugin for Vite
- **typescript** - Type safety
- **@replit/vite-plugin-*** - Replit-specific development plugins

### Database (Configured but Unused)
- **drizzle-orm** - TypeScript ORM
- **drizzle-kit** - Migration toolkit
- **@neondatabase/serverless** - Neon PostgreSQL serverless driver
- **connect-pg-simple** - PostgreSQL session store

### Utilities
- **date-fns** - Date manipulation
- **clsx** / **tailwind-merge** - Conditional class name management
- **nanoid** - Unique ID generation

### Server (Development Only)
- **express** - Web server framework
- **tsx** - TypeScript execution for Node.js
- **esbuild** - JavaScript bundler for production server build