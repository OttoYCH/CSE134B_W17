// Source: http://waverleysoftware.com/blog/building-progressive-web-apps/

// Cache names
var dataCacheName = 'COFFEEData-v1.1.4'
var cacheName = 'coffeePWA-1.5'

// Application shell files to be cached
var filesToCache = [
       '/HW4/main_page.html', 
       '/HW4/coffee_favorites.html',       
       '/HW4/coffee_hunter.html',       
       '/HW4/CoffeeStorage.html',       
       '/HW4/EnterPhoneNumber.html',       
       '/HW4/login.html',             
       '/HW4/QuickCompare.html',       
       '/HW4/reset_password.html',       
       '/HW4/SearchForCoffee.html',
       '/HW4/ShareWithFriends.html',
       
       '/HW4/js/app.min.js',
       
       '/HW4/css/coffee.css',
       
       '/HW4/Dummy/login_coffee.png',
       '/HW4/Dummy/americano.jpg',
       '/HW4/Dummy/cappuccino.png',
       '/HW4/Dummy/caramel macchiato.jpg',
       '/HW4/Dummy/coffee_cup.jpg',
       '/HW4/Dummy/coffeeBean.png',
       '/HW4/Dummy/espresso.jpg',
       '/HW4/Dummy/maps.png',
       '/HW4/Dummy/phone.png',
       '/HW4/Dummy/vanilla latte.jpg',
       '/HW4/Dummy/white mocha.jpg',
]

self.addEventListener('install', function (e) {
      // Debug message
      console.log('[ServiceWorker] Install')

      e.waitUntil(
             caches.open(cacheName).then(function (cache) {
                     console.log('[ServiceWorker] Caching app shell')
                     return cache.addAll(filesToCache)
              })
      )
})

self.addEventListener('activate', function (e) {
      // Debug message
      console.log('[ServiceWorker] Activate')

      e.waitUntil(
              caches.keys().then(function (keyList) {
                       return Promise.all(keyList.map(function (key) {
                               if (key !== cacheName && key !== dataCacheName) {
                                    console.log('[ServiceWorker] Removing old cache', key)
                                    return caches.delete(key)
                               }
                        }))
              })
      )

      return self.clients.claim()
})

self.addEventListener('fetch', function (e) {
      // Debug message
      console.log('[ServiceWorker] Fetch', e.request.url)

      e.respondWith(
             caches.match(e.request).then(function (response) {
                     return response || fetch(e.request)
             })
       )
})