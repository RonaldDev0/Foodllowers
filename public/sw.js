if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>t(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-8637ed29"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/IOr88oWX-INJmkzNtJe2j/_buildManifest.js",revision:"01f0847f8182b8f3b7898667c9590d19"},{url:"/_next/static/IOr88oWX-INJmkzNtJe2j/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/17d85303-c8e19d0c7d0b1ab4.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/676-a26c07f28dd39a3f.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/723-0ea17ef2dd94fb2a.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/903-acb1c87bccf6d89d.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/app/%5Binfluencer%5D/page-622f905fcbeda8f1.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/app/adresses/page-3bbe7f514d27f687.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/app/currentshipment/page-e99117c531b331ea.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/app/layout-27f5b47be9b05a63.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/app/login/page-6a474ccad4a04b2f.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/app/page-9b545d9f27942993.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/app/paymentmethods/page-a1e3af48c3d7b6c4.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/app/profile/page-a0af0cd3ee059c55.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/app/shipments/page-e91aff4189c2ba3c.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/main-7951ec5e75fedc8a.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/main-app-ef64ad7f465d6b53.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/pages/_app-1862d3c48f99385d.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/pages/_error-e6672a7813679202.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-637d71b25e8dc29f.js",revision:"IOr88oWX-INJmkzNtJe2j"},{url:"/_next/static/css/1e99640517c8c9fc.css",revision:"1e99640517c8c9fc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!!e&&!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:t})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&t&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:t})=>"1"===e.headers.get("RSC")&&t&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
