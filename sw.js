// GULLY SCORE Service Worker
const CACHE_NAME = 'gully-score-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './public.html',
  './admin.html',
  './manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS).catch(function() {
        // Silently fail if any asset is missing
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // Let Firebase and Google Fonts requests go straight to network
  const url = event.request.url;
  if (url.includes('firebase') || 
      url.includes('gstatic') || 
      url.includes('googleapis') ||
      url.includes('firebaseio')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request).catch(function() {
        return cached;
      });
    })
  );
});
