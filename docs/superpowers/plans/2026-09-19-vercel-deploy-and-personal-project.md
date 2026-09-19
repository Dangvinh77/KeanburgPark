# Vercel Deployment and Personal Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Create React App build pass under Vercel's `CI=true` environment and present the repository and About Us page as Phạm Đăng Vinh's independent personal project about Keansburg Amusement Park.

**Architecture:** Keep the existing React 18/Create React App application and remove all nine lint warnings at their source. Rebuild the npm lockfile for deterministic installs, then update visible project identity in README, HTML metadata, About Us, and GitHub repository metadata; add an SPA rewrite only if preview-route verification proves it is necessary.

**Tech Stack:** React 18, React DOM 18, React Router DOM 7, Create React App/react-scripts 5, Sass, Bootstrap 5, React Bootstrap, React Icons, Boxicons, npm 10, Vercel.

---

## File map

- `src/components/Carousel.jsx`: stabilize the autoplay callback and effect dependencies.
- `src/components/Footer.jsx`: remove a dead import and correct the park name in logo alt text.
- `src/components/Header.jsx`: remove the commented-out reset implementation and correct the park name in logo alt text.
- `src/pages/ContactUs.jsx`: remove a dead import and correct three image alternatives.
- `src/pages/Tickets/Tickets.jsx`: remove a dead import and move static prices outside the component.
- `package.json`: use the personal project's correctly spelled package name.
- `package-lock.json`: synchronize the root package metadata and optional platform dependencies.
- `README.md`: replace the old group-assignment description with personal-project documentation.
- `public/index.html`: replace generic Create React App metadata and the misspelled title.
- `src/pages/AboutUs/AboutUs.jsx`: correct history dates, add the project disclaimer, and improve section naming.
- `src/styles/pages/AboutUs/AboutUs.scss`: style the project disclaimer without changing the page layout system.
- `src/pages/AboutUs.jsx`: correct stale `Keanburg` strings in the legacy page module.
- `src/pages/Gallery.jsx`: correct stale `Keanburg` strings in the legacy page module.
- `vercel.json`: conditional SPA fallback; create only if a preview direct-route request returns 404.

### Task 1: Reproduce and capture the CI failure

**Files:**
- Read: `package.json`
- Read: `src/components/Carousel.jsx`
- Read: `src/components/Footer.jsx`
- Read: `src/components/Header.jsx`
- Read: `src/pages/ContactUs.jsx`
- Read: `src/pages/Tickets/Tickets.jsx`

- [ ] **Step 1: Confirm the baseline worktree is understood**

Run:

```powershell
git status --short
git rev-parse --short HEAD
```

Expected: only changes intentionally carried into the implementation worktree are listed; the starting commit is `7f28ca8` or its documented descendant.

- [ ] **Step 2: Reproduce the exact Vercel build behavior**

Run:

```powershell
$env:CI='true'
npm run build
```

Expected: exit code 1, `Treating warnings as errors because process.env.CI = true`, and the same nine warnings in Carousel, Footer, Header, ContactUs, and Tickets.

- [ ] **Step 3: Keep the failing output as the acceptance baseline**

Run:

```powershell
$env:CI='true'
npm run build 2>&1 | Tee-Object -Variable ciBuildOutput
$ciBuildOutput | Select-String 'Failed to compile|react-hooks/exhaustive-deps|no-unused-vars|jsx-a11y/img-redundant-alt'
```

Expected: the selected output contains all four diagnostic categories; do not add `CI=false` or suppress any ESLint rule.

### Task 2: Fix the nine source warnings

**Files:**
- Modify: `src/components/Carousel.jsx:1-30`
- Modify: `src/components/Footer.jsx:1-4`
- Modify: `src/components/Header.jsx:40-44,234-249,323`
- Modify: `src/pages/ContactUs.jsx:1-2,147,155,238`
- Modify: `src/pages/Tickets/Tickets.jsx:1-45,90-114`

- [ ] **Step 1: Stabilize the Carousel callback**

Update the React import, `nextSlide`, and timer effect in `src/components/Carousel.jsx` to this form:

