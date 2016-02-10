(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var version = 'v1::';
var offlineFundamentals = ['/', '/offline.html', '/all.css', '/all.js'];

self.addEventListener('install', installer);
self.addEventListener('activate', activator);
self.addEventListener('fetch', fetcher);

function installer(e) {
  if ('skipWaiting' in self) {
    self.skipWaiting();
  }

  e.waitUntil(caches.open(version + 'fundamentals').then(function (cache) {
    return cache.addAll(offlineFundamentals);
  }));
}

function activator(e) {
  if ('clients' in self && self.clients.claim) {
    self.clients.claim();
  }

  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) {
      return key.indexOf(version) !== 0;
    }).map(function (key) {
      return caches.delete(key);
    }));
  }));
}

function fetcher(e) {
  var request = e.request;
  if (request.method !== 'GET') {
    return;
  }

  e.respondWith(caches.match(request).then(queriedCache).catch(failedFetchOrCache));

  function queriedCache(cached) {
    return fetch(request).then(fetchedFromNetwork, unableToResolve).catch(unableToResolve);

    function fetchedFromNetwork(response) {
      var cacheCopy = response.clone();
      caches.open(version + 'pages').then(function (c) {
        return c.put(request, cacheCopy);
      });
      return response;
    }

    function unableToResolve() {
      return cached || failedFetchOrCache();
    }
  }

  function failedFetchOrCache() {
    return caches.match('/offline.html').then(function (cached) {
      return cached || offlineResponse();
    }).catch(offlineResponse);
  }

  function offlineResponse() {
    return new Response('', { status: 503, statusText: 'Service Unavailable' });
  }
}

},{}]},{},[1]);
