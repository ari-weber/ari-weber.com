# project-map.md
## ari-weber.com — Astro Portfolio Rebuild

> **How to use this file:** Paste it at the top of any new Claude chat to restore full project context. Update the Chat History and To-Do sections after each session.

---

## Stack & Tools

| Layer | Tool | Notes |
|---|---|---|
| Domain | `ari-weber.com` via Cloudflare Registrar | ~$10/yr, only paid component |
| DNS | Cloudflare | Fast, free, DNSSEC |
| Hosting | Vercel (Hobby/free tier) | Non-commercial only; 100GB BW/mo |
| Framework | Astro | Static-first, zero JS by default, built-in `<Image />` optimisation |
| Version control | GitHub | Auto-deploys to Vercel on push |
| SSL | Vercel (auto) | |
| Analytics | Google Analytics (`G-SFC77JPPCZ`) | Carry over from old site |
| Heatmaps | Microsoft Clarity (`w8kyhgi5ei`) | Carry over from old site |

---

## Old Site Reference

- **Live:** https://weberphoto.qzz.io
- **Source:** https://github.com/ari-weber/weberphoto
- **Stack:** Vanilla HTML/CSS/JS, no framework, flat file structure
- **Old repo structure:**
  ```
  /css/style.css
  /js/main.js
  /images/
    Landscape & Architectural/
    Portrait/
    Event & Concert/
    Stylistic & Artistic/
  /pages/
    contact/
    landscape/
    portrait/
    event/
    stylistic/
  /build-gallery.js       ← node script to auto-generate gallery HTML
  /index.html
  /robots.txt
  /sitemap.xml
  /favicon.ico
  /google136cde2d23213dc0.html  ← Google Search Console verification
  ```

---

## Pages & Content Inventory

### Pages to carry over (rebuild in Astro)

| Page | Old path | New path | Notes |
|---|---|---|---|
| Home | `/index.html` | `/` | Keep all sections; see design notes |
| Contact | `/pages/contact/` | `/contact/` | Form, email, location, availability |
| Landscapes | `/pages/landscape/` | `/landscapes/` | Gallery page |
| Portraits | `/pages/portrait/` | `/portraits/` | Gallery page |
| Events | `/pages/event/` | `/events/` | Gallery page |
| Stylistic | `/pages/stylistic/` | `/stylistic/` | Gallery page |

### Home page sections (from old site)
1. **Nav** — Logo ("Ari Weber"), links: Home, Contact, [separator], Landscapes, Portraits, Events, Stylistic. Hamburger for mobile.
2. **Hero** — 4-image grid background, overlay, eyebrow + H1 ("Your moments, *your way.*"), subtitle (location: Chamblee), no CTA button currently (commented out).
3. **Collections / Browse by category** — 4 category cards with cover image, collection number, name, arrow. "Book a session →" link at section header.
4. **Selected Work / Recent favourites** — 3-up featured grid (1 large + 2 small). Currently: Elsa Bridge Snowing, Waxing Gibbous Moon, Cat Greece.
5. **Full collection** — All-work grid using CSS columns masonry; images show in natural aspect ratios.
6. **Availability strip** — "Currently accepting / New commissions for 2026" with "Get in touch" CTA.
7. **Footer** — Brand name + copyright.

### Contact page fields
- Email: arimweber@gmail.com
- Location: Chamblee, Georgia
- Availability status: "Commissions now"
- Form fields: Name, Email, Inquiry type (dropdown), Preferred date, Message

### Photo categories & known images
| Category | Sample images |
|---|---|
| Landscape & Architectural | Cave_Sunset_Greece.JPG, Creswell_Side.jpg, Monastery_Meteora.JPG, Peristyle_Columns.JPG, Pillar_Names_Posidon_Temple.jpg |
| Portrait | Cassidy_Portrait_B&W.JPG, Cat_Greece.jpg, Elsa_Bridge_Snowing.jpg, Elsa_Tree_Shot.jpg, Jude_Greece_Bench_Sunset.jpg, Picking_Flowers_Greece.jpg |
| Event & Concert | Greece_Party.jpg |
| Stylistic & Artistic | Plane_Full_Moon.png, Washburn_G2V_Sun.jpg, Waxing_Gibbous_Moon.png |

---

