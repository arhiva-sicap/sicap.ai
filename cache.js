"use strict"

const age = {
  "1h": 60 * 60,
  "2h": 2 * 60 * 60,
  "1d": 24 * 60 * 60,
  "7d": 7 * 24 * 60 * 60,
  "1y": 365 * 24 * 60 * 60,
}

module.exports = [
  // if you are customizing your runtime cache rules, please note that the
  // first item in the runtime cache configuration array MUST be "start-url"
  {
    // MUST be the same as "start_url" in manifest.json
    urlPattern: "/",
    // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
    // use StaleWhileRevalidate if you want to prompt user to reload when new version available
    handler: "NetworkFirst",
    options: {
      // don't change cache name
      cacheName: "start-url",
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: age["7d"],
      },
    },
  },
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts",
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: age["1y"],
      },
    },
  },
  {
    urlPattern: /^https:\/\/use\.fontawesome\.com\/releases\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "font-awesome",
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: age["1y"],
      },
    },
  },
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-font-assets",
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: age["7d"],
      },
    },
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-image-assets",
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: age["1y"],
      },
    },
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-js-assets",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: age["7d"],
      },
    },
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-style-assets",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: age["7d"],
      },
    },
  },
  {
    urlPattern: /\.(?:json|xml|csv)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-data-assets",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: age["7d"],
      },
    },
  },
  {
    urlPattern: /\/api\/.*$/i,
    handler: "NetworkFirst",
    method: "GET",
    options: {
      cacheName: "apis",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: age["1h"],
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },
  {
    urlPattern: /\/api\/.*$/i,
    handler: "NetworkFirst",
    method: "PUT",
    options: {
      cacheName: "apis",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: age["1h"],
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },
  {
    urlPattern: /\/api\/.*$/i,
    handler: "NetworkFirst",
    method: "DELETE",
    options: {
      cacheName: "apis",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: age["1h"],
      },
      networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
    },
  },
  {
    urlPattern: /.*/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "others",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: age["7d"],
      },
    },
  },
]
