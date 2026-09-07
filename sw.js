/* Cattivissimo Impostor — service worker.
   Alza CACHE_VERSION a ogni deploy per invalidare la cache.
   config.js NON viene mai messo in cache: così le chiavi Firebase
   aggiornate vengono lette subito senza svuotare la cache a mano. */

const CACHE_VERSION = 'cattivissimo-v3';

const SHELL = [
  './',
  './index.html',
  './app.js',
  './words.js',
  './i18n.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-64.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.pathname.endsWith('/config.js')) return;          // mai in cache
  if (url.origin !== self.location.origin) return;          // Firebase e font: sempre dalla rete

  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE_VERSION).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