```jsx
import React, { useCallback, useEffect, useRef, useState } from "react";

const nextSlide = useCallback(() => {
  if (isTransitioning) return;
  setIsTransitioning(true);
  setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  setTimeout(() => setIsTransitioning(false), 500);
}, [images.length, isTransitioning]);

useEffect(() => {
  const intervalId = setInterval(nextSlide, interval);
  return () => clearInterval(intervalId);
}, [interval, nextSlide]);
```

Expected: `nextSlide` is no longer recreated unconditionally, and `currentIndex` is absent from the effect dependencies because the state update is functional.

- [ ] **Step 2: Remove dead Footer and ContactUs imports**

Delete these two lines:

```jsx
// src/components/Footer.jsx
import { Link } from "react-router-dom";

// src/pages/ContactUs.jsx
import { Link } from "react-router-dom";
```

Expected: both modules retain their existing behavior because neither import is referenced by active JSX.

- [ ] **Step 3: Remove the inactive Header reset implementation**

Delete the `handleReset` callback at lines 40-44 and the fully commented reset `<button>` block at lines 234-249. Keep `useCallback` imported because `scrollToTop` still uses it.

Expected: the visit counter continues to increment and display; there is no reset control in the current UI, matching the pre-change rendered page.

- [ ] **Step 4: Replace the three redundant ContactUs alt values**

Use these exact values:

```jsx
<img src={adPlaceholder1} alt="Keansburg park entrance" className="ad-image" />
<img src={adPlaceholder2} alt="Keansburg park attractions" className="ad-image" />
<img src={adPlaceholder3} alt="Keansburg park grounds" className="ad-image" />
```

Expected: no alt value contains `image`, `photo`, or `picture`.

- [ ] **Step 5: Move ticket prices to module scope**

Delete the unused `Link` import. Add this constant after the image imports and before `const Tickets`:

```jsx
const PRICES = {
  daily: { adult: 25, child: 15, base: 25 },
  weekly: { adult: 100, child: 60, base: 100 },
  family: {
    small: { adult: 20, child: 12, base: 40 },
    large: { adult: 18, child: 10, base: 54 },
  },
};
```

Replace every active `prices` reference in `src/pages/Tickets/Tickets.jsx` with `PRICES`, delete the component-local `const prices`, and change the calculation effect dependency array to:

```jsx
[ticketType, familySize, quantity]
```

Expected: price calculations and rendered ticket option prices are unchanged, while the effect no longer depends on a per-render object.

- [ ] **Step 6: Correct visible logo alt spelling while these components are open**

Use this alt text in both `src/components/Header.jsx` and `src/components/Footer.jsx`:

```jsx
alt="Keansburg Park"
```

- [ ] **Step 7: Run the CI build and require a clean result**

Run:

```powershell
$env:CI='true'
npm run build
```

Expected: exit code 0, `Compiled successfully.`, and none of the nine diagnostics from Task 1.

- [ ] **Step 8: Smoke-test carousel and tickets**

Run:

```powershell
npm start
```

Open `/`, wait longer than the 3000 ms default interval, use both carousel arrows, then open `/tickets`, change ticket type, family size, and quantity.

Expected: the carousel advances automatically and manually; ticket totals still update for daily, weekly, small-family, and large-family selections.

- [ ] **Step 9: Commit the source fix**

```powershell
git add src/components/Carousel.jsx src/components/Footer.jsx src/components/Header.jsx src/pages/ContactUs.jsx src/pages/Tickets/Tickets.jsx
git commit -m "fix: make Vercel CI build warning-free"
```

### Task 3: Synchronize package metadata and lockfile

**Files:**
- Modify: `package.json:2`
- Modify: `package-lock.json`

- [ ] **Step 1: Prove the current lockfile is unsuitable for clean install**

Run:

```powershell
npx --yes npm@10.9.8 ci --dry-run --no-audit --no-fund
```

Expected before regeneration: non-zero exit with an out-of-sync lockfile or missing optional `@parcel/watcher` platform package message. If npm 10 accepts the dry run, record that npm 11 was the reproducing client and continue regeneration so the root package metadata can be corrected.

- [ ] **Step 2: Correct the npm package name**

Run:

```powershell
npm pkg set name=keansburg-amusement-park
```

