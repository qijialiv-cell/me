# Copilot instructions for Qijia_academic_website

Purpose

This file gives concise, actionable guidance for future Copilot CLI sessions working on this repository (a plain static academic website). Use it to find build/preview commands, high-level architecture, and repository-specific conventions.

1) Build / test / lint commands

- No build system, test suite, or linter configured in this repo.
- Preview locally (single-file static site):
  - Open index.html in a browser.
  - Or run a simple server for relative asset paths and CORS-sensitive testing:
    - Python: `python -m http.server 8000`
    - Node (http-server): `npx http-server` (then open http://localhost:8080)
- Running a single test: Not applicable (no tests). If tests are added, follow the framework's runner (e.g., `npm test` or `pytest path/to/test_file`).

2) High-level architecture (big picture)

- Single-page static site. All site content lives in index.html. Styling and interactivity are isolated in `css/style.css` and `js/script.js`.
- Layout: Editorial Luxury Theme — horizontal full-screen panels on desktop (six pages: About, Research, Teaching, CV, Skills, Contact) and vertical stacking on mobile.
- Navigation & behaviour:
  - JavaScript manages page navigation and animations. Look for functions named like `goToPage`, `nextPage`, `prevPage`, `initNavigation` and observer setup functions in `js/script.js`.
  - Intersection Observer is used for reveal animations and active state tracking.
  - Keyboard navigation, arrow buttons, and a bottom page indicator are implemented.
- Styling:
  - `css/style.css` uses centralized CSS variables at the top for colors, fonts, spacing, and animation timings.
  - Fonts and icons are loaded via external links in the `<head>` of index.html (Google Fonts + Font Awesome).
- Assets:
  - Personal assets (photo, CV) live in `assets/`. The site expects a CV PDF (replace `assets/cv.pdf` or update links in index.html).
- Deployment: GitHub Pages is the intended deployment target. `.nojekyll` is present to disable Jekyll. The repository references a GitHub Actions workflow for Pages (see AGENTS.md/README.md).

3) Key conventions (repo-specific)

- No framework or build pipeline — edits are immediate: edit HTML/CSS/JS directly and push.
- Content edits happen in index.html (sections are self-contained). Use the README.md to find the recommended edit regions (personal info, research entries, teaching entries, CV link).
- CSS variables in `css/style.css` are the canonical place to change theme colors and fonts.
- JavaScript utilities: `debounce`/`throttle` helpers are used for resize/scroll handlers — preserve these when modifying performance-sensitive logic.
- Preserve `.nojekyll` and the repository structure when deploying to GitHub Pages.
- Keep CV file path consistent: `assets/cv.pdf` is referenced by the UI; if renaming, update links in index.html.
- Minimal external dependencies: Google Fonts and Font Awesome only. Avoid adding heavy toolchains unless a clear need arises.

4) Reference documents

- See README.md for step-by-step local preview and content-edit instructions.
- See AGENTS.md for a detailed project overview, color palette, typography, and design notes.

5) When automating edits with Copilot

- Prefer small, surgical changes. This is a live static site—avoid refactors that add build steps or change runtime expectations.
- Validate visual changes in a local server before committing.
- If adding tests or linters, document their commands here and include setup steps in the README.

---

Playwright (E2E) — added

This repository now includes a minimal Playwright Test setup and a GitHub Actions workflow to run E2E checks on push/PR to main.

Files added:
- package.json — devDependency: @playwright/test and test scripts
- playwright.config.js — basic config (tests in `tests/`, Chromium & WebKit projects)
- tests/example.spec.js — smoke test that expects the Research section to be visible
- .github/workflows/playwright.yml — CI workflow that installs deps, starts a simple HTTP server, and runs Playwright tests

Local setup and commands

1. Install dependencies:
   - npm ci
   - npx playwright install --with-deps

2. Run the site locally (in a separate terminal):
   - Python: `python -m http.server 8000`
   - Or `npx http-server` (if preferred)

3. Run tests:
   - All tests: `npm test` (runs `playwright test`)
   - Single test file: `npx playwright test tests/example.spec.js`
   - Headed debugging: `npm run test:headed`

Notes

- Tests assume the site is served at http://localhost:8000. Start a local server before running tests.
- To add visual regression or snapshot tests, add Playwright snapshot assertions and expand the CI workflow to upload artifacts.
- If Playwright is later removed, update this copilot instructions file accordingly.

Would you like a different test added (e.g., visual regression snapshot) or custom projects (mobile/emulation)?