## SEO & Meta (carry over)
- `<meta name="description">` per page
- Canonical URLs (update to `ari-weber.com`)
- Schema.org JSON-LD: `BreadcrumbList` + `WebSite` on home; add `ImageGallery` / `Photograph` on gallery pages
- `robots.txt` and `sitemap.xml` (Astro can auto-generate sitemap via `@astrojs/sitemap`)
- Google Search Console: re-verify under new domain (old html file: `google136cde2d23213dc0.html`)
- Update GA and Clarity to point to `ari-weber.com`

---

## Design Notes (old → new)
- Dark theme, serif/sans mix, minimal — keep overall aesthetic
- CSS custom properties (`var(--serif)`, `var(--border)`, etc.) — migrate to Astro global styles
- Animations: `.fade-up` staggered on hero, `.scroll-reveal` on cards — recreate with Astro (CSS + small JS island or `transition:animate`)
- Hero: 4-image grid behind overlay — keep layout, use Astro `<Image />` for optimised delivery
- Gallery: CSS `columns` masonry — images display at natural aspect ratios, flow top-to-bottom per column. No JS needed.
- Nav mobile hamburger (`nav-toggle`) — recreate as minimal Astro component with scoped `<script>`

---

## Key Implementation Notes

### TypeScript in Astro scripts
- Inline `<script>` tags inside `<head>` (GA, Clarity) run in browser context; TS will squawk about `window.dataLayer`, `gtag()`, etc. These are cosmetic VS Code errors only — add `// @ts-nocheck` as the first line of each such `<script>` block to silence them (already done via comment in Base.astro).
- Frontmatter (server-side) TS is strict. Tuple types for component props must be annotated explicitly — do **not** use `as [typeof x[0], ...]` self-referential casts. Define a local interface and annotate directly: `const arr: [Foo, Foo, Foo] = [...]`.

### Gallery layout
- `GalleryGrid.astro` uses CSS `columns` (not CSS Grid) for masonry. Images natural height, no `object-fit: cover`. `break-inside: avoid` on each item. Gap handled via `margin-bottom` on items.
- `FeaturedGrid.astro` (Selected Work section on home): no fixed `aspect-ratio` on wrappers; images use `width: 100%; height: auto`. `grid-template-rows` removed from `.featured-secondary`.

### Contact form
- Backend: Formspree. Endpoint already set to `https://formspree.io/f/mjgdagrw`.

---

## Astro Project Structure (target)

```
/src
  /components
    Nav.astro
    Footer.astro
    GalleryGrid.astro
    CategoryCard.astro
    FeaturedGrid.astro
    ContactForm.astro
  /layouts
    Base.astro          ← head, meta, analytics, nav, footer
    GalleryPage.astro   ← shared layout for the 4 category pages
  /pages
    index.astro
    contact.astro
    landscapes.astro
    portraits.astro
    events.astro
    stylistic.astro
  /styles
    global.css          ← CSS vars, reset, typography
/public
  /images               ← original photos (or use src/assets for Astro optimisation)
  favicon.ico
  robots.txt
  google[...].html      ← GSC verification
/astro.config.mjs
```

---

## To-Do

> **Importance:** `[X/10]` — 10 = blocks launch or causes data loss; 1 = cosmetic/nice-to-have.
> Done items left unchecked only for reference.

---

### Setup
- [x] Register `ari-weber.com` on Cloudflare Registrar **[10/10]**
- [x] Connect GitHub repo to Vercel **[10/10]**
- [x] Point Cloudflare DNS to Vercel nameservers **[10/10]**
- [x] Configure `astro.config.mjs` — add `@astrojs/sitemap`, set `site: 'https://ari-weber.com'`

---

### Core build (complete)
- [x] Create `Base.astro` layout with `<head>`, GA, Clarity, meta slots
- [x] Build `Nav.astro` with mobile hamburger
- [x] Build `Footer.astro`
- [x] Migrate global CSS variables and reset from `style.css`
- [x] Rebuild `index.astro` — all 6 sections
- [x] Replace `build-gallery.js` with static photo arrays per page (no build script needed)
- [x] Build `GalleryGrid.astro` component (used on all 4 category pages)
- [x] Build all 4 category pages
- [x] Build `contact.astro` with form (Formspree — endpoint set)
- [x] Carry over scroll-reveal and fade-up animations
- [x] Fix tuple type annotation in `index.astro` (`featured` array)
- [x] Convert gallery grids to natural-aspect-ratio CSS columns masonry

---

