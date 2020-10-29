const staticCacheName = "staticCacheV9";
const assets = [
  "https://operatio.js.org/",
  "https://operatio.js.org/index.html",
  "https://operatio.js.org/CSS/style.css",
  "https://operatio.js.org/CSS/w3.css",
  "https://operatio.js.org/Images/Icon-72.png",
  "https://operatio.js.org/app.js",
  "https://operatio.js.org/JavaScript/db.js",
  "https://operatio.js.org/LogHours",
  "https://operatio.js.org/JavaScript/ui.js",
  "https://operatio.js.org/About",
  "https://operatio.js.org/Explore",
  "https://operatio.js.org/Favorites",
  "https://operatio.js.org/GetStarted",
  "https://operatio.js.org/Settings",
  "https://operatio.js.org/SignIn",
  "https://operatio.js.org/manifest.json",
];

self.addEventListener("install", evt => {
  console.log("ServiceWorker Installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching Assets");
      for(var i = 0; i <= assets.length; i++){
        cache.add(assets[i]);
      }
    })
  );
});
self.addEventListener("activate", evt => {
  console.log("ServiceWorker Activated");
});
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      if(fetchEvent.request){
        caches.delete(staticCacheName);
        caches.open(staticCacheName).then((cache) => {
        console.log("Caching Assets");
        for(var i = 0; i <= assets.length; i++){
          cache.add(assets[i]);
        }
        return fetch(fetchEvent.request);
        }else{
          return res;
        }
    })
  )
})
