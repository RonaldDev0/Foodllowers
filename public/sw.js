if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-8637ed29"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/6PJfhI_6fhGnvbkHSIk77/_buildManifest.js",revision:"9fcb9a1e5d1dab0a4c01697d819ddb57"},{url:"/_next/static/6PJfhI_6fhGnvbkHSIk77/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/461-428149f1c109bc4b.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/642-5810fa3d167b0930.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/650-63658f46e923544a.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/687-500ec7d64f4869a4.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/app/%5Binfluencer%5D/page-a43660b5953e8ccc.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/app/adresses/page-12e0817f1f8da330.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/app/currentshipment/page-283f66c200dbc905.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/app/layout-1a059a28716977a9.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/app/login/page-acfb62d6417d14e7.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/app/page-3be7128163054a76.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/app/paymentmethods/page-814809a4741e92f6.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/app/profile/page-85d44c5ad4b3a532.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/app/shipments/page-82c49771a2c3e5c3.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/e669fc09-b565ab68e6ead7fe.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/main-9b111a8bee6dd282.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/main-app-73ed02522328f3b5.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/pages/_app-5348fb92b4563600.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/pages/_error-2a5a2c40496c1a07.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-2ebe78e4be7bbaa8.js",revision:"6PJfhI_6fhGnvbkHSIk77"},{url:"/_next/static/css/6054cc0d9d66868a.css",revision:"6054cc0d9d66868a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