### Assets
- [x] Copy all images from old repo into `/public/images/` — **nothing renders without this** **[10/10]**
- [ ] Create `public/images/og-default.jpg` for Open Graph fallback (missing file causes broken social sharing cards) **[8/10]**
- [ ] Audit images — convert to WebP where possible; use Astro `<Image />` component for optimised serving **[8/10]**
- [x] Copy `favicon.ico` from old repo into `public/` (only `favicon.svg` exists currently) **[7/10]**

---

### Bugs & Technical Issues

- [ ] **Image paths with spaces will fail on strict CDNs** — folder names `Landscape & Architectural`, `Event & Concert`, and `Stylistic & Artistic` contain unencoded spaces in all `src` attributes throughout the codebase. Browsers auto-encode spaces in relative hrefs but raw `src` attribute strings can 404 on Cloudflare/Vercel CDN edge nodes. Either rename folders to kebab-case (`landscape-architectural/`) and update all references, or URL-encode all paths (`Landscape%20%26%20Architectural`). Renaming is cleaner and future-safe. **[9/10]**
- [ ] **`package.json` / `package-lock.json` mismatch** — `@astrojs/check` and `typescript` are in the lockfile but absent from `package.json`. `npm install` on a clean clone will not install them; type checking silently breaks. Add both as `devDependencies` in `package.json`. **[8/10]**
- [ ] **`GalleryGrid.astro` dead CSS: `column-gap` never applied** — the rule is inside a nested `.gallery-grid .gallery-grid {}` selector (the outer block is empty). `column-gap: var(--space-3)` is dead code and the browser falls back to `normal` (≈1em). Fix by promoting it to the top-level `.gallery-grid {}` rule. **[6/10]**
- [ ] **Invalid `img` HTML attributes in `GalleryGrid.astro`** — `width="100%"` and `height="auto"` are not valid HTML attribute values (they accept integers only). These provide no CLS prevention. Remove them; sizing is already handled by CSS. **[6/10]**
- [ ] **GA and Clarity fire in development mode** — both analytics snippets in `Base.astro` run unconditionally. Wrap each `<script>` in `{import.meta.env.PROD && <script>…</script>}` to avoid polluting production analytics with dev traffic. **[6/10]**
- [ ] **Dead CSS block in `FeaturedGrid.astro`** — empty `@media (min-width: 768px) { .featured-main .featured-img-wrap { /* comments only */ } }` block. Delete it. **[3/10]**
- [ ] **`package.json` name mismatch** — `package.json` declares `"name": "ari-weber-com"` but `package-lock.json` root entry says `"name": "ari-weber"`. Trivial but causes confusion; unify to `ari-weber`. **[2/10]**

---

### UX & Feature Gaps

- [ ] **No lightbox/modal for gallery photos** — clicking any photo does nothing. For a photography portfolio this is the single biggest UX gap: visitors have no way to view full-resolution images. Implement a CSS/JS lightbox (e.g. minimal custom solution or `photoswipe`) on all gallery pages and the homepage featured grid. **[10/10]**
- [ ] **No `404.astro` page** — missing custom 404 leaves visitors on a generic Vercel/Astro error screen with no nav, branding, or back link. Create `src/pages/404.astro`. **[6/10]**
- [ ] **No image loading placeholder** — lazy-loaded gallery images pop in abruptly. Add a subtle `background: var(--bg-subtle)` placeholder via CSS on `.gallery-item` so empty space is visible before load rather than collapsing. **[5/10]**
- [ ] **No breadcrumb nav on inner pages** — schema has `BreadcrumbList` but there's no visible breadcrumb UI. Minor, but useful for orientation on direct-linked gallery pages. **[3/10]**
- [ ] **No back-to-top button** — gallery pages can be long. Add a fixed back-to-top button that appears after scrolling 400px. **[3/10]**
- [ ] **No photo count shown on category cards** — visitors don't know how many photos are in each category until they navigate there. Consider adding a count badge to `CategoryCard.astro`. **[2/10]**

---

### Performance & SEO

- [ ] **Render-blocking Google Fonts** — `@import url(…)` in `global.css` is synchronous and blocks rendering. Move to `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="stylesheet" href="…&display=swap">` in `Base.astro` `<head>`. This alone can shave 200–600ms from FCP. **[8/10]**
- [ ] **No `font-display: swap`** — current Google Fonts `@import` URL is missing `&display=swap`, causing FOIT (flash of invisible text) while fonts load. Adding `?display=swap` to the import URL is a one-line fix. **[7/10]**
- [ ] **All images unoptimized** — photos served raw from `/public` (no WebP conversion, no `srcset`, no responsive sizing, no blur-up). Switch to Astro's `<Image />` component (`import { Image } from 'astro:assets'`) for automatic WebP output, correct dimensions, and `loading="lazy"` with CLS-safe width/height. Especially important for a photo portfolio where images dominate page weight. **[9/10]**
- [ ] **No `<link rel="preload">` for hero background images** — the four hero grid images are LCP candidates and are loaded via `<img loading="eager">` but not preloaded. Add `<link rel="preload" as="image">` tags for at least the first two hero images in the `<head>`. **[6/10]**

