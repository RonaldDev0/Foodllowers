if(!self.define){let s,e={};const a=(a,n)=>(a=new URL(a+".js",n).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(n,t)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let c={};const r=s=>a(s,i),u={module:{uri:i},exports:c,require:r};e[i]=Promise.all(n.map((s=>u[s]||r(s)))).then((s=>(t(...s),c)))}}define(["./workbox-8637ed29"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/chunks/149-8f80f167749ce605.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/1a84381c-c25ae77a6e4eb225.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/285-64eec997b225388e.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/289-452c49d226c3ff24.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/362-a47490467bcba01d.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/42-960652aa60bf5c16.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/431-dc05efc1f86a237b.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/432-4b20cd49193b58ce.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/536-b91310e6363d4816.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/798-50e317a3c302213f.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/803-3b2715043bdd4793.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/876-0314e736590d34ec.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/%5Binfluencer%5D/page-e6ac2aef11c6e552.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/_not-found-b2c261cca9898ab8.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/adresses/page-ec1dab04fd06f362.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/currentshipment/login/page-453c3f4223046fe2.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/currentshipment/page-43ac4db682ed2cd6.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/layout-82aafcd7c8cb471c.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/login/page-d6923ce137788c1e.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/page-a7635575f26078b0.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/profile/page-feb3e2c8221f113a.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/search/page-44e462b21c63cc77.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/app/shipments/page-519ed9d733e02421.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/framework-510ec8ffd65e1d01.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/main-36e84a615919d8ae.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/main-app-265e9082de938d1f.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/pages/_app-303635c4120dd7f7.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/pages/_error-cc329d3dd4e084f1.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f5ff981b4ae5cfbe.js",revision:"qqsp_yhaVT2qdRurU8CsN"},{url:"/_next/static/css/91693fc86c402ec7.css",revision:"91693fc86c402ec7"},{url:"/_next/static/css/e5fa4db13dfc6bc6.css",revision:"e5fa4db13dfc6bc6"},{url:"/_next/static/qqsp_yhaVT2qdRurU8CsN/_buildManifest.js",revision:"32129467d5bd0977653d357208fbb205"},{url:"/_next/static/qqsp_yhaVT2qdRurU8CsN/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:s})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),s.registerRoute(/\/_next\/static.+\.js$/i,new s.CacheFirst({cacheName:"next-static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4|webm)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({sameOrigin:s,url:{pathname:e}})=>!(!s||e.startsWith("/api/auth/")||!e.startsWith("/api/"))),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:a})=>"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&a&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:a})=>"1"===s.headers.get("RSC")&&a&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:{pathname:s},sameOrigin:e})=>e&&!s.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({sameOrigin:s})=>!s),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
