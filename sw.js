const CACHE_NAME = ‘gully-score-v1’;
const ASSETS = [
‘./public.html’,
‘./admin.html’,
‘./manifest-public.json’,
‘./manifest-admin.json’,
‘./icon-192.png’,
‘./icon-512.png’
];

self.addEventListener(‘install’, event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => {
return cache.addAll(ASSETS).catch(() => {});
})
);
self.skipWaiting();
});

self.addEventListener(‘activate’, event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
)
);
self.clients.claim();
});

self.addEventListener(‘fetch’, event => {
event.respondWith(
fetch(event.request).catch(() =>
caches.match(event.request)
)
);
});
