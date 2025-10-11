# Build Scripts

This directory contains utility scripts for maintaining the personal academic website.

## RSS Feed Generator

**File:** `generate-rss.ts`

Generates a static RSS feed from the publications in `resume.json`.

```bash
npx tsx scripts/generate-rss.ts
```

The feed is output to `public/feed.xml` and includes:
- All publications sorted by year (newest first)
- Proper XML escaping
- Author information and categories
- Links to external publications or internal anchors

Run this script whenever publications are updated in `resume.json`.

## CV Parser (Experimental)

**File:** `parse-cv.ts`

Attempts to parse a plain text CV and convert it to the `resume.json` format.

```bash
npx tsx scripts/parse-cv.ts <input-cv.txt> [output.json]
```

**Example:**
```bash
npx tsx scripts/parse-cv.ts my-cv.txt
npx tsx scripts/parse-cv.ts my-cv.txt client/src/data/resume.json
```

### Important Notes

⚠️ **This is a basic starting point that will require significant manual editing.** CV formats vary widely, and the parser uses simple heuristics that work best with the provided template format.

**What it does well:**
- Extracts contact information (email, website, LinkedIn, GitHub)
- Identifies major sections (Education, Publications, Teaching, Experience, Skills, References)
- Parses research projects with titles containing years (e.g., "Project Title (2023-2024)")
- Parses skills formatted as "Category: item1, item2, item3"
- Generates unique IDs for items
- Preserves all content (may fragment across multiple items)

**What requires significant manual review:**
- **Teaching & Experience sections**: Multi-line entries will fragment into separate items. You'll need to manually consolidate related information (title, organization, location, dates, description) into single entries.
- **Publications**: Formatting varies widely - review and restructure all publication entries
- **References**: Basic line-by-line parsing - manually combine into proper reference objects
- **Education**: Multiple degrees may need separation and cleanup
- **Research**: Works best with year in title; manual adjustment needed otherwise

**Recommended approach:**
1. Use this parser to extract the basic structure and content
2. Expect to spend time manually consolidating and restructuring entries
3. Treat the output as a content extraction tool, not a finished resume.json

### Recommended Workflow

1. Use `cv-template.txt` as a reference for formatting your CV
2. Run the parser on your CV text file
3. **Manually review and edit the generated JSON** to:
   - Fix any parsing errors
   - Add missing information (links, locations, descriptions)
   - Ensure consistent formatting
   - Add research projects with proper structure
4. Validate the JSON is well-formed
5. Copy to `client/src/data/resume.json`

### CV Format Guidelines

For best results, structure your plain text CV with:

```
Name
Title
Tagline

CONTACT:
email@example.com
https://website.com
https://linkedin.com/in/username
https://github.com/username

PROFILE:
Your bio paragraph here...

EDUCATION:

Degree Name
Institution Name
Location
Year
Additional details

PUBLICATIONS:

1. Author, A. (YEAR). "Title"
   Venue Name. Status. Type.
   https://link-to-publication

TEACHING:

Course Name
Institution
Year
Role, Level
Description

EXPERIENCE:

Position Title
Organization
Location
Period
Description

SKILLS:

Category Name: skill1, skill2, skill3
Another Category: skill1, skill2

REFERENCES:

Full Name
Title
Organization
email@example.com
```

## Adding New Scripts

When adding new build scripts:

1. Use TypeScript (`.ts` extension)
2. Run with `tsx` for execution
3. Add proper error handling and user feedback
4. Document the script in this README
5. Consider adding to `package.json` scripts if frequently used
