const CACHE = 'printlab-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.3/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap',
];

// Install: cache all static assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate: clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for static assets, network-first for Firebase
self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Só intercepta GET; login e gravações do Firebase passam direto
  if (e.request.method !== 'GET') return;
  // Always go network for Firebase (real-time data e login)
  if (url.includes('firestore.googleapis.com') || url.includes('firebase') ||
      url.includes('identitytoolkit') || url.includes('securetoken')) {
    return;
  }
  // A página principal é sempre buscada na rede primeiro (cache só como reserva offline),
  // senão o celular continua abrindo a versão antiga depois de cada atualização.
  const isPage = e.request.mode === 'navigate' || /\/(index\.html)?$/.test(new URL(url).pathname);
  if (isPage) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request).then(c => c || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
