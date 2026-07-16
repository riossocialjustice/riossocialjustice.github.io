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

## A file that looks deletable and is not

- **`.nojekyll`** — GitHub Pages runs Jekyll by default, and Jekyll ignores any folder
  starting with an underscore. Without this empty file, `_nuxt/` is never published and the
  entire site loads without styles or scripts. Do not remove it.

## The contact form

The form does **not** post to a server. It opens the visitor's own mail client with the
fields prefilled, addressed to info@riossocialjustice.org.

This is deliberate and temporary. The form was built for Netlify Forms, which intercepted the
POST at the host. On GitHub Pages nothing intercepts it, and the original code would have been
actively harmful: `fetch` does not reject on an HTTP error status, so the POST would have
"succeeded", the success message would have shown, and the message would have gone nowhere.
Visitors would have been told they had been heard when they had not.

The handler lives in `_nuxt/zch8Q--v.js` (shared by the EN and ES contact pages). Validation
still runs. On submit it builds a `mailto:` and does not clear the form, so if the mail client
fails to open the visitor keeps what they typed.

A real form needs a backend. Worth noting when that gets built: this site can receive sensitive
messages, so routing them through a free third-party form relay is not appropriate. Either use
a processor with a data processing agreement, or an endpoint Ríos controls.

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

This repository is configured and waiting on one external change: DNS.

The custom domain is already set in this repository's Pages settings, so GitHub answers to
riossocialjustice.org as soon as the domain resolves here. Until then the domain still points
at the previous host (Netlify) and the old site keeps serving, so there is no outage.

The remaining step is at the registrar (Arsys / NICLINE, managed by Two Rockets): point the
apex at GitHub's four A records and the `www` CNAME at `riossocialjustice.github.io`. The MX,
SPF, DKIM, and verification TXT records must be left untouched, because the domain also carries
Ríos's Google Workspace email.

Once DNS resolves here, GitHub issues a Let's Encrypt certificate automatically, usually within
minutes. Enable "Enforce HTTPS" in Pages settings after it appears.

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
- `/team/` returns 404. Only the individual fellow pages exist; there is no index. This was
  true on the previous site too.
- No DMARC record on the domain.

---

Maintained by [Decilion](https://decilion.com) for Ríos.
