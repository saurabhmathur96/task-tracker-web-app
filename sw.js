var CACHE_NAME = 'todos-app-v2';
var urlsToCache = [
  '/css/app.css',
  '/js/app.js',
  '/js/controllers/create.js',
  '/js/controllers/detail.js',
  '/js/controllers/error.js',
  '/js/controllers/home.js',
  '/js/controllers/login.js',
  '/js/controllers/module.js',
  '/js/controllers/register.js',
  '/partials/create.html',
  '/partials/detail.html',
  '/partials/Error404.html',
  '/partials/home.html',
  '/partials/login.html',
  '/partials/register.html'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }


            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});