Expected: `package.json` contains exactly `"name": "keansburg-amusement-park"`.

- [ ] **Step 3: Regenerate the lockfile with Vercel's npm major**

Run:

```powershell
npx --yes npm@10.9.8 install --package-lock-only --ignore-scripts --no-audit --no-fund
```

Expected: `package-lock.json` retains lockfile version 3, contains the corrected root name, and includes the optional platform entries required by the resolved `@parcel/watcher` version.

- [ ] **Step 4: Verify a real clean install**

Run:

```powershell
npx --yes npm@10.9.8 ci --no-audit --no-fund
```

Expected: exit code 0 with no package/lock synchronization error.

- [ ] **Step 5: Verify the production build after clean install**

Run:

```powershell
$env:CI='true'
npm run build
```

Expected: exit code 0 and `Compiled successfully.`

- [ ] **Step 6: Commit the dependency metadata**

```powershell
git add package.json package-lock.json
git commit -m "chore: synchronize npm lockfile"
```

### Task 4: Rewrite README as a personal project

**Files:**
- Modify: `README.md`
- Modify: `public/index.html:6-10`
- Modify: `src/pages/AboutUs.jsx`
- Modify: `src/pages/Gallery.jsx`

- [ ] **Step 1: Replace README with the complete personal-project copy**

Use this content:

````markdown
# Keansburg Amusement Park

A personal front-end project by **Phạm Đăng Vinh** that explores the history, attractions, gallery, tickets, and visitor experience of Keansburg Amusement Park, a historic seaside amusement park in Keansburg, New Jersey.

> This is an independent educational project. It is not the official Keansburg Amusement Park website and is not affiliated with the park or its operators.

## Live demo

