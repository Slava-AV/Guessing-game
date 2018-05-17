//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache';
var precacheFiles = [
    /* Add an array of files to precache for your app */
    './',
    './index.html',
    './scripts/app.js',
    './styles.css',
    './images/ladybug.gif',
    './images/sheeps.gif',
    'https://cdn.jsdelivr.net/npm/vue',
    './sounds/correct.ogg',
    './sounds/wrong.ogg',
    './sounds/win.ogg',
    './sounds/loose.ogg',
    './sounds/click.ogg',
    './scripts/zounds.min.js',
   // 'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css',
    './images/icons/icon-144x144.png',
    './manifest.json'


];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache().then(function() {
            console.log('[ServiceWorker] Skip waiting on install');
            return self.skipWaiting();

        })
    );
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Claiming clients for current page');
    return self.clients.claim();

});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.'+ evt.request.url);
    evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
    evt.waitUntil(update(evt.request));
});


function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(precacheFiles);
    });
}


function fromCache(request) {
    //we pull files from the cache first thing so we can show them fast
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}


function update(request) {
    //this is where we call the server to get the newest version of the
    //file to use the next time we show view
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}

function fromServer(request){
    //this is the fallback if it is not in the cahche to go to the server and get it
    return fetch(request).then(function(response){ return response})
}
