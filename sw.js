// TMFL Commissioner PWA: cache public app assets only, never commissioner HTML or sensitive data.
const CACHE='tmfl-commissioner-assets-v1';
const ASSETS=['./manifest.webmanifest','./icons/tmfl-192.png','./icons/tmfl-512.png'];
self.addEventListener('install',e=>{e.waitUntil(Promise.all(ASSETS.map(u=>fetch(u,{cache:'reload'}).then(r=>{if(!r.ok)throw Error(u);return caches.open(CACHE).then(c=>c.put(u,r))}).catch(()=>{}))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tmfl-commissioner-assets-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;if(!ASSETS.some(a=>u.pathname.endsWith(a.replace('./','/'))))return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)))});