[View the deployed website](https://e-project-1-self.vercel.app/)

## Features

- Responsive pages for the park overview, history, attractions, beach, events, food, fishing pier, waterpark, gallery, reviews, contact information, and tickets.
- Client-side navigation with React Router.
- Custom carousel, visitor counter, contact form validation, review interactions, and ticket-price calculations.
- Direct-link support for application routes on Vercel.

## Technology

| Area | Technology |
| --- | --- |
| UI | React 18, React DOM |
| Routing | React Router DOM 7 |
| Styling | Sass, Bootstrap 5, React Bootstrap |
| Icons | React Icons, Boxicons |
| Tooling | Create React App, react-scripts 5, npm |
| Deployment | Vercel |

## Run locally

```bash
git clone https://github.com/Dangvinh77/KeanburgPark.git
cd KeanburgPark
npm ci
npm start
```

The development server opens at `http://localhost:3000`.

## Available scripts

- `npm start` starts the development server.
- `npm run build` creates an optimized production build in `build/`.
- `npm test -- --watchAll=false --passWithNoTests` runs the current test command once.

## Project note

The contact, ticket-booking, and payment experiences are front-end demonstrations. They do not send messages, issue tickets, charge cards, or process real transactions. For current park information, schedules, prices, and official purchases, visit the [official Keansburg Amusement Park website](https://keansburgamusementpark.com/).
````

Expected: no supervisor, semester, batch, group number, member table, or old group-documentation link remains.

- [ ] **Step 2: Replace generic HTML metadata**

In `public/index.html`, use:

```html
<meta
  name="description"
  content="A personal React project exploring Keansburg Amusement Park, its history, attractions, and visitor experience."
/>
<title>Keansburg Amusement Park | Personal React Project</title>
```

Keep the existing favicon path because the asset is correctly named `keansburg-logo.png`.

- [ ] **Step 3: Correct stale spelling in legacy page modules**

In `src/pages/AboutUs.jsx` and `src/pages/Gallery.jsx`, replace every display-text occurrence of `Keanburg` with `Keansburg`. Do not change route paths, imported filenames, remote URLs, or the repository slug.

Run:

```powershell
rg -n "Keanburg" README.md public src package.json package-lock.json
```

Expected: no misspelled display text or package name remains. A Git remote or repository path containing the historical slug is outside this text search and remains unchanged.

- [ ] **Step 4: Commit README and metadata corrections**

```powershell
git add README.md public/index.html src/pages/AboutUs.jsx src/pages/Gallery.jsx
git commit -m "docs: present project as an independent personal site"
```

### Task 5: Add personal-project context to About Us

**Files:**
- Modify: `src/pages/AboutUs/AboutUs.jsx:26-116`
- Modify: `src/styles/pages/AboutUs/AboutUs.scss`

- [ ] **Step 1: Correct the historical opening date**

Make these exact copy changes in `src/pages/AboutUs/AboutUs.jsx`:

```jsx
<h2>Before 1904</h2>
```

Replace the first history paragraph with:

```jsx
<p>
  Originally a fishing village, Keansburg evolved into a resort destination
  for visitors from Northern New Jersey and New York. Keansburg Amusement
  Park has welcomed generations of visitors since 1904, and the Keansburg
  Steamboat Company helped establish the area as a recreation-focused resort
  beginning in 1910.
</p>
```

Change the next year heading and title to:

```jsx
<h2>1904</h2>
<h3>Founding of Keansburg Amusement Park</h3>
```

Expected: the timeline matches the official park history and no longer says the park was founded in 1901.

- [ ] **Step 2: Add the About This Project block**

Insert this block after the final history `content-container` and before the last information-card section:

```jsx
<div className="redBlock">
  <h2>About This Project</h2>
</div>
<section className="project-note" aria-labelledby="project-note-title">
  <h3 id="project-note-title">An independent personal project</h3>
  <p>
    Phạm Đăng Vinh created this website as a personal front-end project to
    practice React and present the history and visitor experience of Keansburg
    Amusement Park.
  </p>
  <p>
    This project is not affiliated with or endorsed by Keansburg Amusement
    Park. Contact, ticket, and payment features are interface demonstrations
    only and do not process real requests or transactions.
  </p>
</section>
```

Change the following repeated section heading from `History` to `More Information`.

- [ ] **Step 3: Style the project note**

Add this nested rule inside `.AboutUs` in `src/styles/pages/AboutUs/AboutUs.scss`:

```scss
.project-note {
  margin: 30px 0;
  padding: 24px 28px;
  border-left: 6px solid #810000;
  border-radius: 12px;
  background-color: #f9f9f9;
  color: #333;

  h3 {
    margin: 0 0 12px;
  }

  p {
    margin: 0 0 10px;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
```

Expected: the new disclaimer has clear hierarchy and remains within the existing About Us content width.

- [ ] **Step 4: Verify the About Us page visually**

Run:

```powershell
npm start
```

Open `http://localhost:3000/aboutus` at desktop and mobile viewport widths.

Expected: history cards remain aligned; the 1904 copy, `About This Project`, author name, independent-project disclaimer, and `More Information` heading are visible without horizontal overflow.

- [ ] **Step 5: Commit the About Us content**

```powershell
git add src/pages/AboutUs/AboutUs.jsx src/styles/pages/AboutUs/AboutUs.scss
git commit -m "docs: add personal project context to About Us"
```

### Task 6: Run repository-level verification

**Files:**
- Verify: `package.json`
- Verify: `package-lock.json`
- Verify: `README.md`
- Verify: `public/index.html`
- Verify: `src/**/*.js`
- Verify: `src/**/*.jsx`
- Verify: `src/**/*.scss`

- [ ] **Step 1: Run the current test command once**

```powershell
npm test -- --watchAll=false --passWithNoTests
```

Expected: exit code 0. The output may report that no tests were found because the repository currently has no test files.

- [ ] **Step 2: Run the Vercel-equivalent build gate**

```powershell
$env:CI='true'
npm run build
```

Expected: exit code 0, `Compiled successfully.`, and no ESLint warning block.

- [ ] **Step 3: Confirm content and scope**

```powershell
rg -n "Supervisor|Batch No|Group No|List Of Member|Keanburg|created using create-react-app" README.md public src package.json package-lock.json
git status --short
git diff --check HEAD~4..HEAD
```

Expected: the text search returns no matches; `git diff --check` returns no whitespace errors; status contains no generated `build/` directory or unrelated file.

- [ ] **Step 4: Review the commit sequence**

```powershell
git log -4 --oneline
```

Expected: four focused commits exist for the CI fix, lockfile, personal README/metadata, and About Us content.

### Task 7: Update GitHub About metadata

**Files:**
- External metadata only: `Dangvinh77/KeanburgPark`

- [ ] **Step 1: Verify the target repository before mutation**

```powershell
gh repo view Dangvinh77/KeanburgPark --json nameWithOwner,url,description,homepageUrl,repositoryTopics
```

Expected: `nameWithOwner` is `Dangvinh77/KeanburgPark`.

- [ ] **Step 2: Set description and homepage**

```powershell
gh repo edit Dangvinh77/KeanburgPark --description "Personal React project showcasing the history, attractions, gallery, and visitor experience of Keansburg Amusement Park." --homepage "https://e-project-1-self.vercel.app/"
```

Expected: command exits 0.

- [ ] **Step 3: Add the approved topics**

```powershell
gh repo edit Dangvinh77/KeanburgPark --add-topic react --add-topic javascript --add-topic sass --add-topic bootstrap --add-topic react-router --add-topic create-react-app --add-topic vercel --add-topic keansburg-amusement-park --add-topic personal-project
```

Expected: command exits 0 and does not remove any unrelated existing topic.

- [ ] **Step 4: Read back the GitHub About values**

```powershell
gh repo view Dangvinh77/KeanburgPark --json description,homepageUrl,repositoryTopics
```

Expected: the exact description and homepage from Step 2 appear, and all nine topics from Step 3 are present.

### Task 8: Deploy a preview and verify SPA routes

**Files:**
- Create conditionally: `vercel.json`

- [ ] **Step 1: Create a Vercel preview from the verified worktree**

```powershell
npx --yes vercel --yes 2>&1 | Tee-Object -Variable deployOutput
$previewUrl = ($deployOutput | Select-String -Pattern 'https://[^\s]+\.vercel\.app' -AllMatches).Matches.Value | Select-Object -Last 1
if (-not $previewUrl) { throw "Vercel preview URL was not found in deployment output." }
```

Expected: deployment reaches `Ready`, and `$previewUrl` contains the HTTPS preview URL printed by Vercel.

- [ ] **Step 2: Check direct navigation for representative SPA routes**

```powershell
curl.exe -sS -o NUL -w "%{http_code}`n" "$previewUrl/"
curl.exe -sS -o NUL -w "%{http_code}`n" "$previewUrl/aboutus"
curl.exe -sS -o NUL -w "%{http_code}`n" "$previewUrl/gallery"
curl.exe -sS -o NUL -w "%{http_code}`n" "$previewUrl/activity/attractions"
```

Expected: four lines containing `200`.

- [ ] **Step 3: Add an SPA fallback only if a nested route returned 404**

If all four responses were 200, skip this step and do not create `vercel.json`. If any nested route returned 404, create `vercel.json` with exactly:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Then run:

```powershell
git add vercel.json
git commit -m "fix: add Vercel SPA fallback"
npx --yes vercel --yes
```

Expected: the replacement preview reaches `Ready`; repeat Step 2 and require four HTTP 200 responses.

- [ ] **Step 4: Inspect the preview build log**

```powershell
npx --yes vercel inspect $previewUrl --logs
```

Expected: dependency installation completes, `npm run build` exits 0, and the deployment status is `Ready` rather than `Error`.

### Task 9: Final handoff

**Files:**
- Review: all files changed by Tasks 2-5 and optional `vercel.json`

- [ ] **Step 1: Confirm no CI bypass was introduced**

```powershell
rg -n "CI=false|CI=0|DISABLE_ESLINT_PLUGIN|eslint-disable" package.json vercel.json src 2>$null
```

Expected: no new CI bypass or lint suppression is present.

- [ ] **Step 2: Record final verification evidence**

Include these results in the handoff:

```text
npm ci: PASS
CI=true npm run build: PASS
npm test -- --watchAll=false --passWithNoTests: PASS
Vercel preview build: READY
Direct SPA routes: 200
GitHub About metadata: VERIFIED
```

- [ ] **Step 3: Report the remaining modernization item separately**

State that Create React App/react-scripts 5 is unmaintained and a future Vite migration is recommended, but was intentionally excluded from this focused deployment repair.
