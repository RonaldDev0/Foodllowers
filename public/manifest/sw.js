if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),m={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>m[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-8637ed29"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/ZAcnlDWzxVBam70KiYAva/_buildManifest.js",revision:"486f1982fe6b96f4fa32417a630c02d7"},{url:"/_next/static/ZAcnlDWzxVBam70KiYAva/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/111-92dd171acc3e7c39.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/302-b2b885e1de70fb02.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/430-c7b55cbbddd61635.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/622-c1aa4472989ecfbc.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/app/%5Binfluencer%5D/page-622d2128c1f0d473.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/app/adresses/page-4d30aa713af266fa.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/app/currentshipment/page-146c1dd9fc016ab3.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/app/layout-86451d52ed54a2a0.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/app/login/page-eed80e37848244c6.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/app/page-3f4ba5b5ce1a4d9e.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/app/paymentmethods/page-7f5cfe00869b4ffb.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/app/profile/page-1e963c6e28dbee19.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/app/shipments/page-fa023c27bc2d1aaa.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/c96ca04b-3a7bc154694fd4fd.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/main-4afc5f6f67c9c878.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/main-app-8d0fca93f3b7da14.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/pages/_app-849b901c8e1be66d.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/pages/_error-0b8b23c881c2550d.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-bca5c23faeced7a0.js",revision:"ZAcnlDWzxVBam70KiYAva"},{url:"/_next/static/css/def1d3e1e0799a95.css",revision:"def1d3e1e0799a95"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
