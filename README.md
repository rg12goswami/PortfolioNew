# Portfolio — Riddam Goswami (React + Vite)

Converted from the original static HTML/CSS/JS portfolio into a componentized
React + Vite app. All content still comes from the original site — nothing
was invented — it now lives in one editable file: `src/data/portfolio.js`.

## Structure

```
src/
  data/portfolio.js     ← all text/content (profile, skills, experience, projects, education, contact)
  components/
    Sidebar.jsx          ← file-explorer style nav with scroll-spy
    Hero.jsx             ← terminal-style intro / about
    Skills.jsx
    Experience.jsx
    Projects.jsx
    Education.jsx
    Contact.jsx
  App.jsx                ← composes the page, scroll-spy hook
  index.css              ← global styles (same visual theme as the original site)
```

To change any text (a new project, updated skills, a new job) — edit
`src/data/portfolio.js` only. No component code needs to change for content
updates.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build to dist/
```

## Add your resume PDF

Drop your resume file into `public/` and name it
`Riddam_Goswami_Resume.pdf` (referenced from `profile.resumeUrl` in the data
file) — or update that path if you name it differently.

## Using Google Antigravity to build out the landing page

This repo is ready to open directly in [Antigravity](https://antigravity.google),
Google's agent-first IDE. A good workflow:

1. Push this repo to GitHub (see below).
2. Open Antigravity → **Open Folder** → select this project folder.
3. Start an agent task with a prompt such as:

   > This is a React + Vite portfolio site. Content lives in
   > `src/data/portfolio.js` — don't change any facts, dates, links, or
   > project descriptions in there. Redesign `Hero.jsx` and `index.css`
   > into a more visually striking, modern landing page (animations,
   > better typography, a hero illustration or gradient, micro-interactions)
   > while keeping the terminal/code-editor theme and all existing content.
   > Verify the dev server renders correctly and nothing is visually broken
   > at mobile widths before finishing.

4. Let the agent plan → edit → run `npm run dev` → check the built-in
   browser preview → iterate. Antigravity's Manager view is useful if you
   want to run a "redesign hero" agent and a "polish projects grid" agent
   in parallel.
5. Review the diff it produces (Artifacts panel) before accepting.

Keeping content and presentation separated (this data file vs. components)
is exactly what makes step 3 safe — the agent can't accidentally overwrite
your real experience/projects while redesigning the look.

## Deployment

Deploys the same way as before — connect this repo to Vercel (or Netlify),
build command `npm run build`, output directory `dist`.
