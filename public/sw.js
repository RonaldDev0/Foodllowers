if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>t(e,a),u={module:{uri:a},exports:c,require:r};s[a]=Promise.all(n.map((e=>u[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-01ae76d0"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/120-ab8057df397109e8.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/204-514c1c8f1e99e053.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/210-9cb9bca36b85b2cc.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/213-66e2d021c223875e.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/362-0b0cddc0e0d1e49b.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/374-f23c1c506cb3fc72.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/42-cd539ba7ce697e60.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/431-48e1e264ee24a4b9.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/978-102e4586eb933156.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/%5Binfluencer%5D/page-04a4740e33350b35.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/_not-found-5bb4cb771f5fdf36.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/adresses/page-ebe3af584d0c24e8.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/currentshipment/page-1cbca83422a3e15e.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/layout-c0e7e60fcd11640d.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/login/page-49d73ea2a99697f0.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/page-333fafbf21854395.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/paymentmethods/page-8c07c1938cf71281.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/profile/page-203cb2003f2be675.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/app/shipments/page-f0ca58f7fb522846.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/b789bd0c-a26b48fe9a8ee773.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/main-app-38c6f0253b69d239.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/main-b7afcfddc45cc27a.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/pages/_app-06a558b62e071421.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/pages/_error-10db43c3cd254e76.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-abcdd3fbb908a8d6.js",revision:"s65JBytMLO_FmWXAwBivu"},{url:"/_next/static/css/91693fc86c402ec7.css",revision:"91693fc86c402ec7"},{url:"/_next/static/css/ecf0412a8b12c79d.css",revision:"ecf0412a8b12c79d"},{url:"/_next/static/s65JBytMLO_FmWXAwBivu/_buildManifest.js",revision:"b1ba1d838f52ac5b1f73f3deff98f6fb"},{url:"/_next/static/s65JBytMLO_FmWXAwBivu/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:t})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&t&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:t})=>"1"===e.headers.get("RSC")&&t&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
