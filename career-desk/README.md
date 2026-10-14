# Ask Anoop Tej

A career guidance website extending [Anoop’s engineering site](https://anooptejt.github.io/).

Public URL: https://anooptejt.github.io/askanooptejthotapalli/

## What is here

- Career notes on visibility, choosing a role, and keeping AI decisions human
- Guides for DevOps, AI, CI/CD, Kubernetes, Docker, OpenShift, Argo CD, Spinnaker, and GitHub Actions
- Open source projects with a realistic first contribution
- Interview practice and a one-week preparation plan
- An Ask me page that matches questions to existing guides and prepares a note to copy into LinkedIn

The site does not send or store questions. Contact and replies happen on LinkedIn. No API keys, n8n service, database, or server hosting are required.

## Run locally

Use Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:38471/askanooptejthotapalli/.

## Verify and preview the production website

```bash
npm test
npm start
```

Open http://127.0.0.1:38471/askanooptejthotapalli/.

`npm test` runs ESLint, builds all static pages, and checks every exported local link and asset. `npm start` serves the actual `out/` files under the same path used in production. Stop the development server before starting the production preview; both use port 38471.

## GitHub Pages publishing

The static export in `out/` is hosted at `/askanooptejthotapalli/` alongside the portfolio in `anooptejt/anooptejt.github.io`. The deployment copy of this source lives in that repository under `career-desk/`. Its Pages workflow builds both sites and includes this export under `dist-pages/askanooptejthotapalli/`.

The URL prefix is defined in `src/lib/site.ts`; Next.js applies it to navigation and scripts, and the profile image uses the same prefix. Keep the prefix aligned with the publishing folder. Trailing slashes allow direct visits and refreshes on GitHub Pages. Image optimization is disabled because Pages has no image server.

Edit guides in `src/content/`, identity and contact links in `src/lib/profile.ts`, and the homepage in `src/app/page.tsx`. Commit content changes to the deployment copy to publish them through the portfolio workflow.

## Previous relay prototype

The earlier server-backed Human Relay implementation is preserved in Git history (last prototype commit: `b34669f`). It is not part of this static website. The old `n8n/` export is retained here only as a historical artifact and is not needed for deployment.
