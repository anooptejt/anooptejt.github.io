# Anoop Tej Thotapalli Portfolio

A public portfolio for DevOps, platform engineering, AIOps and independent
consulting. The site is built with React and Vinext, then published to GitHub
Pages.

## Publishing new content

Articles, field notes, talks and professional profile links live in
`app/content.ts`. Add a new article to `publications` with a sortable
`publishedAt` value. Set `featured: true` on the three entries you want on the
homepage. The `/insights/` page displays the complete archive in date order.

## SEO maintenance

Shared identity and structured data live in `app/seo.ts`. Page-specific titles,
descriptions, canonical URLs and social metadata live beside each page. The
static export creates `sitemap.xml` and `robots.txt`, and preserves JSON-LD in
the generated HTML.

When adding a new public page:

1. Give it one descriptive `h1` and unique metadata.
2. Add a self-referencing canonical URL.
3. Add the route to `scripts/export-pages.mjs` and its sitemap entries.
4. Link to it from an existing relevant page.
5. Run `npm test` before publishing.

For stronger long-term organic search growth, publish original article pages on
this domain and use external Medium or LinkedIn copies as distribution links.

## Prerequisites

- Node.js `>=22.13.0`

## Quick start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Site structure

- `app/page.tsx`: portfolio homepage
- `app/insights/page.tsx`: complete writing and talks archive
- `app/content.ts`: shared publishing content
- `app/globals.css`: visual system and responsive layouts
- `scripts/export-pages.mjs`: static export for GitHub Pages

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: export and verify content, metadata, structured data and crawl files
- `npm run lint`: run source quality checks
- `npm run export:pages`: create the deployable static site

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
