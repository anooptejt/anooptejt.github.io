import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist-pages/", import.meta.url);

async function readOutput(path) {
  return readFile(new URL(path, outputRoot), "utf8");
}

function structuredDataDocuments(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]));
}

test("exports indexable homepage metadata and valid structured data", async () => {
  const html = await readOutput("index.html");
  const documents = structuredDataDocuments(html);

  assert.match(html, /<link rel="canonical" href="https:\/\/anooptejt\.github\.io\/"/);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(html, /<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/);
  assert.match(html, /<meta property="og:url" content="https:\/\/anooptejt\.github\.io\/"/);
  assert.match(html, /<meta property="og:site_name" content="Anoop Tej Thotapalli"/);
  assert.equal(documents.length, 1);
  assert.equal(documents[0]["@context"], "https://schema.org");
  assert.ok(documents[0]["@graph"].some((item) => item["@type"] === "Person"));
  assert.ok(documents[0]["@graph"].some((item) => item["@type"] === "ProfilePage"));
  assert.doesNotMatch(html, /—|–/);
});

test("exports unique Insights metadata and collection structured data", async () => {
  const html = await readOutput("insights/index.html");
  const documents = structuredDataDocuments(html);

  assert.match(html, /<link rel="canonical" href="https:\/\/anooptejt\.github\.io\/insights\/"/);
  assert.match(html, /<meta property="og:url" content="https:\/\/anooptejt\.github\.io\/insights\/"/);
  assert.equal(documents.length, 1);
  assert.ok(documents[0]["@graph"].some((item) => item["@type"] === "CollectionPage"));
  const itemList = documents[0]["@graph"].find((item) => item["@type"] === "ItemList");
  assert.ok(itemList);
  assert.equal(itemList.numberOfItems, 28);
  assert.match(JSON.stringify(itemList), /The Phone Is Not Just Taking Our Time/);
  assert.match(JSON.stringify(itemList), /Civo Navigate India 2025/);
  assert.match(JSON.stringify(itemList), /CLOUDxAI 2026/);
  assert.ok(documents[0]["@graph"].some((item) => item["@type"] === "BreadcrumbList"));
  assert.doesNotMatch(html, /—|–/);
});

test("exports crawl controls and sitemap entries", async () => {
  const [robots, sitemap] = await Promise.all([
    readOutput("robots.txt"),
    readOutput("sitemap.xml"),
  ]);

  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /Sitemap: https:\/\/anooptejt\.github\.io\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/anooptejt\.github\.io\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/anooptejt\.github\.io\/insights\/<\/loc>/);
  assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
});
