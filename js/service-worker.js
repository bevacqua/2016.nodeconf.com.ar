'use strict';

var version = 'v2::';
var offlineFundamentals = [
  '/',
  '/offline.html',
  '/all.css',
  '/all.js'
];

self.addEventListener('install', installer);
self.addEventListener('activate', activator);
self.addEventListener('fetch', fetcher);

function installer (e) {
  if ('skipWaiting' in self) { self.skipWaiting(); }

  e.waitUntil(
    caches
      .open(version + 'fundamentals')
      .then(cache => cache.addAll(offlineFundamentals))
  );
}

function activator (e) {
  if ('clients' in self && self.clients.claim) { self.clients.claim(); }

  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys
      .filter(key => key.indexOf(version) !== 0)
      .map(key => caches.delete(key))
    ))
  );
}

function fetcher (e) {
  var request = e.request;
  if (request.method !== 'GET') {
    return;
  }

  e.respondWith(
    caches
      .match(request)
      .then(queriedCache)
      .catch(failedFetchOrCache)
  );

  function queriedCache (cached) {
    return fetch(request)
      .then(fetchedFromNetwork, unableToResolve)
      .catch(unableToResolve);

    function fetchedFromNetwork (response) {
      var cacheCopy = response.clone();
      caches
        .open(version + 'pages')
        .then(c => c.put(request, cacheCopy));
      return response;
    }

    function unableToResolve () {
      return cached || failedFetchOrCache();
    }
  }

  function failedFetchOrCache () {
    return caches
      .match('/offline.html')
      .then(cached => cached || offlineResponse())
      .catch(offlineResponse);
  }

  function offlineResponse () {
    return new Response('', { status: 503, statusText: 'Service Unavailable' });
  }
}
