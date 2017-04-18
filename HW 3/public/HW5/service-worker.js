// Source: http://waverleysoftware.com/blog/building-progressive-web-apps/

// Cache names
var dataCacheName = 'COFFEEData-v1.1.4'
var cacheName = 'coffeePWA-1.5'

// Application shell files to be cached
var filesToCache = [
       '/HW5/main_page.html', 
       '/HW5/coffee_favorites.html',       
       '/HW5/coffee_hunter.html',       
       '/HW5/CoffeeStorage.html',       
       '/HW5/EnterPhoneNumber.html',       
       '/HW5/login.html',             
       '/HW5/QuickCompare.html',       
       '/HW5/reset_password.html',       
       '/HW5/SearchForCoffee.html',
       '/HW5/ShareWithFriends.html',
       
       '/HW5/js/app.min.js',
       
       '/HW5/css/coffee.css',
       
       '/HW5/Dummy/login_coffee.png',
       '/HW5/Dummy/americano.jpg',
       '/HW5/Dummy/cappuccino.png',
       '/HW5/Dummy/caramel macchiato.jpg',
       '/HW5/Dummy/coffee_cup.jpg',
       '/HW5/Dummy/coffeeBean.png',
       '/HW5/Dummy/espresso.jpg',
       '/HW5/Dummy/maps.png',
       '/HW5/Dummy/phone.png',
       '/HW5/Dummy/vanilla latte.jpg',
       '/HW5/Dummy/white mocha.jpg',
       '/HW5/Dummy/mail_icon.png',
       '/HW5/Dummy/psw_icon.png',
       '/HW5/Dummy/login_bg.png',
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