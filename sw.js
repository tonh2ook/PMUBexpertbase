const CACHE = 'peb-app-v1';
self.addEventListener('install', (e)=>{ self.skipWaiting(); });
self.addEventListener('activate', (e)=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', (e)=>{
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res=>{
      if(res.ok && (e.request.mode==='navigate' || /\.(png|json|js)$/.test(new URL(e.request.url).pathname))){
        const clone = res.clone();
        caches.open(CACHE).then(c=>c.put(e.request, clone));
      }
      return res;
    }).catch(()=> caches.match(e.request, {ignoreSearch:true}))
  );
});
