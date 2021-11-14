const filesToCache = [
    "/", "/index.html","index.js", "/db.js", "/style.css"];

const Cache_Name = "static-cache-";
const cached_dataName = "data-cache";

self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches.open(Cache_Name).then(cache => {
      return cache.addAll(filesToCache);
    })
  );

  self.skipWaiting();
});

self.addEventListener("fetch", evt => {
    if(evt.request.url.includes('/api/')) {
    
evt.respondWith(
                caches.open(cached_dataName).then(cache => {
                return fetch(evt.request)
                .then(res => {
                    if (res.status === 200){
                        cache.put(evt.request.url, res.clone());
                    }
                    return res;
                })
                .catch(err => {
                    return cache.match(evt.request);
                });
            })
            );
            return;
        }

evt.respondWith(
    caches.open(Cache_Name).then( cache => {
      return cache.match(evt.request).then(res => {
        return res || fetch(evt.request);
      });
    })
  );
});

self.addEventListener("activate", function(evt) {
      evt.waitUntil(
        caches.keys().then(keyList => {
          return Promise.all(
            keyList.map(key => {
              if (key !== Cache_Name && key !== cached_dataName) {
                return caches.delete(key);
              }
            })
          );
        })
      );
    
      self.clients.claim();
    });
    