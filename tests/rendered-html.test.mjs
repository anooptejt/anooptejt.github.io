import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
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
    /<title>DevOps, Platform Engineering &amp; AIOps Architect \| Anoop Tej<\/title>/i,
  );
  assert.match(html, /DevOps and AIOps platforms,/);
  assert.match(html, /Engineering Front Door/);
  assert.match(html, /Intelligent DevOps Agent/);
  assert.match(html, /Unified Multi-Cloud CI\/CD/);
  assert.match(html, /Writing &amp; talks/i);
  assert.match(html, /Your AI Chat Is Private Until the Moment You Share It/);
  assert.match(html, /Browse all writing, field notes &amp; talks/);
  assert.match(html, /Hire me on Fiverr/);
  assert.match(html, /https:\/\/www\.fiverr\.com\/anooptejt/);
  assert.match(html, /PaperCall/);
  assert.match(html, /Projects are anonymized/);
  assert.match(html, /src="\/anoop-portrait\.jpg"/);
  assert.match(
    html,
    /alt="Portrait of Anoop Tej Thotapalli, DevOps and AIOps architect"/,
  );
  assert.match(
    html,
    /mailto:anooptejthotapalli@gmail\.com\?subject=Freelance%20Architecture%20Enquiry/,
  );
  assert.match(
    html,
    /https:\/\/www\.linkedin\.com\/in\/anooptej-t-a3754b77/,
  );
  assert.match(html, /Independent DevOps · Platform Engineering · AIOps Architect/);
  assert.match(html, /rel="canonical" href="https:\/\/anooptejt\.github\.io\/"/);
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the complete writing and talks archive", async () => {
  const response = await render("/insights");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /DevOps, Platform Engineering &amp; AIOps Insights \| Anoop Tej/,
  );
  assert.match(html, /DevOps, platform engineering and AIOps insights/);
  assert.match(html, /Long-form thinking and practical guidance/);
  assert.match(html, /How to Integrate AWS with Spinnaker/);
  assert.match(html, /Old-School Log Analysis Challenge/);
  assert.match(html, /Deploy Spinnaker CD Pipelines in Kubernetes/);
  assert.match(html, /Hire me on Fiverr/);
  assert.match(html, /https:\/\/www\.fiverr\.com\/anooptejt/);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/anooptejt\.github\.io\/insights\/"/,
  );
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(html, /"@type":"ItemList"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps confidential organization details out of project content", async () => {
  const [page, insights, content, header, footer, layout, seo, jsonLd, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/insights/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/seo.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/JsonLd.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const projectsStart = page.indexOf("const projects = [");
  const projectsEnd = page.indexOf("const principles = [");
  const projectContent = page.slice(projectsStart, projectsEnd);
  assert.doesNotMatch(
    projectContent,
    /OpsMx|N2 Systems|PruTech|Wells Fargo|MetricStream|GraceLyster|Bank of America|Lowe’s|Cummins|StateStreet|Exelon/i,
  );
  assert.match(page, /projects = \[/);
  assert.match(page, /id: "front-door"/);
  assert.match(page, /id: "aiops-agent"/);
  assert.match(page, /id: "enterprise-platforms"/);
  assert.doesNotMatch(page, /—|–/);
  assert.doesNotMatch(insights, /—|–/);
  assert.doesNotMatch(content, /—|–/);
  assert.doesNotMatch(header, /—|–/);
  assert.doesNotMatch(footer, /—|–/);
  assert.doesNotMatch(layout, /—|–/);
  assert.doesNotMatch(seo, /—|–/);
  assert.doesNotMatch(jsonLd, /—|–/);
  assert.match(layout, /images:\s*\["\/og\.png"\]/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.skip-link:focus/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
