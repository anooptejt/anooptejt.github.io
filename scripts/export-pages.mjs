import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const outputRoot = new URL("../dist-pages/", import.meta.url);
const clientRoot = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", `${Date.now()}`);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(clientRoot, outputRoot, { recursive: true });

const { default: worker } = await import(workerUrl.href);
const routes = [
  { path: "/", output: new URL("index.html", outputRoot) },
  { path: "/insights", output: new URL("insights/index.html", outputRoot) },
];

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://anooptejt.github.io${route.path}`, {
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

  if (!response.ok) {
    throw new Error(
      `Static export failed for ${route.path} with status ${response.status}`,
    );
  }

  const serverRenderedHtml = await response.text();
  const staticHtml = serverRenderedHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi, "");

  await mkdir(new URL("./", route.output), { recursive: true });
  await writeFile(route.output, staticHtml);
}

await writeFile(new URL(".nojekyll", outputRoot), "");

console.log("GitHub Pages export created in dist-pages.");
