const C="nefes-v5";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.json","./icon.svg","./icon-192.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Önce ağdan (tarayıcı önbelleğini atlayarak) al; internet yoksa son kopyayı göster
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 const same=new URL(e.request.url).origin===location.origin;
 e.respondWith(fetch(e.request,same?{cache:"no-store"}:{}).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request)))});
