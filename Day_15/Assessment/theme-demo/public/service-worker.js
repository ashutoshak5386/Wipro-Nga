const CACHE_NAME = "day14-15-cache-v1";
const urlsToCache = ["/", "/index.html", "/favicon.ico", "/manifest.json"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchRes.clone());
          return fetchRes;
        });
      }).catch(() => {
        // Fallback for navigation requests when offline:
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      });
    })
  );
});
