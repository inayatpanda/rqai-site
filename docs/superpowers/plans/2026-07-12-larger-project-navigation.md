# Larger Project Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enlarge the desktop project rail without changing any route or external URL.

**Architecture:** Keep the existing `Header` and `PROJECTS` mapping intact. Change only the rail's responsive presentation classes and protect the sizing and route mapping with the existing source-contract test suite.

**Tech Stack:** React, React Router, Tailwind CSS, Node test runner, TypeScript, Vite SSG.

## Global Constraints

- The desktop project rail is 56px high.
- Project labels are 17px with a comfortable line height.
- The rail remains a single horizontally scrollable line from the existing `lg` breakpoint.
- Mobile navigation, project names, routes, spoke-site URLs, checkout URLs and payment configuration do not change.

---

### Task 1: Enlarge and verify the desktop project rail

**Files:**
- Modify: `scripts/parallax-field.test.mjs`
- Modify: `src/components/Shell.tsx`

**Interfaces:**
- Consumes: `PROJECTS`, whose entries provide `slug` and `name`.
- Produces: the existing `nav[aria-label="All projects"]` with larger visual and pointer targets.

- [ ] **Step 1: Write the failing source-contract test**

Add a test that reads `src/components/Shell.tsx` and asserts the All Projects rail uses `h-14`, `text-[1.0625rem]`, `gap-x-7`, and still maps every `PROJECTS` item to ``/${project.slug}``.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`

Expected: FAIL because the rail still uses `h-10`, `text-sm`, and `gap-x-5`.

- [ ] **Step 3: Implement the minimal navigation change**

Change the rail classes in `src/components/Shell.tsx` to:

```tsx
className="no-scrollbar container-edge flex h-14 items-center gap-x-7 overflow-x-auto text-[1.0625rem] leading-none"
```

Keep the `NavLink` destinations and mobile navigation unchanged.

- [ ] **Step 4: Verify the implementation**

Run: `npm test && npm run typecheck && npm run build && git diff --check`

Expected: all tests pass, TypeScript succeeds, all ten static routes render, and the diff check produces no output.

- [ ] **Step 5: Commit locally**

```bash
git add scripts/parallax-field.test.mjs src/components/Shell.tsx
git commit -m "feat: enlarge the project navigation rail"
```

Do not push.

