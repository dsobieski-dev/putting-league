// Offline support: every app file is cached on install and served from the cache, so the app opens with no internet.
// Change VERSION on every release so devices pick up the new files the next time they are online.
const VERSION = 'v1';
const CACHE = 'putting-league-' + VERSION;
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './fonts/barlow-condensed-500.woff2',
  './fonts/barlow-condensed-600.woff2',
  './fonts/barlow-condensed-700.woff2',
  './fonts/inter-var.woff2',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))));
  // The first install takes over right away; later versions wait until the page asks (the "Reload to update" button).
  if (!self.registration.active) self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('putting-league-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async (c) => {
      // Opening the app (any page address) always gets the cached app page.
      if (req.mode === 'navigate') return (await c.match('./index.html')) || fetch(req);
      return (await c.match(req, { ignoreSearch: true })) || fetch(req);
    })
  );
});
