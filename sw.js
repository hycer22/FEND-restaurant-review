// With help from Udacity webinar with Mohammed
// and reference from https://jakearchibald.com/2014/offline-cookbook/
// and https://developers.google.com/web/fundamentals/codelabs/offline/

var staticCacheName = 'review-cache-1';

let thingsToCache = [
  '/',
	'/index.html',
	'/restaurant.html',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
  '/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/css/styles.css',
  '/css/responsive_main.css',
  '/css/responsive_reviews.css'
]

self.addEventListener('install', function(evt) {
  console.log('The service worker has been installed.');
  evt.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
    return cache.addAll(thingsToCache);
  }).catch(error => {
      console.log('Failed');
    })
  );
});

self.addEventListener('fetch', function(evt) {
  evt.respondWith(
    caches.match(evt.request).then(function(response) {
      if (response) return response;
      return fetch(evt.request);
    })
  );
});

self.addEventListener('activate', function(evt) {
  evt.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('review-') && cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
