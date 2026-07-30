import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the architecture portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Anoop Tej Thotapalli \| Independent DevOps &amp; AIOps Architect<\/title>/i,
  );
  assert.match(html, /Engineering systems,/);
  assert.match(html, /Engineering Front Door/);
  assert.match(html, /Intelligent DevOps Agent/);
  assert.match(html, /Unified Multi-Cloud CI\/CD/);
  assert.match(html, /Projects are anonymized/);
  assert.match(html, /src="\/anoop-portrait\.jpg"/);
  assert.match(html, /alt="Anoop Tej Thotapalli"/);
  assert.match(
    html,
    /mailto:anooptejthotapalli@gmail\.com\?subject=Freelance%20Architecture%20Enquiry/,
  );
  assert.match(
    html,
    /https:\/\/www\.linkedin\.com\/in\/anooptej-t-a3754b77/,
  );
  assert.match(html, /Independent DevOps &amp; AIOps Architect/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps confidential organization details out of project content", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(
    page,
    /OpsMx|N2 Systems|PruTech|Wells Fargo|MetricStream|GraceLyster|Bank of America|Lowe’s|Cummins|StateStreet|Exelon/i,
  );
  assert.match(page, /projects = \[/);
  assert.match(page, /id: "front-door"/);
  assert.match(page, /id: "aiops-agent"/);
  assert.match(page, /id: "enterprise-platforms"/);
  assert.doesNotMatch(page, /—|–/);
  assert.doesNotMatch(layout, /—|–/);
  assert.match(layout, /images:\s*\["\/og\.png"\]/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.skip-link:focus/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
