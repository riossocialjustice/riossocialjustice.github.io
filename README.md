# riossocialjustice.github.io

The Ríos website. Static site, hosted on GitHub Pages, served from the root of this repository.

- **Staging:** https://riossocialjustice.github.io/ (current)
- **Production:** https://riossocialjustice.org (not yet cut over; see "Going live" below)

## What this is

A fully prerendered static copy of the Ríos site: 48 pages across English and Spanish, with
all assets self-contained in this repository. There is no build step and no server. What is
committed here is exactly what is served.

It originated as the compiled output of a Nuxt 3 site, so the HTML carries Nuxt's runtime and
hydration payloads. Two practical consequences:

1. **There is no CMS connection.** Content was previously managed in DatoCMS. This copy is
   independent of it, and changes made in DatoCMS will not appear here. Content is edited
   directly in the files (see below).
2. **Every page has a `_payload.json` beside it.** Nuxt reads that file when a visitor
   navigates between pages client-side, so it holds a second copy of the page's text.

## Editing content

For any text change, edit **both** files in the page's folder:

- `<page>/index.html` — what a visitor sees on first load
- `<page>/_payload.json` — what Nuxt swaps in when navigating from another page

Changing only the HTML leaves stale text that reappears when a visitor arrives at the page
from elsewhere on the site. This is the single easiest mistake to make in this repo.

Then commit and push to `main`. GitHub Pages redeploys automatically, usually within a minute.

## Layout

```
index.html              Home (English)
es/                     Spanish site, same structure
about/  team/  work/    Section pages, each as <page>/index.html
_nuxt/                  JS, CSS, and hydration payloads. Do not hand-edit.
assets/fonts/           Antonio + Inter webfonts
assets/datocms/         Images (18), previously served from DatoCMS
404.html                Served automatically for any missing path
.nojekyll               Required. See below.
robots.txt              Temporary. See below.
```

## Two files that look deletable and are not

- **`.nojekyll`** — GitHub Pages runs Jekyll by default, and Jekyll ignores any folder
  starting with an underscore. Without this empty file, `_nuxt/` is never published and the
  entire site loads without styles or scripts. Do not remove it.
- **`robots.txt`** — currently blocks all indexing **on purpose**, because this staging copy
  would otherwise compete with riossocialjustice.org in search results and split the site's
  ranking. It must be removed or replaced when the domain is cut over.

## Fonts

The site is set in **Antonio** (display) and **Inter** (body), both open-source and served
from `assets/fonts/`. They replace GT America, a commercial typeface from Grilli Type that
the site previously used without a license in place. Antonio was chosen because its condensed
proportions match the existing wordmark, so the change is close to invisible in the display
type.

The CSS refers to them by the generic family names `sans` (Inter) and `compressed` (Antonio),
which is why the swap touched only the `@font-face` declarations and none of the ~580 places
those families are used.

## Going live

The domain currently points at the previous host. Cutting over means changing DNS at the
registrar (Arsys / NICLINE) to point at GitHub Pages, then setting the custom domain in this
repository's Pages settings. When that happens, delete `robots.txt` so the site can be indexed.

## Local preview

```
python3 -m http.server 8642
```

Then open http://localhost:8642. Serving over `file://` will not work; the absolute asset
paths require a web server at the root.

## Known issues inherited from the previous site

These are reproduced faithfully from the site as it existed and are worth fixing:

- **No page has a `<title>` or meta description.** Search engines and social shares have
  nothing to display.
- `work/research-education-events/null/` exists as a page, from a content entry that was
  saved without a URL slug.
- The favicon reference is empty and returns a 404.
- The contact form previously posted to the old host's form handler and does not submit here.

---

Maintained by [Decilion](https://decilion.com) for Ríos.
