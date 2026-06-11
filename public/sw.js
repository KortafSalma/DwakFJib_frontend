const CACHE_VERSION = 'v2';
const STATIC_CACHE = `dwakfjib-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dwakfjib-dynamic-${CACHE_VERSION}`;
const ASSET_CACHE = `dwakfjib-assets-${CACHE_VERSION}`;
const API_CACHE = `dwakfjib-api-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-icon-192.svg',
  '/pwa-icon-512.svg',
  '/favicon.svg',
];

const ASSET_EXTENSIONS = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webp)$/;
const API_PATTERN = /^\/api\//;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] Precache skip (some offline)', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => {
            return (
              key !== STATIC_CACHE &&
              key !== DYNAMIC_CACHE &&
              key !== ASSET_CACHE &&
              key !== API_CACHE
            );
          })
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (request.url.includes('/manifest.json')) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
    return;
  }

  if (url.origin === self.location.origin && url.pathname === '/') {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        }).catch(() => cached || new Response('Offline', { status: 503 }));
        return fetchPromise;
      })
    );
    return;
  }

  if (url.origin === self.location.origin && ASSET_EXTENSIONS.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          return caches.open(ASSET_CACHE).then((cache) => {
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          });
        });
      })
    );
    return;
  }

  if (API_PATTERN.test(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) {
              return new Response(
                JSON.stringify({
                  data: null,
                  error: null,
                  offline: true,
                  message: 'Vous êtes actuellement hors ligne. Données mises en cache affichées.',
                }),
                {
                  headers: { 'Content-Type': 'application/json' },
                  status: 200,
                  statusText: 'OK (offline)',
                }
              );
            }
            return new Response(
              JSON.stringify({ data: null, error: 'offline', message: 'Pas de données en cache disponibles.' }),
              {
                headers: { 'Content-Type': 'application/json' },
                status: 503,
              }
            );
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      const fetchPromise = fetch(request).then((response) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          if (response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        });
      }).catch(() => new Response('Offline', { status: 503 }));

      return fetchPromise;
    })
  );
});
