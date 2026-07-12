const CACHE = "inv-local-v17";
const SHELL = [
  "./", "./index.html", "./manifest.json", "./icon.svg",
  "./vendor/xlsx.full.min.js", "./vendor/html5-qrcode.min.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Red primero, cache como respaldo. Así, con señal, siempre se ve la última versión
   publicada en un solo intento (antes se mostraba la versión vieja guardada y recién se
   actualizaba en el intento siguiente, por eso un celular quedaba atrasado respecto a otro).
   Sin señal, sigue funcionando con lo último que se pudo cachear. */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    // cache:"no-store" evita que el fetch conteste con el caché HTTP normal del navegador
    // (una capa distinta a la Cache API que usamos acá) — sin esto, un celular podía seguir
    // viendo una versión vieja aunque el service worker ya estuviera actualizado.
    fetch(e.request, { cache: "no-store" })
      .then((res) => {
        if (res.ok && e.request.url.startsWith(self.location.origin)) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