---

### Accessibility

- [ ] **No skip-navigation link** — keyboard-only and screen-reader users must tab through the full nav on every page before reaching content. Add a visually-hidden `<a href="#main-content">Skip to content</a>` as the first element in `Base.astro`, visible on focus. **[7/10]**
- [ ] **Mobile nav does not trap focus** — when the hamburger menu is open, pressing Tab lets focus escape the menu into the page behind it. Add a focus-trap (listen for Tab/Shift+Tab on first/last focusable items; also close on Escape). **[7/10]**
- [ ] **Gallery captions only accessible on hover** — `.gallery-caption` has `opacity: 0` by default; keyboard/screen-reader users never see them. Either make captions always visible, or use a `<figcaption>` that is visually hidden but in the DOM (not `opacity: 0` which is still accessible, but `transform` + `opacity` together can cause issues). Current implementation is fine for screen readers (opacity 0 is still in the a11y tree) but verify with VoiceOver. **[5/10]**
- [ ] **Contact form has no programmatic inline error messages** — on failed submission the form relies on browser-native validation bubbles, which are unstyled and inconsistent cross-browser. Add visible `aria-describedby` error messages per field. **[5/10]**

---

### Code Quality & Cleanup

- [ ] **Remove unused default Astro starter files** — `src/components/Welcome.astro`, `src/layouts/Layout.astro`, `src/assets/astro.svg`, `src/assets/background.svg` are default scaffold files with no references in the actual project. Delete them to reduce confusion. **[4/10]**
- [ ] **Remove `@vercel/analytics` from `package.json`** — it is listed as a dependency but never imported anywhere in source. GA is used instead. Remove to keep the dependency graph clean. **[4/10]**
- [ ] **Move `@astrojs/check` and `typescript` to `devDependencies`** — they are build-time tools, not runtime dependencies. Also add `"check": "astro check"` to `package.json` scripts. **[5/10]**
- [ ] **`GalleryPage.astro` uses unnecessarily verbose import path** — `import Base from '../layouts/Base.astro'` works but since `GalleryPage.astro` is itself in `src/layouts/`, the correct relative path is `'./Base.astro'`. Low priority, but can cause confusion. **[2/10]**
- [ ] **Remove empty `test.txt` from project root** **[2/10]**
- [ ] **Update `README.md`** — currently shows the default Astro starter README. Replace with project-specific setup instructions (clone → `npm install` → copy images → `npm run dev`). **[3/10]**

---

### SEO
- [x] Canonical URLs set to `ari-weber.com` in `Base.astro`
- [x] JSON-LD schema: `WebSite` + `BreadcrumbList` on home; `ImageGallery` on all gallery pages
- [x] `robots.txt` written (points to sitemap-index.xml)
- [x] `google136cde2d23213dc0.html` carried over to `public/`
- [x] Re-verify Google Search Console (new domain) **[5/10]**
- [ ] Update GA / Clarity property to new domain **[6/10]**
- [x] Confirm `sitemap.xml` auto-generation works after first Vercel deploy **[6/10]**

---

### QA & Launch
- [ ] Test all pages on mobile **[9/10]**
- [ ] Check Lighthouse scores (target: 90+ Performance, 100 SEO) **[7/10]**
- [ ] Verify all image alt text **[6/10]**
- [x] Test contact form submission end-to-end **[9/10]**
- [ ] Confirm analytics firing (GA + Clarity both active on production) **[7/10]**
- [x] Redirect `weberphoto.qzz.io` → `ari-weber.com` (if possible via old host) **[4/10]**

---

## Chat History

### Chat 1 — Planning (2026-06-10)
- Decided on `ari-weber.com` over `ariweber.net` (.com wins on trust, CTR, AI indexing). `ariweber.com` is GoDaddy-parked at high price — hyphen concern removed.
- Stack chosen: Cloudflare Registrar (domain) + Vercel free tier (hosting) + Astro (framework) + GitHub (version control).
- Vercel Hobby limits confirmed: 100GB BW/mo, 1M function invocations, non-commercial only. Portfolio won't approach limits.
- Astro project initialised and connected.
- Audited old site (weberphoto.qzz.io / github.com/ari-weber/weberphoto): vanilla HTML/CSS/JS, 4 gallery categories, home with 6 sections, contact form, GA + Clarity analytics, JSON-LD schema, `build-gallery.js` for gallery injection.
- This project-map.md created.

