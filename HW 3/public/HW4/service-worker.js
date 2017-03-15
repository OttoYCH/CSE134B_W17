// Source: http://waverleysoftware.com/blog/building-progressive-web-apps/

// Cache names
var dataCacheName = 'COFFEEData-v1.1.4'
var cacheName = 'coffeePWA-1.5'

// Application shell files to be cached
var filesToCache = [
       '/main_page.html', 
       '/coffee_favorites.html',       
       '/coffe_hunter.html',       
       '/CoffeeStorage.html',       
       '/EnterPhoneNumber.html',       
       '/login.html',       
       '/logout.html',       
       '/MakeAnOrder.html',       
       '/QuickCompare.html',       
       '/reset_password.html',       
       '/SearchForCoffee.html',
       '/ShareWithFriends.html',
       
       '/js/app.min.js',
       
       '/css/coffee.css',
       
       'HW4/Dummy/login_coffee.png',
       'HW4/Dummy/americano.jpg',
       'HW4/Dummy/cappuccino.png',
       'HW4/Dummy/caramel macchiato.jpg',
       'HW4/Dummy/coffee_cup.jpg',
       'HW4/Dummy/coffeeBean.png',
       'HW4/Dummy/espresso.jpg',
       'HW4/Dummy/maps.png',
       'HW4/Dummy/phone.png',
       'HW4/Dummy/vanilla latte.jpg',
       'HW4/Dummy/white mocha.jpg',
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