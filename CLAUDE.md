# CLAUDE.md — Plancha360 Website

This file tells Claude Code how to work in this project.
Read it fully before making any changes.

---

## Project overview

Plancha360 is a premium outdoor plancha grill brand launching in Spain in August 2026.
This is the marketing website and waitlist collection tool.
It is built with Astro and deployed via Cloudflare Pages from the GitHub repository.

**Live URL:** plancha360.com
**GitHub:** github.com/slave14799/plancha360-website
**Deploy:** Every push to `main` triggers an automatic Cloudflare Pages build.

---

## Tech stack

- **Framework:** Astro (static site, no SSR)
- **Styling:** CSS (scoped per component), no Tailwind
- **3D viewer:** Google model-viewer web component (`<model-viewer>`)
- **3D model file:** `public/3d/plancha360.glb` — this is the centered, corrected version. Do NOT replace it.
- **Forms:** Existing waitlist form — preserve the submission logic exactly
- **Node:** use `npm` (not yarn or pnpm)

---

## Git workflow — MANDATORY

Before every working session, always run:
```
git pull
```

After every meaningful change (completed section, bug fix, new component), always run:
```
git add -A
git commit -m "short description of what changed"
git push
```

Never leave the session with uncommitted changes.
Never push broken code that fails `npm run build`.

---

## Build check

Before pushing, always verify the build passes:
```
npm run build
```

If the build fails, fix it before pushing. Do not push a broken build.

---

## File structure

```
src/
  components/     — reusable Astro components
  pages/          — page files (index.astro is the homepage)
  data/           — content config files (images, text references)
  styles/         — global CSS
public/
  3d/             — GLB model files
  images/
    hero/         — hero section images
    lifestyle/    — lifestyle/gathering images
    product/      — product shot images
docs/             — reference documents (copy, notes)
  plancha360-website-copy.md  — the final approved website copy
```

---

## The 3D viewer — DO NOT MODIFY INTERNALS

`src/components/ProductViewer3D.astro` is a working component.
Do not change the JavaScript inside the `<script>` tag.
Do not change the material pass palette.
Do not change the GLB file path.

You may change:
- `camera-orbit` values (theta, phi, radius)
- `field-of-view`
- CSS layout and sizing of the viewer container

If you need to adjust the camera, change only the `camera-orbit` attribute
AND the matching value in the `tick()` function inside the script.
They must always match.

---

## Images — swappable architecture

All image paths must be referenced through `src/data/images.ts` (or equivalent config file).
Do NOT hardcode image paths scattered across multiple components.
One file, one place to swap images when real photography arrives.

If an image file is missing, render a neutral placeholder block with the intended
filename labeled clearly (e.g. `[hero-main.jpg]`). Never break the layout because
an image is missing.

---

## Copy — use verbatim

All website copy is in `docs/plancha360-website-copy.md`.
Use that copy exactly as written.
Do NOT write your own marketing copy.
Do NOT add filler text, placeholder headlines, or briefing-style internal notes.
Every word visible to a site visitor must come from the copy file.

---

## Design direction

The design follows the visual language of OFYR, Breeo, and Everdure:
- Warm, earthy palette: charcoal/near-black, cream/off-white, rust/ember accent
- Large, confident editorial typography with generous whitespace
- Minimal UI — no clutter, no heavy borders, no excessive badges
- Full-bleed image sections alternating with text
- Restrained motion only

Color tokens to use:
```css
--color-bg: #f5f0e8;
--color-surface: #ffffff;
--color-text: #1a1714;
--color-muted: #6b6158;
--color-accent: #b6532a;
--color-dark: #2a1c14;
```

Typography:
- Headlines: large, bold, tight tracking
- Body: readable, 1.6–1.7 line height, max ~65ch line length
- No system fonts — use a clean serif or strong sans-serif via Google Fonts

---

## What NOT to do

- Do not add internal/briefing text that visitors would see (e.g. "Show, don't tell", "Built for the first customer")
- Do not modify `public/3d/plancha360.glb`
- Do not use localStorage or sessionStorage
- Do not add unnecessary npm packages without asking first
- Do not change the waitlist form submission logic
- Do not push if `npm run build` fails
- Do not invent copy — use docs/plancha360-website-copy.md

---

## Current known issues

- The 3D viewer camera zoom may need fine-tuning after the redesign.
  Adjust `camera-orbit` radius and `field-of-view` to show the full grill
  (plate + ring + all three legs) comfortably in the frame on mobile.
- Real product photos are not yet available. Use the 3D viewer as the
  primary product visual. AI-generated lifestyle images are temporary placeholders.

---

## Contact / ownership

Project owner: Tim Hunger
Do not change project structure, deployment config, or domain settings
without explicit instruction from Tim.
