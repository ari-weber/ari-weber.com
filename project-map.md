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
5. **Full collection** — All-work grid, auto-generated via `build-gallery.js` between `<!-- GALLERY:START -->` and `<!-- GALLERY:END -->` markers.
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
- Gallery: old site used a Node build script (`build-gallery.js`) to inject HTML. In Astro, replace with a content collection or glob import — no build script needed.
- Nav mobile hamburger (`nav-toggle`) — recreate as minimal Astro component with scoped `<script>`

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

### Setup
- [ ] Register `ari-weber.com` on Cloudflare Registrar
- [ ] Connect GitHub repo to Vercel
- [ ] Point Cloudflare DNS to Vercel nameservers
- [x] Configure `astro.config.mjs` — add `@astrojs/sitemap`, set `site: 'https://ari-weber.com'`

### Core build
- [x] Create `Base.astro` layout with `<head>`, GA, Clarity, meta slots
- [x] Build `Nav.astro` with mobile hamburger
- [x] Build `Footer.astro`
- [x] Migrate global CSS variables and reset from `style.css`
- [x] Rebuild `index.astro` — all 6 sections
- [x] Replace `build-gallery.js` with static photo arrays per page (no build script needed)
- [x] Build `GalleryGrid.astro` component (used on all 4 category pages)
- [x] Build all 4 category pages
- [x] Build `contact.astro` with form (Formspree — replace `ACTION_URL` with endpoint)
- [x] Carry over scroll-reveal and fade-up animations

### Assets
- [ ] Copy all images from old repo into `/public/images/` (preserve folder names: `Landscape & Architectural/`, `Portrait/`, `Event & Concert/`, `Stylistic & Artistic/`)
- [ ] Audit images — convert to WebP where possible, use Astro `<Image />` for optimised serving
- [ ] Copy `favicon.ico` from old repo into `public/`
- [ ] Create `public/images/og-default.jpg` for Open Graph fallback

### SEO
- [x] Canonical URLs set to `ari-weber.com` in `Base.astro`
- [x] JSON-LD schema: `WebSite` + `BreadcrumbList` on home; `ImageGallery` on all gallery pages
- [x] `robots.txt` written (points to sitemap-index.xml)
- [x] `google136cde2d23213dc0.html` carried over to `public/`
- [ ] Re-verify Google Search Console (new domain)
- [ ] Update GA / Clarity property to new domain
- [ ] Confirm `sitemap.xml` auto-generation works after first Vercel deploy

### QA & Launch
- [ ] Test all pages on mobile
- [ ] Check Lighthouse scores (target: 90+ Performance, 100 SEO)
- [ ] Verify all image alt text
- [ ] Test contact form submission
- [ ] Confirm analytics firing
- [ ] Redirect `weberphoto.qzz.io` → `ari-weber.com` (if possible via old host)

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
- `contact.astro`: Formspree backend — **`ACTION_URL` placeholder must be replaced** with real Formspree endpoint before going live.
- Files created: `astro.config.mjs`, `global.css`, `Base.astro`, `GalleryPage.astro`, `Nav.astro`, `Footer.astro`, `GalleryGrid.astro`, `CategoryCard.astro`, `FeaturedGrid.astro`, `index.astro`, `landscapes.astro`, `portraits.astro`, `events.astro`, `stylistic.astro`, `contact.astro`, `robots.txt`, `google136cde2d23213dc0.html`.
- Windows install commands provided (PowerShell `Copy-Item`).
