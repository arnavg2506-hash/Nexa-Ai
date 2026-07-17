const SHELL_CACHE = "nexa-ai-shell-v4";
const ASSET_CACHE = "nexa-ai-assets-v4";
const APP_SHELL = [
  "/",
  "/map",
  "/compare",
  "/dashboard",
  "/modules/land",
  "/modules/homes",
  "/manifest.webmanifest",
  "/icons/nexa-icon.svg",
  "/icons/nexa-icon-192.png",
  "/icons/nexa-icon-512.png",
  "/icons/nexa-apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      Promise.allSettled(
        APP_SHELL.map((url) => cache.add(new Request(url, { cache: "reload" }))),
      ),
    ).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("nexa-ai-") && ![SHELL_CACHE, ASSET_CACHE].includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match("/"))),
    );
    return;
  }

  if (["font", "image", "script", "style"].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const refresh = fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(ASSET_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }).catch(() => cached || Response.error());

        return cached || refresh;
      }),
    );
  }
});
