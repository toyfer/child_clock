// service-worker.js
// 標準ライブラリのみ・PWAキャッシュ戦略: cache-first for static assets
const CACHE_NAME = 'child-clock-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/simple-clock.js',
  '/assets/manifest.json',
  '/assets/favicon.ico',
  // OGP画像や追加アイコンがあればここに追加
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