### Chat 2 — Core build (2026-06-11)
- Built entire Astro source from scratch; delivered as `ari-weber-astro.zip`. Repo location confirmed: `C:\Users\arimw\Documents\GitHub\ari-weber.com`.
- Could not access raw CSS from old repo (private); inferred design tokens from live site + project map. Dark theme, Playfair Display (serif) / DM Sans (sans), warm gold accent (`#c8a96e`).
- Design tokens in `src/styles/global.css`: full custom property set (`--bg`, `--text`, `--serif`, `--sans`, `--accent`, `--border`, spacing scale, motion vars). `fade-up` + `scroll-reveal` (IntersectionObserver in `Base.astro`) carried over.
- `Base.astro`: GA `G-SFC77JPPCZ`, Clarity `w8kyhgi5ei`, JSON-LD slot, meta/OG/Twitter tags, canonical, GSC meta tag.
- `Nav.astro`: fixed header with scroll-triggered background, desktop links + separator, mobile hamburger with CSS clip-path animation, active-link highlighting via `Astro.url.pathname`.
- Gallery approach: static photo arrays per page (simpler than content collections given the small image count; easy to extend later).
- `contact.astro`: Formspree backend — endpoint set to `https://formspree.io/f/mjgdagrw`.
- Files created: `astro.config.mjs`, `global.css`, `Base.astro`, `GalleryPage.astro`, `Nav.astro`, `Footer.astro`, `GalleryGrid.astro`, `CategoryCard.astro`, `FeaturedGrid.astro`, `index.astro`, `landscapes.astro`, `portraits.astro`, `events.astro`, `stylistic.astro`, `contact.astro`, `robots.txt`, `google136cde2d23213dc0.html`.
- Windows install commands provided (PowerShell `Copy-Item`).

### Chat 3 — Bug fixes & masonry layout (2026-06-11)
- **TS error fix (`index.astro`):** `featured` array had a self-referential `as [typeof featured[0], ...]` cast causing TS7022 circular inference error. Fixed by declaring a local `interface FeaturedPhoto` and annotating the const directly: `const featured: [FeaturedPhoto, FeaturedPhoto, FeaturedPhoto] = [...]`.
- **TS cosmetic errors (`Base.astro`):** `window.dataLayer`, `gtag()` argument count, Clarity IIFE variable types — all browser-context globals inside `<script>` tags. Not build-breaking; silence with `// @ts-nocheck` at top of each affected script block.
- **Masonry layout (`GalleryGrid.astro`):** Replaced `display: grid` + fixed `aspect-ratio: 4/3` with CSS `columns` masonry. Images now render at natural aspect ratio. Key changes: `columns: 1/2/3` at breakpoints, `break-inside: avoid` + `margin-bottom` on items, `height: auto` on `img`. Hover scale and caption fade-in unchanged.
- **Natural aspect ratios (`FeaturedGrid.astro`):** Removed `aspect-ratio: 3/4` from `.featured-main .featured-img-wrap`, `aspect-ratio: 4/3` from `.featured-sub .featured-img-wrap`, `grid-template-rows: 1fr 1fr` from `.featured-secondary`, and `height: 100%; object-fit: cover` from images. All images now display full height at natural ratio.

### Chat 4 — Audit & issue triage (2026-06-11)
- Full code audit performed across all source files.
- Major findings: image paths with spaces risk CDN 404s (rename folders); no lightbox (biggest UX gap); unoptimized images (switch to Astro `<Image />`); render-blocking Google Fonts (@import → <link> in head); `og-default.jpg` missing (broken OG cards); `package.json`/`package-lock.json` mismatch (`@astrojs/check`, `typescript` missing from package.json devDeps).
- Minor findings: `GalleryGrid.astro` dead `column-gap` CSS; invalid `img` HTML attributes; GA/Clarity fire in dev; unused `@vercel/analytics` dep; unused default Astro starter files; no 404 page; no skip-nav link; no mobile focus trap.
- All to-do items scored [1–10] for importance. Full details in Bugs & Technical Issues, UX & Feature Gaps, Performance & SEO, Accessibility, and Code Quality sections above.
